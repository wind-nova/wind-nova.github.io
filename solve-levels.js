/**
 * 关卡校验 / 求解脚本
 * 用法：node tools/solve-levels.js [levelId]
 *
 * 会验证：边界、重叠、目标是否存在，并用 BFS 求最短步数。
 * 修改关卡后请运行本脚本，把 par 更新为打印结果。
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
for (const file of ['js/core/rules.js', 'js/core/solver.js', 'js/data/levels.js']) {
  vm.runInThisContext(fs.readFileSync(path.join(root, file), 'utf8'), { filename: file });
}

const filter = process.argv[2];
const levels = globalThis.SG.Levels.all.filter((level) => !filter || level.id === filter);
let failed = false;

for (const level of levels) {
  const errors = globalThis.SG.Rules.validateLevel(level);
  const blocks = level.blocks.map((block) => ({ ...block }));
  let result = null;
  if (!errors.length) {
    result = globalThis.SG.Solver.solve(level, blocks, { maxStates: 600000, timeLimitMs: 20000 });
  }
  console.log('\n■ ' + level.id + ' · ' + level.name.zh);
  console.log('  棋盘 ' + level.grid.cols + 'x' + level.grid.rows + '，方块 ' + level.blocks.length);
  if (errors.length) {
    failed = true;
    console.log('  ❌ 结构错误: ' + errors.join('; '));
    continue;
  }
  if (!result || !result.moves.length) {
    failed = true;
    console.log('  ❌ 无解 / 搜索失败: ' + (result ? result.reason : 'solver error'));
    continue;
  }
  console.log('  ✅ 可解，最短 ' + result.moves.length + ' 步，探索 ' + result.explored + ' 状态，' + result.ms + 'ms');
  console.log('  路径: ' + result.moves.map((m) => `${m.id}:${m.direction}${m.distance}`).join(' → '));
  if (level.par !== result.moves.length) {
    console.log('  ⚠️  par 当前为 ' + level.par + '，应更新为 ' + result.moves.length);
  }
}

process.exit(failed ? 1 : 0);
