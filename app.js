/**
 * 救羊出圈 · 应用控制器
 * ------------------------------------------------------------
 * 负责把四个互相独立的层粘起来：
 *   数据层   js/data/*            —— 关卡、方块类型、主题、多语言
 *   规则层   js/core/rules.js     —— 纯棋盘规则
 *   状态层   js/core/game-state.js —— 步数、撤销、通关
 *   渲染层   DOM + css/style.css  —— 方块、HUD、弹窗、庆祝动画
 *
 * UI 不直接改游戏数据；所有移动都经由 GameState。
 * 这样未来接入关卡编辑器、排行榜或 React 视图时，核心逻辑可以原样复用。
 */
(function () {
  'use strict';

  const SG = window.SG;
  const $ = (selector, root) => (root || document).querySelector(selector);
  const $$ = (selector, root) => Array.from((root || document).querySelectorAll(selector));
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const STORAGE_KEYS = {
    settings: 'sheep-escape:v1:settings',
    records: 'sheep-escape:v1:records'
  };

  const DIFFICULTY_KEYS = {
    easy: 'difficultyEasy',
    medium: 'difficultyMedium',
    hard: 'difficultyHard'
  };

  const DIR_BY_KEY = {
    up: { dx: 0, dy: -1, rotation: 0 },
    right: { dx: 1, dy: 0, rotation: 90 },
    down: { dx: 0, dy: 1, rotation: 180 },
    left: { dx: -1, dy: 0, rotation: 270 }
  };

  const ICON_CHEVRON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 14.5 12 8l6 6.5"/></svg>';
  const ICON_ARROW =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m0 0-5-5m5 5-5 5"/></svg>';
  const STAR_PATH = 'm12 3 2.5 5.8 6.2.6-4.7 4.1 1.4 6.1-5.4-3.2-5.4 3.2 1.4-6.1L3.3 9.4l6.2-.6L12 3Z';

  function escapeHTML(value) {
    return String(value == null ? '' : value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function safeParse(value, fallback) {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === 'object' ? parsed : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function readStorage(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? safeParse(raw, fallback) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      /* 隐私模式下静默降级为内存状态 */
    }
  }

  function seededRandom(seed) {
    let state = seed >>> 0;
    return function () {
      state = (state * 1664525 + 1013904223) >>> 0;
      return state / 4294967296;
    };
  }

  class SheepEscapeApp {
    constructor() {
      this.sound = new SG.SoundEngine();
      this.settings = this.loadSettings();
      this.records = readStorage(STORAGE_KEYS.records, {});
      this.reducedMotion = reducedMotionQuery.matches;

      this.game = null;
      this.currentLevel = null;
      this.selectedId = null;
      this.showGuides = false;
      this.blockElements = new Map();
      this.drag = null;
      this.selectTimer = null;
      this.hintTimer = null;
      this.hintCache = new Map();
      this.hintBusy = false;
      this.hintToken = 0;
      this.hintPending = null;
      this.hintWorker = null;
      this.hintUseWorker = true;
      this.hintRequestTimeout = null;
      this.hintWorkerJob = null;
      this.toastTimer = null;
      this.winTimer = null;
      this.winScheduled = false;
      this.confettiRun = null;
      this.openOverlays = [];
      this.lastFocused = null;
      this.lastStepValue = 0;
      this.uidCounter = 0;

      this.el = this.collectElements();

      // 初始语言必须早于动态文案生成。
      if (this.settings.lang !== SG.I18n.getLang()) {
        SG.I18n.setLang(this.settings.lang);
      } else {
        SG.I18n.apply();
      }

      this.applyTheme(this.settings.theme, { silent: true });
      this.sound.setEnabled(this.settings.sound);
      this.bindEvents();
      this.initScene();
      this.buildThemeOptions();
      this.renderProgressDots();
      this.updateSoundUI();
      this.updateLanguageButtons();

      const initialLevelId = this.settings.lastLevelId || 'meadow-1';
      this.loadLevel(initialLevelId, { initial: true });

      SG.I18n.onChange(() => this.handleLanguageChange());

      this.fitBoard();
      this.bindViewport();
      requestAnimationFrame(() => this.fitBoard());

      // 监听系统“减少动态”偏好，运行中切换也能立即生效。
      if (typeof reducedMotionQuery.addEventListener === 'function') {
        reducedMotionQuery.addEventListener('change', (event) => {
          this.reducedMotion = event.matches;
        });
      }
    }

    // ------------------------------------------------------------ 初始化 / 存储
    loadSettings() {
      const stored = readStorage(STORAGE_KEYS.settings, {});
      const validThemes = SG.Themes.list.map((theme) => theme.id);
      const validLangs = ['zh', 'en'];
      const validLevels = SG.Levels.all.map((level) => level.id);
      return {
        theme: validThemes.includes(stored.theme) ? stored.theme : SG.Themes.defaultId,
        lang: validLangs.includes(stored.lang) ? stored.lang : 'zh',
        sound: stored.sound !== false,
        lastLevelId: validLevels.includes(stored.lastLevelId) ? stored.lastLevelId : 'meadow-1'
      };
    }

    saveSettings() {
      writeStorage(STORAGE_KEYS.settings, this.settings);
    }

    saveRecords() {
      writeStorage(STORAGE_KEYS.records, this.records);
    }

    collectElements() {
      return {
        app: $('#app'),
        topbar: $('.topbar'),
        gameShell: $('.game-shell'),
        boardStage: $('#boardStage'),
        boardFrame: $('#boardFrame'),
        board: $('#board'),
        blocksLayer: $('#blocksLayer'),
        guideLayer: $('#guideLayer'),
        goalZone: $('#goalZone'),
        exitSign: $('#exitSign'),
        boardFlowers: $('#boardFlowers'),
        levelNumber: $('#levelNumber'),
        levelName: $('#levelName'),
        levelSubtitle: $('#levelSubtitle'),
        difficultyChip: $('#difficultyChip'),
        parLabel: $('#parLabel'),
        levelCounter: $('#levelCounter'),
        levelsBtn: $('#levelsBtn'),
        stepsValue: $('#stepsValue'),
        bestValue: $('#bestValue'),
        starsValue: $('#starsValue'),
        undoBtn: $('#undoBtn'),
        hintBtn: $('#hintBtn'),
        resetBtn: $('#resetBtn'),
        tipText: $('#tipText'),
        progressDots: $('#progressDots'),
        soundBtn: $('#soundBtn'),
        settingsBtn: $('#settingsBtn'),
        soundToggle: $('#soundToggle'),
        soundLabel: $('#soundLabel'),
        themeOptions: $('#themeOptions'),
        languageOptions: $('#languageOptions'),
        howToBtn: $('#howToBtn'),
        levelsSheet: $('#levelsSheet'),
        settingsSheet: $('#settingsSheet'),
        howToDialog: $('#howToDialog'),
        levelList: $('#levelList'),
        winOverlay: $('#winOverlay'),
        winTitle: $('#winTitle'),
        winSubtitle: $('#winSubtitle'),
        winSheep: $('#winSheep'),
        winStars: $('#winStars'),
        winSteps: $('#winSteps'),
        winBest: $('#winBest'),
        winRecord: $('#winRecord'),
        winReplayBtn: $('#winReplayBtn'),
        winNextBtn: $('#winNextBtn'),
        confettiCanvas: $('#confettiCanvas'),
        toast: $('#toast'),
        howtoSheep: $('#howtoSheep'),
        stars: $('#stars'),
        petals: $('#petals'),
        meadowFlowers: $('#meadowFlowers'),
        metaTheme: $('meta[name="theme-color"]')
      };
    }

    bindEvents() {
      this.el.undoBtn.addEventListener('click', () => this.undo());
      this.el.hintBtn.addEventListener('click', () => this.requestHint());
      this.el.resetBtn.addEventListener('click', () => this.resetLevel());
      this.el.levelsBtn.addEventListener('click', () => this.openLevels());
      this.el.settingsBtn.addEventListener('click', () => this.openOverlay('settingsSheet'));
      this.el.soundBtn.addEventListener('click', () => this.toggleSound());
      this.el.soundToggle.addEventListener('click', () => this.toggleSound());
      this.el.howToBtn.addEventListener('click', () => this.openOverlay('howToDialog'));
      this.el.winReplayBtn.addEventListener('click', () => this.replayCurrent());
      this.el.winNextBtn.addEventListener('click', () => this.goNext());

      $$('[data-close]').forEach((button) => {
        button.addEventListener('click', () => this.closeOverlay(button.getAttribute('data-close')));
      });

      [this.el.levelsSheet, this.el.settingsSheet, this.el.howToDialog].forEach((backdrop) => {
        backdrop.addEventListener('click', (event) => {
          if (event.target === backdrop) this.closeOverlay(backdrop.id);
        });
      });

      // 设置抽屉里的主题 / 语言按钮使用事件代理，语言切换后无需重新绑定。
      this.el.themeOptions.addEventListener('click', (event) => {
        const option = event.target.closest('[data-theme-id]');
        if (!option) return;
        this.applyTheme(option.getAttribute('data-theme-id'));
        this.sound.play('tap');
      });

      this.el.languageOptions.addEventListener('click', (event) => {
        const button = event.target.closest('[data-lang]');
        if (!button) return;
        const lang = button.getAttribute('data-lang');
        if (lang === SG.I18n.getLang()) return;
        this.settings.lang = lang;
        this.saveSettings();
        SG.I18n.setLang(lang);
        this.sound.play('tap');
      });

      this.el.levelList.addEventListener('click', (event) => {
        const card = event.target.closest('[data-level-id]');
        if (!card) return;
        this.loadLevel(card.getAttribute('data-level-id'));
      });

      this.el.progressDots.addEventListener('click', (event) => {
        const dot = event.target.closest('[data-level-id]');
        if (!dot) return;
        this.loadLevel(dot.getAttribute('data-level-id'));
      });

      this.el.tipText.parentElement.addEventListener('click', () => {
        if (!this.currentLevel) return;
        const message = SG.I18n.levelHint(this.currentLevel) || SG.I18n.t('dragTip');
        this.showToast(message, 3600);
      });

      this.el.board.addEventListener('pointerdown', (event) => this.onBoardPointerDown(event));

      document.addEventListener('keydown', (event) => this.onKeyDown(event));

      // 第一次触摸/点击时解锁 WebAudio（iOS / Chrome 都要求用户手势）。
      const unlock = () => {
        this.sound.unlock();
        document.removeEventListener('pointerdown', unlock);
      };
      document.addEventListener('pointerdown', unlock, { passive: true });

      window.addEventListener('orientationchange', () => {
        setTimeout(() => this.fitBoard(), 180);
        setTimeout(() => this.fitBoard(), 420);
      });

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.cancelPendingHint();
          this.stopConfetti();
        }
      });
    }

    bindViewport() {
      this._fitFrame = 0;
      window.addEventListener('resize', () => {
        if (!this._fitFrame) {
          this._fitFrame = requestAnimationFrame(() => {
            this._fitFrame = 0;
            this.fitBoard();
          });
        }
      });
    }

    scheduleFit() {
      if (this._fitFrame) cancelAnimationFrame(this._fitFrame);
      this._fitFrame = requestAnimationFrame(() => {
        this._fitFrame = 0;
        this.fitBoard();
      });
    }

    // ------------------------------------------------------------ 主题 / 语言 / 音效
    applyTheme(themeId, options) {
      const theme = SG.Themes.get(themeId);
      const silent = options && options.silent;
      this.settings.theme = theme.id;
      if (!silent) this.saveSettings();

      const rootStyle = document.documentElement.style;
      Object.keys(theme.vars).forEach((key) => rootStyle.setProperty(key, theme.vars[key]));
      rootStyle.setProperty('--font-ui', theme.font);
      document.body.dataset.theme = theme.id;
      if (this.el.metaTheme) this.el.metaTheme.setAttribute('content', theme.vars['--sky-mid']);
      this.sound.setProfile(theme.audio);

      if (this.el.themeOptions) {
        $$('[data-theme-id]', this.el.themeOptions).forEach((option) => {
          option.classList.toggle('is-active', option.getAttribute('data-theme-id') === theme.id);
        });
      }
    }

    buildThemeOptions() {
      if (!this.el.themeOptions) return;
      const lang = SG.I18n.getLang();
      this.el.themeOptions.innerHTML = SG.Themes.list.map((theme) => {
        const name = theme.name[lang] || theme.name.zh;
        const active = theme.id === this.settings.theme ? ' is-active' : '';
        return (
          `<button class="theme-option${active}" type="button" data-theme-id="${escapeHTML(theme.id)}" aria-label="${escapeHTML(name)}">` +
          `<span class="theme-preview" style="background:linear-gradient(145deg, ${theme.swatch[0]} 0%, ${theme.swatch[1]} 58%, ${theme.swatch[2]} 100%)"></span>` +
          `<span>${escapeHTML(name)}</span>` +
          '<span class="theme-check" aria-hidden="true">✓</span>' +
          '</button>'
        );
      }).join('');
    }

    handleLanguageChange() {
      this.settings.lang = SG.I18n.getLang();
      this.saveSettings();
      this.clearHintDisplay();
      this.updateLanguageButtons();
      this.buildThemeOptions();
      this.buildLevelList();
      this.renderProgressDots();
      this.updateSoundUI();
      this.updateDynamicCopy();
    }

    updateLanguageButtons() {
      const current = SG.I18n.getLang();
      $$('[data-lang]', this.el.languageOptions).forEach((button) => {
        button.classList.toggle('is-active', button.getAttribute('data-lang') === current);
      });
    }

    updateSoundUI() {
      const enabled = this.settings.sound;
      this.sound.setEnabled(enabled);
      document.body.classList.toggle('sound-muted', !enabled);
      this.el.soundBtn.setAttribute('aria-label', SG.I18n.t(enabled ? 'soundOn' : 'soundOff'));
      this.el.soundToggle.setAttribute('aria-checked', String(enabled));
      this.el.soundToggle.setAttribute('aria-label', SG.I18n.t(enabled ? 'soundOn' : 'soundOff'));
      if (this.el.soundLabel) {
        this.el.soundLabel.textContent = SG.I18n.t(enabled ? 'soundOn' : 'soundOff');
      }
    }

    toggleSound() {
      this.settings.sound = !this.settings.sound;
      this.saveSettings();
      this.updateSoundUI();
      if (this.settings.sound) this.sound.play('tap');
      else this.showToast(SG.I18n.t('soundOff'), 1300);
    }

    // ------------------------------------------------------------ 关卡载入与渲染
    loadLevel(levelId, options) {
      const opts = options || {};
      this.hideToast();
      this.clearHintDisplay();
      this.cancelPendingHint();
      this.clearSelection();
      this.cancelDrag();
      clearTimeout(this.winTimer);
      this.hideWin({ silent: true });
      this.stopConfetti();

      const level = SG.Levels.byId(levelId);
      this.currentLevel = level;
      this.settings.lastLevelId = level.id;
      this.saveSettings();

      if (!this.game) {
        this.game = new SG.GameState(level);
        this.game.onChange((type, payload) => this.onGameChange(type, payload));
      } else {
        this.game.setLevel(level);
      }

      this.winScheduled = false;
      this.selectedId = null;
      this.showGuides = false;
      this.lastStepValue = 0;

      document.body.dataset.scene = level.scene || 'daisies';
      this.el.board.style.setProperty('--cols', level.grid.cols);
      this.el.board.style.setProperty('--rows', level.grid.rows);
      this.el.board.setAttribute(
        'aria-label',
        `${SG.I18n.t('appName')} · ${SG.I18n.levelName(level)}`
      );

      this.renderBlocks({ entrance: true });
      this.updateLevelHeader();
      this.renderGoalZone();
      this.renderBoardDecorations();
      this.renderProgressDots();
      this.updateHUD();
      this.buildLevelList();
      this.updateWinLabels();

      if (!opts.initial) {
        this.closeOverlay('levelsSheet');
        this.closeOverlay('settingsSheet');
      }

      this.fitBoard();
      requestAnimationFrame(() => this.fitBoard());
    }

    updateLevelHeader() {
      const level = this.currentLevel;
      if (!level) return;
      const index = SG.Levels.all.findIndex((item) => item.id === level.id);
      const number = String(index + 1).padStart(2, '0');
      this.el.levelNumber.textContent = number;
      this.el.levelCounter.textContent = `${index + 1} / ${SG.Levels.all.length}`;
      this.el.levelName.textContent = SG.I18n.levelName(level);
      this.el.levelSubtitle.textContent = level.subtitle[SG.I18n.getLang()] || level.subtitle.zh || '';
      this.el.difficultyChip.textContent = SG.I18n.t(DIFFICULTY_KEYS[level.difficulty] || 'difficultyEasy');
      this.el.difficultyChip.dataset.difficulty = level.difficulty;
      this.el.parLabel.textContent =
        `${SG.I18n.t('par')} ${level.par} ${SG.I18n.t('movesUnit')}`;
      const hint = SG.I18n.levelHint(level) || SG.I18n.t('dragTip');
      this.el.tipText.textContent = hint;
      this.el.tipText.parentElement.setAttribute('title', hint);
      document.title = `${SG.I18n.t('appName')} · ${SG.I18n.levelName(level)}`;
      this.updateWinLabels();
    }

    renderBlocks(options) {
      const entrance = options && options.entrance;
      this.el.blocksLayer.innerHTML = '';
      this.blockElements.clear();
      this.uidCounter += 1;

      this.game.blocks.forEach((block, index) => {
        const type = SG.BlockTypes.get(block.type);
        if (!type) return;
        const uid = `sg-${this.currentLevel.id}-${block.id}-${this.uidCounter}`.replace(/[^a-zA-Z0-9_-]/g, '');
        const element = document.createElement('div');
        element.className = 'block';
        if (entrance) {
          element.classList.add('is-entering');
          element.style.setProperty('--enter-delay', `${Math.min(index * 55, 330)}ms`);
        }
        element.dataset.blockId = block.id;
        element.dataset.type = block.type;
        element.setAttribute('role', 'button');
        element.setAttribute('tabindex', '0');
        element.style.setProperty('--x', block.x);
        element.style.setProperty('--y', block.y);
        element.style.setProperty('--w', block.w);
        element.style.setProperty('--h', block.h);
        element.style.setProperty('--block-shell', type.palette.shell);
        element.style.setProperty('--block-shell-end', type.palette.shellEdge);
        element.style.setProperty('--block-edge', type.palette.shellEdge);
        element.innerHTML =
          '<div class="block-inner">' +
          `<div class="block-art">${SG.BlockTypes.renderArt(Object.assign({}, block, { uid }))}</div>` +
          '</div>';
        this.updateBlockAccessibility(element, block);
        element.addEventListener('pointerdown', (event) => this.onBlockPointerDown(event, block));
        element.addEventListener('keydown', (event) => this.onBlockKeyDown(event, block));
        element.addEventListener('focus', () => {
          if (!this.drag) this.selectBlock(block.id, { guides: false });
        });
        this.el.blocksLayer.appendChild(element);
        this.blockElements.set(block.id, element);
      });

      if (entrance) {
        window.setTimeout(() => {
          this.blockElements.forEach((element) => element.classList.remove('is-entering'));
        }, 900);
      }
    }

    updateBlockAccessibility(element, block) {
      const type = SG.BlockTypes.get(block.type);
      const name = type ? type.name[SG.I18n.getLang()] || type.name.zh : block.type;
      const description = `${name} · ${block.w}×${block.h}`;
      element.setAttribute('aria-label', description);
      element.setAttribute('title', name);
    }

    updateBlockLabels() {
      this.game.blocks.forEach((block) => {
        const element = this.blockElements.get(block.id);
        if (element) this.updateBlockAccessibility(element, block);
      });
    }

    updatePositions() {
      this.game.blocks.forEach((block) => {
        const element = this.blockElements.get(block.id);
        if (!element) return;
        element.style.setProperty('--x', block.x);
        element.style.setProperty('--y', block.y);
        element.style.setProperty('--w', block.w);
        element.style.setProperty('--h', block.h);
      });
    }

    renderGoalZone() {
      const level = this.currentLevel;
      if (!level || !level.goal) return;
      const goal = level.goal;
      const target = level.blocks.find((block) => block.id === goal.blockId);
      if (!target) return;
      const cols = level.grid.cols;
      const rows = level.grid.rows;
      this.el.goalZone.style.left = `calc(${(goal.x / cols) * 100}% + 3px)`;
      this.el.goalZone.style.top = `calc(${(goal.y / rows) * 100}% + 3px)`;
      this.el.goalZone.style.width = `calc(${(target.w / cols) * 100}% - 6px)`;
      this.el.goalZone.style.height = `calc(${(target.h / rows) * 100}% - 6px)`;
    }

    renderBoardDecorations() {
      if (!this.el.boardFlowers) return;
      const random = seededRandom(20260214);
      const positions = [
        [4, 9], [89, 17], [7, 77], [91, 86], [47, 5],
        [3, 51], [96, 47], [23, 93], [69, 94], [54, 67]
      ];
      this.el.boardFlowers.innerHTML = positions.map((pos, index) => {
        const isDaisy = index % 3 === 0;
        return (
          `<span class="board-deco ${isDaisy ? 'daisy' : 'grass'}" ` +
          `style="left:${(pos[0] + random() * 3).toFixed(1)}%;top:${(pos[1] + random() * 3).toFixed(1)}%;` +
          `transform:rotate(${(random() * 30 - 15).toFixed(1)}deg)"></span>`
        );
      }).join('');
    }

    getRecord(levelId) {
      return this.records[levelId] || null;
    }

    calculateStars(level, steps) {
      const thresholds = level.starThresholds || [level.par, level.par + 5];
      if (steps <= thresholds[0]) return 3;
      if (steps <= thresholds[1]) return 2;
      return 1;
    }

    updateHUD(animateSteps) {
      if (!this.game || !this.currentLevel) return;
      const record = this.getRecord(this.currentLevel.id);
      this.el.stepsValue.textContent = String(this.game.steps);
      this.el.bestValue.textContent = record && record.best ? String(record.best) : '—';
      const stars = record && record.stars ? record.stars : 0;
      this.el.starsValue.textContent = stars ? String(stars) : '—';
      this.el.undoBtn.disabled = !this.game.canUndo();
      this.el.hintBtn.disabled = false;

      if (animateSteps && this.game.steps !== this.lastStepValue) {
        this.el.stepsValue.classList.remove('is-bump');
        // 强制 reflow，以便连续两次步数变化都能重播动画。
        void this.el.stepsValue.offsetWidth;
        this.el.stepsValue.classList.add('is-bump');
      }
      this.lastStepValue = this.game.steps;
    }

    updateDynamicCopy() {
      if (!this.currentLevel) return;
      this.updateLevelHeader();
      this.updateBlockLabels();
      this.updateHUD();
      this.buildLevelList();
      this.renderProgressDots();
      this.updateWinLabels();
      const hint = SG.I18n.levelHint(this.currentLevel) || SG.I18n.t('dragTip');
      this.el.tipText.textContent = hint;
      this.el.tipText.parentElement.setAttribute('title', hint);
    }

    updateWinLabels() {
      if (!this.currentLevel) return;
      const isLast = this.getLevelIndex(this.currentLevel.id) === SG.Levels.all.length - 1;
      this.el.winNextBtn.textContent = isLast ? SG.I18n.t('levelSelect') : SG.I18n.t('nextLevel');
    }

    // ------------------------------------------------------------ 关卡列表与进度
    buildLevelList() {
      if (!this.el.levelList) return;
      const lang = SG.I18n.getLang();
      this.el.levelList.innerHTML = SG.Levels.all.map((level) => {
        const type = level.difficulty;
        const record = this.getRecord(level.id);
        const stars = record && record.stars ? record.stars : 0;
        const isCurrent = this.currentLevel && this.currentLevel.id === level.id;
        const name = level.name[lang] || level.name.zh;
        const subtitle = level.subtitle[lang] || level.subtitle.zh;
        const difficulty = SG.I18n.t(DIFFICULTY_KEYS[type] || 'difficultyEasy');
        const meta = record && record.best
          ? `${SG.I18n.t('best')} ${record.best} ${SG.I18n.t('movesUnit')}`
          : `${SG.I18n.t('par')} ${level.par} ${SG.I18n.t('movesUnit')}`;
        const starIcons = [0, 1, 2].map((index) =>
          `<svg viewBox="0 0 24 24" class="${index < stars ? 'is-on' : ''}"><path d="${STAR_PATH}"/></svg>`
        ).join('');
        return (
          `<button class="level-card${isCurrent ? ' is-current' : ''}" type="button" data-level-id="${escapeHTML(level.id)}" ` +
          `aria-label="${escapeHTML(name + ' · ' + difficulty + ' · ' + meta)}">` +
          `<span class="level-thumb">${this.buildLevelThumb(level)}</span>` +
          '<span class="level-card-copy">' +
          '<span class="level-card-top">' +
          `<span class="level-card-title">${escapeHTML(name)}</span>` +
          `<span class="difficulty-chip">${escapeHTML(difficulty)}</span>` +
          '</span>' +
          `<p>${escapeHTML(subtitle)}</p>` +
          '<span class="level-card-meta">' +
          `<span class="card-stars" aria-hidden="true">${starIcons}</span>` +
          `<span>${escapeHTML(meta)}</span>` +
          '</span>' +
          '</span>' +
          `<span class="level-card-arrow" aria-hidden="true">${ICON_ARROW}</span>` +
          '</button>'
        );
      }).join('');
    }

    buildLevelThumb(level) {
      return level.blocks.map((block) => {
        const type = SG.BlockTypes.get(block.type);
        const palette = type ? type.palette : { shell: '#f3dfc8', shellEdge: '#d6b58e' };
        const left = (block.x / level.grid.cols) * 100;
        const top = (block.y / level.grid.rows) * 100;
        const width = (block.w / level.grid.cols) * 100;
        const height = (block.h / level.grid.rows) * 100;
        return (
          `<span class="thumb-block" style="left:${left}%;top:${top}%;width:${width}%;height:${height}%;` +
          `background:${palette.shell};border-color:${palette.shellEdge};"></span>`
        );
      }).join('');
    }

    renderProgressDots() {
      if (!this.el.progressDots) return;
      this.el.progressDots.innerHTML = SG.Levels.all.map((level) => {
        const isActive = this.currentLevel && this.currentLevel.id === level.id;
        const record = this.getRecord(level.id);
        const classes = ['progress-dot'];
        if (isActive) classes.push('is-active');
        if (record) classes.push('is-complete');
        const name = SG.I18n.levelName(level);
        return (
          `<button class="${classes.join(' ')}" type="button" data-level-id="${escapeHTML(level.id)}" ` +
          `aria-label="${escapeHTML(name)}" ${isActive ? 'aria-current="true"' : ''}></button>`
        );
      }).join('');
    }

    getLevelIndex(levelId) {
      return SG.Levels.all.findIndex((level) => level.id === levelId);
    }

    // ------------------------------------------------------------ 选择 / 方向辅助
    selectBlock(blockId, options) {
      if (!this.game || this.game.won) return;
      const opts = options || {};
      const block = this.game.getBlock(blockId);
      if (!block) return;
      clearTimeout(this.selectTimer);
      this.selectedId = blockId;
      this.showGuides = opts.guides !== false;
      this.blockElements.forEach((element, id) => {
        element.classList.toggle('is-selected', id === blockId);
      });
      this.renderGuides();
      this.autoDeselectLater(opts.keepForLonger ? 5200 : 4200);
    }

    autoDeselectLater(delay) {
      clearTimeout(this.selectTimer);
      this.selectTimer = setTimeout(() => {
        if (this.drag) return;
        this.clearSelection();
      }, delay);
    }

    clearSelection() {
      clearTimeout(this.selectTimer);
      this.selectedId = null;
      this.showGuides = false;
      this.blockElements.forEach((element) => element.classList.remove('is-selected'));
      this.renderGuides();
    }

    renderGuides() {
      const layer = this.el.guideLayer;
      if (!layer) return;
      layer.innerHTML = '';
      if (!this.selectedId || !this.showGuides || !this.game || this.game.won) return;
      const block = this.game.getBlock(this.selectedId);
      if (!block) return;
      const moves = this.game.getSelectedMoves(this.selectedId);
      const cols = this.currentLevel.grid.cols;
      const rows = this.currentLevel.grid.rows;
      const boardW = this.el.board.clientWidth;
      const boardH = this.el.board.clientHeight;
      const cellW = boardW / cols;
      const cellH = boardH / rows;
      const pad = 16;

      const createArrow = (direction, distance) => {
        const dir = DIR_BY_KEY[direction];
        let left = (block.x + block.w / 2) * cellW;
        let top = (block.y + block.h / 2) * cellH;
        if (direction === 'left') left = block.x * cellW - 2;
        if (direction === 'right') left = (block.x + block.w) * cellW + 2;
        if (direction === 'up') top = block.y * cellH - 2;
        if (direction === 'down') top = (block.y + block.h) * cellH + 2;
        left = clamp(left, pad, boardW - pad);
        top = clamp(top, pad, boardH - pad);
        const name = SG.I18n.blockName(block.type);
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'guide-arrow';
        button.dataset.direction = direction;
        button.style.left = `${left}px`;
        button.style.top = `${top}px`;
        button.style.rotate = `${dir.rotation}deg`;
        button.setAttribute('aria-label', `${SG.I18n.t('dir' + direction[0].toUpperCase() + direction.slice(1))} · ${name}`);
        button.innerHTML = ICON_CHEVRON;
        button.addEventListener('pointerdown', (event) => {
          // 不 preventDefault，保留触摸端的合成 click；只阻止拖拽事件冒泡到棋盘。
          event.stopPropagation();
        });
        button.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.performMove(block.id, dir.dx, dir.dy, 1);
        });
        layer.appendChild(button);
      };

      if (moves.up > 0) createArrow('up', moves.up);
      if (moves.down > 0) createArrow('down', moves.down);
      if (moves.left > 0) createArrow('left', moves.left);
      if (moves.right > 0) createArrow('right', moves.right);
    }

    // ------------------------------------------------------------ 指针拖拽
    onBlockPointerDown(event, block) {
      if (!this.game || this.game.won) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (this.drag) return;
      event.preventDefault();
      event.stopPropagation();
      this.sound.unlock();
      this.cancelPendingHint();
      this.clearHintDisplay();

      const element = this.blockElements.get(block.id);
      if (!element) return;
      const moves = this.game.getSelectedMoves(block.id);
      const boardW = this.el.board.clientWidth;
      const boardH = this.el.board.clientHeight;
      this.selectBlock(block.id, { guides: false });
      this.showGuides = false;
      this.renderGuides();

      this.drag = {
        blockId: block.id,
        element,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        lastX: event.clientX,
        lastY: event.clientY,
        dx: 0,
        dy: 0,
        axis: null,
        offset: 0,
        max: moves,
        cellW: boardW / this.currentLevel.grid.cols,
        cellH: boardH / this.currentLevel.grid.rows,
        moved: false,
        startedAt: Date.now()
      };

      try {
        element.setPointerCapture(event.pointerId);
      } catch (_) {
        /* 某些浏览器在触摸结束后才支持 capture，忽略即可 */
      }

      this._onPointerMove = (moveEvent) => this.onPointerMove(moveEvent);
      this._onPointerUp = (upEvent) => this.onPointerUp(upEvent);
      window.addEventListener('pointermove', this._onPointerMove, { passive: false });
      window.addEventListener('pointerup', this._onPointerUp);
      window.addEventListener('pointercancel', this._onPointerUp);
    }

    onPointerMove(event) {
      const drag = this.drag;
      if (!drag || event.pointerId !== drag.pointerId) return;
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      drag.dx = dx;
      drag.dy = dy;

      if (!drag.axis) {
        if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
        drag.axis = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
        drag.element.classList.add('dragging');
        clearTimeout(this.selectTimer);
        this.showGuides = false;
        this.renderGuides();
      }

      const max = drag.axis === 'x'
        ? (dx > 0 ? drag.max.right : drag.max.left)
        : (dy > 0 ? drag.max.down : drag.max.up);
      const cell = drag.axis === 'x' ? drag.cellW : drag.cellH;
      const raw = drag.axis === 'x' ? dx : dy;
      const limit = max * cell;
      let offset;
      if (limit <= 0) {
        offset = clamp(raw, -6, 6);
      } else if (raw > limit) {
        offset = limit + Math.min(14, (raw - limit) * 0.16);
      } else if (raw < -limit) {
        offset = -limit - Math.min(14, (-raw - limit) * 0.16);
      } else {
        offset = raw;
      }
      drag.offset = offset;
      drag.moved = Math.abs(offset) > 3;
      if (drag.axis === 'x') {
        drag.element.style.setProperty('--drag-x', `${offset}px`);
        drag.element.style.setProperty('--drag-y', '0px');
      } else {
        drag.element.style.setProperty('--drag-x', '0px');
        drag.element.style.setProperty('--drag-y', `${offset}px`);
      }
      if (event.cancelable) event.preventDefault();
    }

    onPointerUp(event) {
      const drag = this.drag;
      if (!drag || event.pointerId !== drag.pointerId) return;
      this.removeDragListeners();
      try {
        drag.element.releasePointerCapture(drag.pointerId);
      } catch (_) {
        /* noop */
      }

      if (!drag.axis) {
        // 轻点：选中并显示方向按钮。
        this.drag = null;
        this.selectBlock(drag.blockId, { guides: true });
        this.sound.play('select');
        return;
      }

      const cell = drag.axis === 'x' ? drag.cellW : drag.cellH;
      const directionSign = drag.offset >= 0 ? 1 : -1;
      const distance = Math.abs(drag.offset);
      let steps = 0;
      if (distance > cell * 0.26 && event.type !== 'pointercancel') {
        steps = Math.max(1, Math.round(distance / cell));
      }
      const max = drag.axis === 'x'
        ? (directionSign > 0 ? drag.max.right : drag.max.left)
        : (directionSign > 0 ? drag.max.down : drag.max.up);
      steps = clamp(steps, 0, max);

      // 先生成一次“归位”动画的起点（包含拖拽偏移）。
      const oldRect = drag.element.getBoundingClientRect();
      drag.element.classList.remove('dragging');
      drag.element.style.setProperty('--drag-x', '0px');
      drag.element.style.setProperty('--drag-y', '0px');
      const dx = drag.axis === 'x' ? directionSign : 0;
      const dy = drag.axis === 'y' ? directionSign : 0;
      const blockId = drag.blockId;
      this.drag = null;

      if (!steps) {
        this.animateSnapBack(drag.element, oldRect);
        this.autoDeselectLater(2200);
        return;
      }

      drag.element.classList.add('no-transition');
      const committed = this.game.commitMove(blockId, dx, dy, steps);
      if (!committed) {
        drag.element.classList.remove('no-transition');
        this.animateSnapBack(drag.element, oldRect);
        this.sound.play('error');
        return;
      }
      this.animateCommittedBlock(drag.element, oldRect);
      this.autoDeselectLater(2600);
    }

    animateSnapBack(element, oldRect) {
      if (!element) return;
      // .dragging 已移除，CSS transform 过渡会把方块弹回格子。
      element.style.setProperty('--drag-x', '0px');
      element.style.setProperty('--drag-y', '0px');
      this.scheduleFit();
    }

    animateCommittedBlock(element, oldRect) {
      if (!element) return;
      const newRect = element.getBoundingClientRect();
      const offsetX = oldRect.left - newRect.left;
      const offsetY = oldRect.top - newRect.top;
      if (this.reducedMotion || (Math.abs(offsetX) < 1 && Math.abs(offsetY) < 1)) {
        requestAnimationFrame(() => element.classList.remove('no-transition'));
        return;
      }
      const animation = element.animate(
        [
          { transform: `translate3d(${offsetX}px, ${offsetY}px, 0)` },
          { transform: 'translate3d(0, 0, 0)' }
        ],
        {
          duration: 380,
          easing: 'cubic-bezier(.2, 1.08, .32, 1)'
        }
      );
      const cleanup = () => element.classList.remove('no-transition');
      animation.addEventListener('finish', cleanup, { once: true });
      animation.addEventListener('cancel', cleanup, { once: true });
      window.setTimeout(cleanup, 520);
    }

    cancelDrag() {
      if (!this.drag) return;
      const drag = this.drag;
      this.removeDragListeners();
      drag.element.classList.remove('dragging');
      drag.element.style.setProperty('--drag-x', '0px');
      drag.element.style.setProperty('--drag-y', '0px');
      this.drag = null;
    }

    removeDragListeners() {
      if (this._onPointerMove) window.removeEventListener('pointermove', this._onPointerMove);
      if (this._onPointerUp) {
        window.removeEventListener('pointerup', this._onPointerUp);
        window.removeEventListener('pointercancel', this._onPointerUp);
      }
      this._onPointerMove = null;
      this._onPointerUp = null;
    }

    onBoardPointerDown(event) {
      // 方向按钮 / 方块自己会阻止冒泡。
      if (this.game && this.game.won) return;
      const selected = this.selectedId ? this.game.getBlock(this.selectedId) : null;
      if (!selected) {
        this.clearSelection();
        this.clearHintDisplay();
        return;
      }
      const rect = this.el.board.getBoundingClientRect();
      const cols = this.currentLevel.grid.cols;
      const rows = this.currentLevel.grid.rows;
      const cellX = clamp(Math.floor(((event.clientX - rect.left) / rect.width) * cols), 0, cols - 1);
      const cellY = clamp(Math.floor(((event.clientY - rect.top) / rect.height) * rows), 0, rows - 1);
      const inside =
        cellX >= selected.x && cellX < selected.x + selected.w &&
        cellY >= selected.y && cellY < selected.y + selected.h;
      if (inside) return;

      let dx = 0;
      let dy = 0;
      let steps = 0;
      if (cellY >= selected.y && cellY < selected.y + selected.h && cellX !== selected.x) {
        if (cellX < selected.x) {
          dx = -1;
          steps = selected.x - cellX;
        } else {
          dx = 1;
          steps = cellX - (selected.x + selected.w - 1);
        }
      } else if (cellX >= selected.x && cellX < selected.x + selected.w && cellY !== selected.y) {
        if (cellY < selected.y) {
          dy = -1;
          steps = selected.y - cellY;
        } else {
          dy = 1;
          steps = cellY - (selected.y + selected.h - 1);
        }
      }

      if (steps > 0) {
        const moves = this.game.getSelectedMoves(selected.id);
        const max = dx < 0 ? moves.left : dx > 0 ? moves.right : dy < 0 ? moves.up : moves.down;
        this.performMove(selected.id, dx, dy, clamp(steps, 1, max || 1));
      } else {
        this.clearSelection();
      }
    }

    onBlockKeyDown(event, block) {
      if (!this.game || this.game.won) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.selectBlock(block.id, { guides: true });
        this.sound.play('select');
        return;
      }
      const keyMap = {
        ArrowUp: { dx: 0, dy: -1 },
        ArrowDown: { dx: 0, dy: 1 },
        ArrowLeft: { dx: -1, dy: 0 },
        ArrowRight: { dx: 1, dy: 0 }
      };
      const direction = keyMap[event.key];
      if (!direction) return;
      event.preventDefault();
      this.performMove(block.id, direction.dx, direction.dy, 1);
    }

    onKeyDown(event) {
      if (event.key === 'Escape') {
        if (this.openOverlays.length) {
          const top = this.openOverlays[this.openOverlays.length - 1];
          if (top === this.el.winOverlay) return;
          this.closeOverlay(top.id);
          return;
        }
        if (this.selectedId) {
          this.clearSelection();
          this.clearHintDisplay();
        }
      }
    }

    // ------------------------------------------------------------ 移动 / 撤销 / 重置
    performMove(blockId, dx, dy, steps) {
      if (!this.game || this.game.won) return false;
      this.clearHintDisplay();
      this.cancelPendingHint();
      const moves = this.game.getSelectedMoves(blockId);
      const max = dx < 0 ? moves.left : dx > 0 ? moves.right : dy < 0 ? moves.up : moves.down;
      if (!max) {
        this.sound.play('error');
        this.showToast(SG.I18n.t('noMoves'), 1200);
        return false;
      }
      this.selectBlock(blockId, { guides: this.showGuides });
      const result = this.game.commitMove(blockId, dx, dy, clamp(steps || 1, 1, max));
      if (result) this.autoDeselectLater(2600);
      return Boolean(result);
    }

    onGameChange(type, payload) {
      if (!this.game) return;
      if (type === 'move') {
        this.clearHintDisplay();
        this.cancelPendingHint();
        this.sound.play('slide');
        this.updatePositions();
        this.updateHUD(true);
        this.renderGuides();
        this.updateProgressAfterMove();
      } else if (type === 'undo') {
        this.sound.play('undo');
        this.updatePositions();
        this.updateHUD();
        this.renderGuides();
      } else if (type === 'win') {
        this.handleWin(payload);
      }
    }

    updateProgressAfterMove() {
      // 目前进度点只表示已完成关卡；保留扩展点用于未来实时星级。
    }

    undo() {
      if (!this.game || this.game.won) return;
      if (!this.game.canUndo()) {
        this.showToast(SG.I18n.t('undoEmpty'), 1500);
        return;
      }
      this.clearHintDisplay();
      this.cancelPendingHint();
      const blockId = this.game.undo();
      this.clearSelection();
      const block = blockId ? this.game.getBlock(blockId) : null;
      this.updatePositions();
      this.updateHUD();
      this.sound.play('undo');
      if (block) {
        this.showToast(SG.I18n.t('undoDone', { name: SG.I18n.blockName(block.type) }), 1500);
      }
    }

    resetLevel() {
      if (!this.game) return;
      this.clearHintDisplay();
      this.cancelPendingHint();
      this.clearSelection();
      this.cancelDrag();
      this.game.reset();
      this.updatePositions();
      this.updateHUD();
      this.sound.play('reset');
      this.showToast(SG.I18n.t('resetDone'), 1400);
      const levelId = this.currentLevel.id;
      if (this.settings.lastLevelId !== levelId) {
        this.settings.lastLevelId = levelId;
        this.saveSettings();
      }
    }

    replayCurrent() {
      if (!this.currentLevel) return;
      const id = this.currentLevel.id;
      this.hideWin();
      this.loadLevel(id);
    }

    goNext() {
      if (!this.currentLevel) return;
      const index = this.getLevelIndex(this.currentLevel.id);
      const isLast = index === SG.Levels.all.length - 1;
      this.hideWin();
      if (isLast) {
        this.openLevels();
        return;
      }
      this.loadLevel(SG.Levels.all[index + 1].id);
    }

    // ------------------------------------------------------------ 通关
    handleWin(payload) {
      if (this.winScheduled) return;
      this.winScheduled = true;
      this.cancelPendingHint();
      this.clearHintDisplay();
      this.clearSelection();
      const level = this.currentLevel;
      const steps = payload.steps;
      const previous = this.getRecord(level.id);
      const previousBest = previous && previous.best ? previous.best : null;
      const stars = this.calculateStars(level, steps);
      const best = previousBest == null ? steps : Math.min(previousBest, steps);
      const bestStars = previous && previous.stars ? Math.max(previous.stars, stars) : stars;
      this.records[level.id] = { best: best, stars: bestStars };
      this.saveRecords();
      this.updateHUD();
      this.renderProgressDots();
      this.buildLevelList();

      const newRecord = previousBest == null || steps < previousBest;
      this.fillWinModal({
        steps: steps,
        best: best,
        stars: stars,
        newRecord: newRecord
      });

      this.sound.play('win');
      const sheep = this.blockElements.get('sheep');
      if (sheep) {
        sheep.classList.add('is-celebrating');
        window.setTimeout(() => sheep.classList.remove('is-celebrating'), 2400);
      }

      const delay = this.reducedMotion ? 180 : 780;
      clearTimeout(this.winTimer);
      this.winTimer = window.setTimeout(() => {
        this.showWin();
      }, delay);
    }

    fillWinModal(data) {
      this.el.winSteps.textContent = String(data.steps);
      this.el.winBest.textContent = String(data.best);
      this.el.winStars.innerHTML = [0, 1, 2].map((index) =>
        `<svg class="win-star ${index < data.stars ? 'is-on' : ''}" viewBox="0 0 24 24" aria-hidden="true"><path d="${STAR_PATH}"/></svg>`
      ).join('');
      this.el.winRecord.textContent = data.newRecord
        ? `${SG.I18n.t('newRecord')} · ${SG.I18n.t('thisRun', { n: data.steps })}`
        : SG.I18n.t('bestRun', { n: data.best });
      this.updateWinLabels();
      this.el.winSubtitle.textContent = SG.I18n.t('winSub');
      this.el.winOverlay.setAttribute('aria-hidden', 'true');
    }

    showWin() {
      this.openOverlay('winOverlay', { focus: this.el.winNextBtn });
      requestAnimationFrame(() => this.startConfetti());
    }

    hideWin(options) {
      const opts = options || {};
      this.closeOverlay('winOverlay', { silent: true, restoreFocus: false });
      this.stopConfetti();
      if (!opts.silent) {
        this.winScheduled = false;
      }
    }

    getWinSheepSvg() {
      const uid = 'win-sheep-' + Date.now();
      return SG.BlockTypes.renderArt({ type: 'sheep', w: 2, h: 2, uid: uid });
    }

    // ------------------------------------------------------------ 提示求解
    getHintWorker() {
      if (!this.hintUseWorker || this.hintWorker) return this.hintWorker;
      if (!window.Worker || location.protocol === 'file:') {
        this.hintUseWorker = false;
        return null;
      }
      try {
        const worker = new Worker('js/core/hint-worker.js');
        worker.onmessage = (event) => this.onWorkerHintResult(event.data);
        worker.onerror = () => {
          this.hintUseWorker = false;
          this.hintWorker = null;
          if (this.hintPending) this.fallbackHintInMainThread();
        };
        this.hintWorker = worker;
        return worker;
      } catch (_) {
        this.hintUseWorker = false;
        return null;
      }
    }

    requestHint() {
      if (!this.game || this.hintBusy) return;
      if (this.game.won) {
        this.showToast(SG.I18n.t('hintStart'), 1500);
        return;
      }
      this.clearHintDisplay();
      this.clearSelection();
      this.sound.unlock();

      const level = this.currentLevel;
      const key = `${level.id}:${SG.Rules.stateKey(level, this.game.blocks)}`;
      const cached = this.hintCache.get(key);
      const token = ++this.hintToken;
      this.hintBusy = true;
      this.el.hintBtn.classList.add('is-thinking');
      this.el.hintBtn.setAttribute('aria-busy', 'true');
      this.showToast(SG.I18n.t('hintSearching'), 900);

      if (cached) {
        window.setTimeout(() => {
          if (this.hintToken === token) this.finishHint(cached, key);
        }, 150);
        return;
      }

      const payload = {
        jobId: token,
        level: level,
        blocks: this.game.blocks.map((block) => ({ ...block })),
        maxStates: 500000,
        timeLimitMs: 7000
      };
      this.hintPending = { token: token, key: key, worker: false };
      const worker = this.getHintWorker();
      if (worker) {
        this.hintPending.worker = true;
        this.hintWorkerJob = token;
        worker.postMessage(payload);
        clearTimeout(this.hintRequestTimeout);
        this.hintRequestTimeout = window.setTimeout(() => {
          if (!this.hintPending || this.hintPending.token !== token) return;
          this.hintPending = null;
          if (this.hintWorker) {
            try {
              this.hintWorker.terminate();
            } catch (_) {
              /* noop */
            }
            this.hintWorker = null;
          }
          this.finishHint({ moves: [], explored: 0, reason: 'timeout', ms: 9000 }, key);
        }, 10000);
      } else {
        // 本地直开 file:// 时 Worker 可能不可用，退回主线程；先让出一帧让 spinner 出现。
        window.setTimeout(() => {
          if (!this.hintPending || this.hintPending.token !== token) return;
          this.fallbackHintInMainThread();
        }, 40);
      }
    }

    onWorkerHintResult(data) {
      clearTimeout(this.hintRequestTimeout);
      const pending = this.hintPending;
      if (!pending || this.hintWorkerJob !== data.jobId) return;
      this.hintPending = null;
      this.hintWorkerJob = null;
      if (data.error) {
        // 后台线程异常时回退到主线程，避免一直转圈。
        this.hintPending = pending;
        this.hintWorker = null;
        this.hintUseWorker = false;
        this.fallbackHintInMainThread();
        return;
      }
      this.finishHint(data.result, pending.key);
    }

    fallbackHintInMainThread() {
      const pending = this.hintPending;
      if (!pending) return;
      // Worker 不可用时，把同一次求解放到主线程。为保持交互可用，只跑一次。
      this.hintPending = null;
      this.hintWorker = null;
      this.hintUseWorker = false;
      window.setTimeout(() => {
        let result;
        try {
          result = SG.Solver.solve(this.currentLevel, this.game.blocks.map((block) => ({ ...block })), {
            maxStates: 450000,
            timeLimitMs: 6000
          });
        } catch (_) {
          result = { moves: [], explored: 0, reason: 'error' };
        }
        if (pending.token !== this.hintToken) {
          this.setHintBusy(false);
          return;
        }
        this.finishHint(result, pending.key);
      }, 30);
    }

    finishHint(result, key) {
      this.setHintBusy(false);
      if (!result || !result.moves || !result.moves.length) {
        const reason = result && result.reason;
        this.showToast(
          reason === 'timeout' || reason === 'state-limit'
            ? SG.I18n.t('hintDeadEnd')
            : SG.I18n.t('hintNoSolution'),
          2600
        );
        this.sound.play('error');
        return;
      }

      this.hintCache.set(key, result);
      if (this.hintCache.size > 80) {
        const firstKey = this.hintCache.keys().next().value;
        this.hintCache.delete(firstKey);
      }
      const first = result.moves[0];
      const block = this.game.getBlock(first.id);
      if (!block) return;
      const name = SG.I18n.blockName(block.type);
      const directionKey = 'dir' + first.direction.charAt(0).toUpperCase() + first.direction.slice(1);
      const direction = SG.I18n.t(directionKey);
      const distanceText = first.distance > 1
        ? SG.I18n.t('hintDistance', { n: first.distance })
        : SG.I18n.t('hintOne');

      this.selectBlock(block.id, { guides: true, keepForLonger: true });
      this.showHintOnBlock(block, first, name + direction);
      this.showToast(
        `${SG.I18n.t('hintPrefix', { name: name, dir: direction })} · ${distanceText}`,
        3600
      );
      this.sound.play('hint');
    }

    setHintBusy(value) {
      this.hintBusy = value;
      this.el.hintBtn.classList.toggle('is-thinking', value);
      if (value) this.el.hintBtn.setAttribute('aria-busy', 'true');
      else this.el.hintBtn.removeAttribute('aria-busy');
    }

    showHintOnBlock(block, move, label) {
      const element = this.blockElements.get(block.id);
      if (!element) return;
      element.classList.add('is-hinting');
      const dir = DIR_BY_KEY[move.direction];
      const bubble = document.createElement('div');
      bubble.className = 'hint-bubble';
      const boardW = this.el.board.clientWidth;
      const boardH = this.el.board.clientHeight;
      const cols = this.currentLevel.grid.cols;
      const rows = this.currentLevel.grid.rows;
      const left = ((block.x + block.w / 2) / cols) * boardW;
      const top = ((block.y + block.h / 2) / rows) * boardH;
      bubble.style.left = `${left}px`;
      bubble.style.top = `${top}px`;
      bubble.innerHTML =
        `<span style="display:inline-block;rotate:${dir.rotation}deg">${ICON_CHEVRON}</span>` +
        `<span>${move.distance > 1 ? '×' + move.distance : ''}</span>` +
        `<span>${escapeHTML(label)}</span>`;
      this.el.guideLayer.appendChild(bubble);
      clearTimeout(this.hintTimer);
      this.hintTimer = window.setTimeout(() => this.clearHintDisplay(), 4600);
    }

    clearHintDisplay() {
      clearTimeout(this.hintTimer);
      this.hintTimer = null;
      this.blockElements.forEach((element) => element.classList.remove('is-hinting'));
      const bubble = $('.hint-bubble', this.el.guideLayer);
      if (bubble) bubble.remove();
      this.renderGuides();
    }

    cancelPendingHint() {
      this.hintToken += 1;
      const hadWorkerJob = this.hintPending && this.hintPending.worker;
      this.hintPending = null;
      clearTimeout(this.hintRequestTimeout);
      this.hintWorkerJob = null;
      if (hadWorkerJob && this.hintWorker) {
        // 旧任务继续跑会占住单线程 Worker，直接丢弃并重建。
        try {
          this.hintWorker.terminate();
        } catch (_) {
          /* noop */
        }
        this.hintWorker = null;
      }
      if (this.hintBusy) this.setHintBusy(false);
    }

    // ------------------------------------------------------------ 弹层 / Toast
    openLevels() {
      this.buildLevelList();
      this.openOverlay('levelsSheet');
    }

    openOverlay(id, options) {
      const overlay = document.getElementById(id);
      if (!overlay) return;
      const opts = options || {};
      if (id !== 'winOverlay') this.hideToast();
      if (!this.openOverlays.includes(overlay)) this.openOverlays.push(overlay);
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      if (!opts.silent) this.lastFocused = document.activeElement;

      const focusTarget =
        opts.focus ||
        overlay.querySelector('[data-close]') ||
        overlay.querySelector('button');
      if (focusTarget) {
        setTimeout(() => {
          try {
            focusTarget.focus({ preventScroll: true });
          } catch (_) {
            /* noop */
          }
        }, 40);
      }
    }

    closeOverlay(id, options) {
      const opts = options || {};
      const overlay = typeof id === 'string' ? document.getElementById(id) : id;
      if (!overlay) return;
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      this.openOverlays = this.openOverlays.filter((item) => item !== overlay);
      if (!this.openOverlays.length) document.body.classList.remove('modal-open');
      if (overlay === this.el.winOverlay) this.stopConfetti();
      if (!opts.silent && opts.restoreFocus !== false) {
        const active = this.lastFocused;
        if (active && typeof active.focus === 'function' && document.contains(active)) {
          try {
            active.focus({ preventScroll: true });
          } catch (_) {
            /* noop */
          }
        }
      }
    }

    showToast(message, duration) {
      clearTimeout(this.toastTimer);
      this.el.toast.textContent = message;
      this.el.toast.classList.add('is-visible');
      this.toastTimer = setTimeout(() => {
        this.el.toast.classList.remove('is-visible');
      }, duration || 2200);
    }

    hideToast() {
      clearTimeout(this.toastTimer);
      this.el.toast.classList.remove('is-visible');
    }

    // ------------------------------------------------------------ 棋盘尺寸与背景
    fitBoard() {
      if (!this.currentLevel || !this.el.boardFrame) return;
      const level = this.currentLevel;
      const aspect = level.grid.cols / level.grid.rows;
      const stageRect = this.el.boardStage.getBoundingClientRect();
      const stageWidth = this.el.boardStage.clientWidth;
      const compactLandscape = window.matchMedia('(orientation: landscape) and (max-height: 540px)').matches;
      let frameWidth;

      if (compactLandscape) {
        const available = Math.max(190, window.innerHeight - Math.max(stageRect.top, 48) - 8);
        const frameHeight = Math.max(160, available - 16);
        const boardWidthByHeight = (frameHeight - 16) * aspect;
        frameWidth = Math.min(stageWidth, 460, boardWidthByHeight);
      } else {
        const tipHeight = this.el.tipText.parentElement.offsetHeight || 0;
        const footerHeight = $('.level-progress').offsetHeight || 0;
        const bottomPadding = 18;
        const gap = 14;
        const available = Math.max(
          190,
          window.innerHeight - Math.max(stageRect.top, 100) - tipHeight - footerHeight - gap - bottomPadding
        );
        const frameHeight = Math.max(160, available - 18);
        const boardWidthByHeight = (frameHeight - 16) * aspect;
        const maxWidth = window.innerWidth >= 680 ? 460 : 430;
        frameWidth = Math.min(stageWidth, maxWidth, boardWidthByHeight);
      }
      frameWidth = Math.max(190, frameWidth);
      this.el.boardFrame.style.width = `${Math.round(frameWidth)}px`;

      const frameLeft = Math.max(0, (stageWidth - frameWidth) / 2);
      const innerWidth = Math.max(0, frameWidth - 16);
      const exit = level.exit || { col: 1, span: 2 };
      const exitCenter = (exit.col + exit.span / 2) / level.grid.cols;
      this.el.exitSign.style.left = `${frameLeft + 8 + innerWidth * exitCenter}px`;

      if (this.selectedId && this.showGuides) {
        this.renderGuides();
      }
    }

    initScene() {
      const random = seededRandom(19990521);
      const stars = [];
      for (let i = 0; i < 44; i++) {
        stars.push(
          `<span class="star-dot" style="left:${(random() * 100).toFixed(2)}%;top:${(random() * 68).toFixed(2)}%;` +
          `animation-delay:${(-random() * 4).toFixed(2)}s;opacity:${(0.25 + random() * 0.65).toFixed(2)}"></span>`
        );
      }
      this.el.stars.innerHTML = stars.join('');

      const petals = [];
      for (let i = 0; i < 14; i++) {
        petals.push(
          `<span class="petal-dot" style="left:${(random() * 100).toFixed(2)}%;` +
          `animation-duration:${(9 + random() * 8).toFixed(1)}s;animation-delay:${(-random() * 14).toFixed(1)}s;` +
          `scale:${(0.6 + random() * 0.8).toFixed(2)};opacity:${(0.45 + random() * 0.35).toFixed(2)}"></span>`
        );
      }
      this.el.petals.innerHTML = petals.join('');

      const flowers = [];
      for (let i = 0; i < 12; i++) {
        flowers.push(
          `<span class="meadow-flower" style="left:${(random() * 100).toFixed(1)}%;top:${(72 + random() * 26).toFixed(1)}%;` +
          `scale:${(0.6 + random() * 0.9).toFixed(2)};animation-delay:${(-random() * 8).toFixed(1)}s"></span>`
        );
      }
      this.el.meadowFlowers.innerHTML = flowers.join('');

      this.el.howtoSheep.innerHTML = SG.BlockTypes.renderArt({
        type: 'sheep',
        w: 2,
        h: 2,
        uid: 'howto-sheep'
      });
      this.el.winSheep.innerHTML = this.getWinSheepSvg();
    }

    // ------------------------------------------------------------ 撒花
    startConfetti() {
      if (this.reducedMotion) return;
      const canvas = this.el.confettiCanvas;
      if (!canvas) return;
      this.stopConfetti();
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const theme = SG.Themes.get(this.settings.theme);
      const colors = theme.confetti;
      const count = 120;
      const particles = [];
      for (let i = 0; i < count; i++) {
        const side = i % 2 === 0 ? 1 : -1;
        const originX = width / 2 + side * (width * 0.1) + (Math.random() - 0.5) * 80;
        const originY = height * 0.58;
        const angle = -Math.PI / 2 + side * (Math.random() * 0.6 + 0.12);
        const speed = 4 + Math.random() * 8;
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 1.5,
          vy: Math.sin(angle) * speed - Math.random() * 2,
          gravity: 0.055 + Math.random() * 0.035,
          drag: 0.994,
          rotate: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.2,
          size: 4 + Math.random() * 7,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: Math.random() > 0.72 ? 'circle' : Math.random() > 0.6 ? 'flower' : 'rect',
          alpha: 0.9 + Math.random() * 0.1,
          life: 0
        });
      }

      const startedAt = performance.now();
      const duration = 4200;
      let raf = 0;

      const draw = (now) => {
        const elapsed = now - startedAt;
        ctx.clearRect(0, 0, width, height);
        for (const particle of particles) {
          particle.life = elapsed;
          particle.vy += particle.gravity;
          particle.vx *= particle.drag;
          particle.vy *= particle.drag;
          particle.x += particle.vx + Math.sin((elapsed + particle.rotate * 100) / 380) * 0.35;
          particle.y += particle.vy;
          particle.rotate += particle.vr;
          const fade = elapsed > duration - 900 ? clamp(1 - (elapsed - (duration - 900)) / 900, 0, 1) : 1;
          ctx.save();
          ctx.globalAlpha = particle.alpha * fade;
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotate);
          ctx.fillStyle = particle.color;
          if (particle.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, particle.size * 0.42, 0, Math.PI * 2);
            ctx.fill();
          } else if (particle.shape === 'flower') {
            for (let p = 0; p < 5; p++) {
              ctx.beginPath();
              ctx.ellipse(
                Math.cos((p / 5) * Math.PI * 2) * particle.size * 0.36,
                Math.sin((p / 5) * Math.PI * 2) * particle.size * 0.36,
                particle.size * 0.3,
                particle.size * 0.18,
                (p / 5) * Math.PI * 2,
                0,
                Math.PI * 2
              );
              ctx.fill();
            }
          } else {
            ctx.fillRect(-particle.size / 2, -particle.size / 3, particle.size, particle.size * 0.66);
          }
          ctx.restore();
        }
        if (elapsed < duration) {
          raf = requestAnimationFrame(draw);
          if (this.confettiRun) this.confettiRun.raf = raf;
        } else {
          ctx.clearRect(0, 0, width, height);
          this.confettiRun = null;
        }
      };
      this.confettiRun = { raf: 0, ctx: ctx, width: width, height: height };
      this.confettiRun.raf = requestAnimationFrame(draw);
    }

    stopConfetti() {
      if (!this.confettiRun) return;
      cancelAnimationFrame(this.confettiRun.raf);
      try {
        this.confettiRun.ctx.clearRect(0, 0, this.confettiRun.width, this.confettiRun.height);
      } catch (_) {
        /* noop */
      }
      this.confettiRun = null;
    }
  }

  // 初始化。HTTP 下先读取最新 levels.json；file:// 下自动使用内置关卡。
  async function boot() {
    try {
      if (SG.LevelsLoader) {
        const result = await SG.LevelsLoader.loadLevels();
        if (result.source === 'levels.json') {
          console.info(`[救羊出圈] 已加载 levels.json（${result.count} 关）`);
        }
      }
      window.sheepEscape = new SheepEscapeApp();
    } catch (error) {
      console.error('[救羊出圈] 初始化失败', error);
      const toast = document.getElementById('toast');
      if (toast) {
        toast.textContent = '游戏加载遇到问题，请刷新页面重试。';
        toast.classList.add('is-visible');
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
