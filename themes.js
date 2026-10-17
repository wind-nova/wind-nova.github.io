/**
 * 救羊出圈 · 主题系统
 * ------------------------------------------------------------
 * 一套主题 = 颜色变量 + 字体 + 音效音阶 + 场景装饰 + 撒花配色。
 * 新增主题只需往 list 里追加一项；所有组件只消费 CSS 变量，不写死颜色。
 * 未来接入皮肤图片时，可在 theme 上增加 assets 字段，由背景组件读取。
 */
(function (root) {
  'use strict';

  const SG = (root.SG = root.SG || {});

  const themes = [
    {
      id: 'meadow',
      name: { zh: '薄荷草地', en: 'Mint Meadow' },
      decor: 'clouds',
      swatch: ['#bfe6cd', '#ffe7c7', '#fff7e8'],
      font: '"Nunito", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
      audio: { base: 392, scale: [0, 2, 4, 7, 9, 12], wave: 'sine', brightness: 0.9 },
      confetti: ['#ffb7c5', '#ffd66b', '#9fdcb2', '#b7d8ff', '#ffc9a3', '#e7c6ff'],
      vars: {
        '--sky-top': '#ffeeda',
        '--sky-mid': '#eff9e8',
        '--sky-bottom': '#d9f0ea',
        '--sun-glow': 'rgba(255, 224, 166, .62)',
        '--hill-back': '#cce9c9',
        '--hill-front': '#a9d7ad',
        '--ink': '#4f5f4c',
        '--ink-soft': '#7f8f7a',
        '--ink-faint': '#a8b5a2',
        '--panel': 'rgba(255, 253, 247, .8)',
        '--panel-strong': '#fffdf7',
        '--panel-border': 'rgba(255, 255, 255, .85)',
        '--accent': '#f49a86',
        '--accent-deep': '#d97767',
        '--accent-soft': '#ffe1d5',
        '--accent-contrast': '#fffaf4',
        '--leaf': '#75ae81',
        '--leaf-deep': '#4f8b61',
        '--board-frame': '#f4dcae',
        '--board-frame-edge': '#dbbd87',
        '--board-a': '#c9e9b8',
        '--board-b': '#a9d797',
        '--board-dot': 'rgba(93, 137, 83, .16)',
        '--board-shadow': 'rgba(97, 127, 88, .28)',
        '--exit-glow': 'rgba(255, 245, 176, .82)',
        '--selected': '#ffcf68',
        '--selected-glow': 'rgba(255, 201, 88, .48)',
        '--button-bg': 'rgba(255, 253, 247, .82)',
        '--button-border': 'rgba(222, 211, 190, .65)',
        '--overlay': 'rgba(57, 69, 52, .35)',
        '--modal': '#fffdf8',
        '--modal-border': 'rgba(255, 255, 255, .9)',
        '--shadow': '0 16px 36px rgba(102, 127, 89, .18)',
        '--soft-shadow': '0 8px 18px rgba(102, 127, 89, .12)',
        '--tag-bg': 'rgba(255, 255, 255, .82)',
        '--tag-text': '#6c7f68',
        '--outline': 'rgba(255,255,255,.9)',
        '--scrim-line': 'rgba(118, 158, 115, .15)'
      }
    },
    {
      id: 'sakura',
      name: { zh: '樱花牧场', en: 'Sakura Ranch' },
      decor: 'petals',
      swatch: ['#ffd6df', '#e8d6ff', '#fff7f4'],
      font: '"Nunito", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
      audio: { base: 440, scale: [0, 2, 4, 7, 11, 14], wave: 'triangle', brightness: 1 },
      confetti: ['#ffafc4', '#ffd1dc', '#d7b8ff', '#ffe7a8', '#ffc39e', '#c5e8ff'],
      vars: {
        '--sky-top': '#ffe5ea',
        '--sky-mid': '#f6eaff',
        '--sky-bottom': '#e6ecff',
        '--sun-glow': 'rgba(255, 203, 218, .66)',
        '--hill-back': '#e8d2e8',
        '--hill-front': '#d2bede',
        '--ink': '#5d4c5d',
        '--ink-soft': '#8c7a8b',
        '--ink-faint': '#b4a5b5',
        '--panel': 'rgba(255, 250, 251, .82)',
        '--panel-strong': '#fffbfc',
        '--panel-border': 'rgba(255, 255, 255, .9)',
        '--accent': '#e48b9f',
        '--accent-deep': '#c96f88',
        '--accent-soft': '#ffe0e7',
        '--accent-contrast': '#fffafb',
        '--leaf': '#b48bb5',
        '--leaf-deep': '#8e678f',
        '--board-frame': '#efd2bf',
        '--board-frame-edge': '#d3b096',
        '--board-a': '#e9d1dc',
        '--board-b': '#d9bed2',
        '--board-dot': 'rgba(150, 113, 139, .16)',
        '--board-shadow': 'rgba(118, 93, 111, .25)',
        '--exit-glow': 'rgba(255, 238, 190, .92)',
        '--selected': '#ffd17f',
        '--selected-glow': 'rgba(255, 195, 108, .5)',
        '--button-bg': 'rgba(255, 250, 252, .84)',
        '--button-border': 'rgba(227, 203, 216, .72)',
        '--overlay': 'rgba(67, 52, 66, .36)',
        '--modal': '#fffbfc',
        '--modal-border': 'rgba(255, 255, 255, .92)',
        '--shadow': '0 16px 36px rgba(119, 92, 112, .18)',
        '--soft-shadow': '0 8px 18px rgba(119, 92, 112, .12)',
        '--tag-bg': 'rgba(255, 255, 255, .86)',
        '--tag-text': '#7d687c',
        '--outline': 'rgba(255,255,255,.92)',
        '--scrim-line': 'rgba(180, 142, 168, .14)'
      }
    },
    {
      id: 'moon',
      name: { zh: '月光牧场', en: 'Moonlit Ranch' },
      decor: 'stars',
      swatch: ['#2d3f63', '#6f7fbe', '#ffe4a3'],
      font: '"Nunito", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
      audio: { base: 329.63, scale: [0, 2, 3, 7, 10, 12], wave: 'sine', brightness: 0.68 },
      confetti: ['#ffe6a7', '#b5c8ff', '#d5b7ff', '#9ce0d4', '#ffc5bd', '#fff5d6'],
      vars: {
        '--sky-top': '#101b36',
        '--sky-mid': '#1e3158',
        '--sky-bottom': '#49618b',
        '--sun-glow': 'rgba(255, 233, 170, .25)',
        '--hill-back': '#243b58',
        '--hill-front': '#1a2e47',
        '--ink': '#f6f1df',
        '--ink-soft': '#c4ccdd',
        '--ink-faint': '#8997ad',
        '--panel': 'rgba(33, 51, 83, .74)',
        '--panel-strong': '#273b5d',
        '--panel-border': 'rgba(147, 175, 221, .28)',
        '--accent': '#ffbd80',
        '--accent-deep': '#e79b66',
        '--accent-soft': 'rgba(255, 189, 128, .19)',
        '--accent-contrast': '#27324a',
        '--leaf': '#7899a9',
        '--leaf-deep': '#9ab8ad',
        '--board-frame': '#866c5b',
        '--board-frame-edge': '#5d4b43',
        '--board-a': '#68868c',
        '--board-b': '#506e75',
        '--board-dot': 'rgba(232, 250, 237, .12)',
        '--board-shadow': 'rgba(4, 10, 22, .42)',
        '--exit-glow': 'rgba(255, 231, 161, .72)',
        '--selected': '#ffe09b',
        '--selected-glow': 'rgba(255, 216, 137, .36)',
        '--button-bg': 'rgba(47, 70, 108, .72)',
        '--button-border': 'rgba(158, 183, 225, .26)',
        '--overlay': 'rgba(7, 13, 26, .58)',
        '--modal': '#223556',
        '--modal-border': 'rgba(160, 186, 228, .24)',
        '--shadow': '0 18px 40px rgba(4, 11, 26, .38)',
        '--soft-shadow': '0 8px 20px rgba(4, 11, 26, .26)',
        '--tag-bg': 'rgba(24, 39, 64, .78)',
        '--tag-text': '#dce4f2',
        '--outline': 'rgba(255, 243, 209, .72)',
        '--scrim-line': 'rgba(196, 216, 255, .1)'
      }
    }
  ];

  SG.Themes = {
    list: themes,
    defaultId: 'meadow',
    get(id) {
      return themes.find((theme) => theme.id === id) || themes[0];
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
