/**
 * 从 js/data/levels.json（唯一数据源）生成 js/data/levels.js。
 * 这样既保留 JSON 数据驱动的可编辑性，也让游戏在 file:// 下无需 fetch 就能运行。
 *
 * 用法：node tools/sync-levels.js
 * 建议流程：编辑 levels.json → npm run sync-levels → npm run validate
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const rulesSource = fs.readFileSync(path.join(root, 'js/core/rules.js'), 'utf8');
vm.runInThisContext(rulesSource, { filename: 'js/core/rules.js' });

const jsonPath = path.join(root, 'js/data/levels.json');
const jsPath = path.join(root, 'js/data/levels.js');
const levels = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

if (!Array.isArray(levels) || !levels.length) {
  console.error('levels.json 必须包含非空关卡数组');
  process.exit(1);
}

let failed = false;
for (const level of levels) {
  const errors = globalThis.SG.Rules.validateLevel(level);
  if (errors.length) {
    failed = true;
    console.error(`❌ ${level.id || '(no id)'}: ${errors.join('；')}`);
  }
}
if (failed) process.exit(1);

const header = `/**
 * 救羊出圈 · 内置关卡（自动生成文件）
 * ------------------------------------------------------------
 * 数据源：js/data/levels.json
 * 请勿直接修改本文件；修改 JSON 后运行 npm run sync-levels。
 *
 * 字段说明详见 README.md 的「关卡 JSON」一节。
 * 修改关卡后运行 npm run validate 重新求最短步数并校验可解性。
 */
`;
const body = `(function (root) {
  'use strict';

  const SG = (root.SG = root.SG || {});

  const levels = ${JSON.stringify(levels, null, 2)};

  SG.Levels = {
    all: levels,
    byId(id) {
      return levels.find((level) => level.id === id) || levels[0];
    },
    validateAll() {
      return levels.map((level) => ({
        id: level.id,
        errors: SG.Rules ? SG.Rules.validateLevel(level) : []
      }));
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
`;

fs.writeFileSync(jsPath, header + body, 'utf8');
console.log(`✅ 已生成 js/data/levels.js（${levels.length} 个关卡）`);
