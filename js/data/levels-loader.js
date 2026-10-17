/**
 * 关卡加载器
 * ------------------------------------------------------------
 * HTTP(S) 环境下直接读取 js/data/levels.json，改完 JSON 刷新页面即可生效，
 * 不需要重新生成任何代码。
 *
 * 直接以 file:// 打开页面时，浏览器不允许 fetch 本地 JSON，
 * 这时自动退回使用 js/data/levels.js（由 npm run sync-levels 生成）。
 */
(function (root) {
  'use strict';

  const SG = (root.SG = root.SG || {});

  function installLevels(levels) {
    const registry = SG.Levels || {};
    registry.all = levels;
    registry.byId = function (id) {
      return levels.find((level) => level.id === id) || levels[0];
    };
    registry.validateAll = function () {
      return levels.map((level) => ({
        id: level.id,
        errors: SG.Rules ? SG.Rules.validateLevel(level) : []
      }));
    };
    registry.source = 'levels.json';
    SG.Levels = registry;
  }

  async function loadLevels() {
    const canFetch = location.protocol === 'http:' || location.protocol === 'https:';
    if (!canFetch) {
      return { source: 'bundled', reason: 'file-protocol' };
    }

    try {
      const response = await fetch('js/data/levels.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const levels = await response.json();
      if (!Array.isArray(levels) || !levels.length) {
        throw new Error('levels.json 必须是非空数组');
      }

      const errors = [];
      for (const level of levels) {
        const levelErrors = SG.Rules ? SG.Rules.validateLevel(level) : [];
        levelErrors.forEach((message) => errors.push(`${level.id || '(no id)'}: ${message}`));
      }
      if (errors.length) {
        throw new Error('关卡数据不合法：' + errors.join('；'));
      }

      installLevels(levels);
      return { source: 'levels.json', count: levels.length };
    } catch (error) {
      console.warn('[救羊出圈] levels.json 加载失败，使用内置关卡。', error);
      return { source: 'bundled', reason: error.message };
    }
  }

  SG.LevelsLoader = { loadLevels };
})(typeof window !== 'undefined' ? window : globalThis);
