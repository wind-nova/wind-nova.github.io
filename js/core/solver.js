/**
 * 救羊出圈 · 求解器
 * ------------------------------------------------------------
 * 广度优先搜索（BFS）当前状态到目标状态的最短“滑动”序列。
 * 一次滑动允许 1 到多格，和玩家实际拖拽一次算一步一致。
 * 提示按钮只需要路径的第一步，但这里保留完整路径，方便未来做自动演示。
 *
 * 性能策略：
 *   - 状态只记录每个方块的 x,y，按关卡中的方块顺序编码为字符串；
 *   - 用 Map 记录父节点，找到目标后回溯；
 *   - 设置状态数量/时间上限，避免在复杂关卡里冻住页面。
 */
(function (root) {
  'use strict';

  const SG = (root.SG = root.SG || {});
  const Rules = SG.Rules;

  function makeBlocks(level, positions) {
    return level.blocks.map((spec, index) => ({
      id: spec.id,
      type: spec.type,
      x: positions[index * 2],
      y: positions[index * 2 + 1],
      w: spec.w,
      h: spec.h
    }));
  }

  function solve(level, startBlocks, options) {
    const opts = Object.assign(
      { maxStates: 180000, timeLimitMs: 2500, jumpsOnly: false },
      options || {}
    );
    const startedAt = Date.now();
    const specs = level.blocks;
    const startPositions = [];
    for (const spec of specs) {
      const block = startBlocks.find((item) => item.id === spec.id);
      startPositions.push(block.x, block.y);
    }

    if (Rules.isGoal(level, startBlocks)) {
      return { moves: [], explored: 1, reason: 'solved', ms: 0 };
    }

    const nodes = [
      {
        positions: startPositions,
        key: startPositions.join(','),
        parent: -1,
        move: null
      }
    ];
    const visited = new Map([[nodes[0].key, 0]]);
    let head = 0;
    let goalIndex = -1;

    while (head < nodes.length) {
      if (nodes.length > opts.maxStates) {
        return { moves: [], explored: nodes.length, reason: 'state-limit', ms: Date.now() - startedAt };
      }
      if ((head & 255) === 0 && Date.now() - startedAt > opts.timeLimitMs) {
        return { moves: [], explored: nodes.length, reason: 'time-limit', ms: Date.now() - startedAt };
      }
      const current = nodes[head];
      const blocks = makeBlocks(level, current.positions);
      const moves = Rules.enumerateMoves(level, blocks, { jumpsOnly: opts.jumpsOnly });
      for (const move of moves) {
        const positions = current.positions.slice();
        const blockIndex = specs.findIndex((spec) => spec.id === move.id);
        positions[blockIndex * 2] += move.dx * move.distance;
        positions[blockIndex * 2 + 1] += move.dy * move.distance;
        const key = positions.join(',');
        if (visited.has(key)) continue;
        const nodeIndex = nodes.length;
        nodes.push({ positions, key, parent: head, move });
        visited.set(key, nodeIndex);
        const nextBlocks = makeBlocks(level, positions);
        if (Rules.isGoal(level, nextBlocks)) {
          goalIndex = nodeIndex;
          break;
        }
      }
      if (goalIndex !== -1) break;
      head++;
    }

    if (goalIndex === -1) {
      return {
        moves: [],
        explored: nodes.length,
        reason: head >= nodes.length ? 'unsolvable' : 'unknown',
        ms: Date.now() - startedAt
      };
    }

    const path = [];
    let cursor = goalIndex;
    while (cursor > 0) {
      const node = nodes[cursor];
      path.push({
        id: node.move.id,
        dx: node.move.dx,
        dy: node.move.dy,
        distance: node.move.distance,
        direction: node.move.direction
      });
      cursor = node.parent;
    }
    path.reverse();
    return {
      moves: path,
      explored: nodes.length,
      reason: 'solved',
      ms: Date.now() - startedAt
    };
  }

  SG.Solver = { solve };
})(typeof window !== 'undefined' ? window : globalThis);
