/**
 * 救羊出圈 · 多语言
 * ------------------------------------------------------------
 * 目前提供简体中文 / English。所有静态 UI 通过 data-i18n 更新；
 * 动态文案通过 SG.I18n.t(key, vars) 获取。
 * 新增语言：在 dictionaries 增加一套 key，然后在设置面板中加入选项。
 */
(function (root) {
  'use strict';

  const SG = (root.SG = root.SG || {});

  const dictionaries = {
    zh: {
      appName: '救羊出圈',
      tagline: '帮羊妈妈回到暖暖的家',
      saveTheSheep: 'Save the Sheep',
      level: '第 {n} 关',
      levelShort: '关卡',
      best: '最佳',
      steps: '步数',
      par: '目标',
      movesUnit: '步',
      undo: '撤销',
      hint: '提示',
      reset: '重开',
      restart: '再玩一次',
      nextLevel: '下一关',
      levelSelect: '选择关卡',
      close: '关闭',
      soundOn: '音效开',
      soundOff: '音效关',
      settings: '设置',
      themes: '牧场主题',
      language: '语言',
      howTo: '怎么玩',
      howToTitle: '把羊妈妈送到出口',
      howToLine1: '拖动动物方块，或点选方块后沿空白格轻扫。',
      howToLine2: '方块不能重叠；空位够大时，可以一次滑过好几格。',
      howToLine3: '把 2×2 的羊妈妈挪到下方发光的出口，就成功啦。',
      howToLine4: '卡住了？撤销一步，或者用提示看看下一步。',
      gotIt: '知道啦',
      exit: '出口',
      dragTip: '拖动方块，给羊妈妈让路',
      clickTip: '点选方块后，朝空位轻扫',
      winTitle: '羊妈妈回家啦！',
      winSub: '小动物们都为你鼓掌～',
      newRecord: '新纪录！',
      thisRun: '本次用了 {n} 步',
      bestRun: '最佳纪录 {n} 步',
      hintPrefix: '试试让 {name} 向{dir}滑',
      hintDistance: '{n} 格',
      hintOne: '1 格',
      hintNone: '这一步没有可移动的空间，先撤销试试？',
      hintDeadEnd: '这条路走不通了，撤销一步再试试吧。',
      hintSearching: '正在帮羊妈妈想路线…',
      hintNoSolution: '没有找到解法，重置一下再试试吧。',
      hintStart: '羊妈妈已经到出口啦！',
      undoEmpty: '还没有可以撤销的步骤',
      undoDone: '已撤销「{name}」',
      resetDone: '关卡已重置，重新出发！',
      hintFound: '找到一条 {n} 步的路线，先走第一步',
      dirUp: '上',
      dirDown: '下',
      dirLeft: '左',
      dirRight: '右',
      allLevels: '全部关卡',
      difficultyEasy: '轻松',
      difficultyMedium: '进阶',
      difficultyHard: '烧脑',
      stepsShort: '{n} 步',
      selected: '已选中',
      introTip: '目标：把羊妈妈送到花门出口',
      levelHintMeadow: '先给两只小家伙让个位置吧。',
      levelHintGarden: '别急着向下，绕一绕也许更快。',
      levelHintMoon: '地方更大了，但每一步都要想清楚。',
      themeMeadow: '薄荷草地',
      themeSakura: '樱花牧场',
      themeMoon: '月光牧场',
      langZh: '中文',
      langEn: 'EN',
      copyright: '为羊妈妈让一条回家的路',
      noMoves: '这里没有空位呀',
      animationOff: '检测到系统偏好减少动画，已关闭撒花',
      editorFuture: '更多牧场即将开放',
      coins: '爱心',
      stars: '星星',
      score: '得分'
    },
    en: {
      appName: 'Save the Sheep',
      tagline: 'Guide Mama Sheep back home',
      saveTheSheep: 'Save the Sheep',
      level: 'Level {n}',
      levelShort: 'Level',
      best: 'Best',
      steps: 'Moves',
      par: 'Target',
      movesUnit: 'moves',
      undo: 'Undo',
      hint: 'Hint',
      reset: 'Restart',
      restart: 'Play again',
      nextLevel: 'Next level',
      levelSelect: 'Choose a level',
      close: 'Close',
      soundOn: 'Sound on',
      soundOff: 'Sound off',
      settings: 'Settings',
      themes: 'Ranch themes',
      language: 'Language',
      howTo: 'How to play',
      howToTitle: 'Lead Mama Sheep to the exit',
      howToLine1: 'Drag a block, or tap it and swipe toward empty cells.',
      howToLine2: 'Blocks cannot overlap. A long swipe can cross several cells.',
      howToLine3: 'Move the 2×2 Mama Sheep onto the glowing exit at the bottom.',
      howToLine4: 'Stuck? Step back with Undo, or peek at the next hint.',
      gotIt: 'Got it',
      exit: 'EXIT',
      dragTip: 'Slide the blocks to clear the way',
      clickTip: 'Tap a block, then swipe toward a gap',
      winTitle: 'Mama Sheep is home!',
      winSub: 'All the little friends are cheering for you',
      newRecord: 'New record!',
      thisRun: 'Finished in {n} moves',
      bestRun: 'Best record: {n} moves',
      hintPrefix: 'Try sliding {name} {dir}',
      hintDistance: '{n} cell(s)',
      hintOne: '1 cell',
      hintNone: 'That block has no room right now. Maybe undo?',
      hintDeadEnd: 'This route is blocked. Undo a move and try again.',
      hintSearching: 'Finding a way home for Mama Sheep…',
      hintNoSolution: 'No solution found. Try restarting the level.',
      hintStart: 'Mama Sheep is already at the exit!',
      undoEmpty: 'Nothing to undo yet',
      undoDone: 'Undid “{name}”',
      resetDone: 'Level reset. Off we go!',
      hintFound: 'A {n}-move route found. Here is the first step.',
      dirUp: 'up',
      dirDown: 'down',
      dirLeft: 'left',
      dirRight: 'right',
      allLevels: 'All levels',
      difficultyEasy: 'Easy',
      difficultyMedium: 'Medium',
      difficultyHard: 'Brainy',
      stepsShort: '{n} moves',
      selected: 'Selected',
      introTip: 'Goal: bring Mama Sheep to the flower gate',
      levelHintMeadow: 'Make room for two little friends first.',
      levelHintGarden: 'Don’t rush down; a little detour may be quicker.',
      levelHintMoon: 'More space, more possibilities. Plan each move.',
      themeMeadow: 'Mint Meadow',
      themeSakura: 'Sakura Ranch',
      themeMoon: 'Moonlit Ranch',
      langZh: '中文',
      langEn: 'EN',
      copyright: 'Make a way home for Mama Sheep',
      noMoves: 'No room to move there',
      animationOff: 'Reduced motion detected; confetti is off',
      editorFuture: 'More ranches coming soon',
      coins: 'Hearts',
      stars: 'Stars',
      score: 'Score'
    }
  };

  let current = 'zh';
  const listeners = new Set();

  function t(key, vars) {
    const dictionary = dictionaries[current] || dictionaries.zh;
    let text = dictionary[key] != null ? dictionary[key] : dictionaries.zh[key] != null ? dictionaries.zh[key] : key;
    if (vars) {
      for (const name of Object.keys(vars)) {
        text = text.replaceAll('{' + name + '}', vars[name]);
      }
    }
    return text;
  }

  function apply(rootElement) {
    const scope = rootElement || document;
    scope.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      const target = element.getAttribute('data-i18n-target');
      if (target) {
        element.setAttribute(target, t(key));
      } else {
        element.textContent = t(key);
      }
    });
    scope.querySelectorAll('[data-i18n-aria]').forEach((element) => {
      element.setAttribute('aria-label', t(element.getAttribute('data-i18n-aria')));
    });
    document.documentElement.lang = current === 'zh' ? 'zh-CN' : 'en';
  }

  SG.I18n = {
    t,
    apply,
    setLang(lang) {
      if (!dictionaries[lang] || lang === current) return;
      current = lang;
      apply();
      listeners.forEach((callback) => callback(lang));
    },
    getLang() {
      return current;
    },
    onChange(callback) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    blockName(typeId) {
      const type = SG.BlockTypes && SG.BlockTypes.get(typeId);
      if (!type) return typeId;
      return type.name[current] || type.name.zh || typeId;
    },
    levelName(level) {
      if (!level || !level.name) return '';
      return level.name[current] || level.name.zh || '';
    },
    levelHint(level) {
      if (!level) return '';
      if (level.hint && (level.hint[current] || level.hint.zh)) {
        return level.hint[current] || level.hint.zh;
      }
      return t('levelHint' + (level.id || '').replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase()));
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
