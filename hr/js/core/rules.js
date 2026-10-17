/**
 * 救羊出圈 · 纯规则层
 * ------------------------------------------------------------
 * 这里不碰 DOM、不读 localStorage，只负责棋盘规则。
 * 方便单测、求解器、关卡编辑器以及未来的服务端复用。
 *
 * 坐标约定：
 *   - 左上角为 (0, 0)，x 向右，y 向下；
 *   - 方块占据从 (x, y) 开始、宽 w 高 h 的矩形；
 *   - 一次“滑动”只能沿水平或垂直方向；允许一次滑动 1 格或多格。
 */
(function (root) {
  'use strict';

  const SG = (root.SG = root.SG || {});
  const DIRECTIONS = [
    { key: 'up', dx: 0, dy: -1 },
    { key: 'down', dx: 0, dy: 1 },
    { key: 'left', dx: -1, dy: 0 },
    { key: 'right', dx: 1, dy: 0 }
  ];

  /** 建立占用表；excludeId 用于计算某个方块自身可移动的空间。 */
  function buildOccupancy(level, blocks, excludeId) {
    const grid = Array.from({ length: level.grid.rows }, () =>
      Array(level.grid.cols).fill(null)
    );
    for (const block of blocks) {
      if (block.id === excludeId) continue;
      for (let y = block.y; y < block.y + block.h; y++) {
        for (let x = block.x; x < block.x + block.w; x++) {
          if (grid[y] && grid[y][x] !== undefined) grid[y][x] = block.id;
        }
      }
    }
    return grid;
  }

  function inBounds(level, x, y, w, h) {
    return x >= 0 && y >= 0 && x + w <= level.grid.cols && y + h <= level.grid.rows;
  }

  /**
   * 计算方块沿某方向最多可滑几格。
   * 只计算该方块自身的矩形，其他方块都视为障碍。
   */
  function maxSlide(level, blocks, blockId, dx, dy) {
    const block = blocks.find((item) => item.id === blockId);
    if (!block) return 0;
    if ((dx === 0) === (dy === 0)) return 0;
    const occupancy = buildOccupancy(level, blocks, blockId);
    let distance = 0;

    while (true) {
      const nx = block.x + dx * (distance + 1);
      const ny = block.y + dy * (distance + 1);
      if (!inBounds(level, nx, ny, block.w, block.h)) break;
      let blocked = false;
      for (let y = ny; y < ny + block.h && !blocked; y++) {
        for (let x = nx; x < nx + block.w; x++) {
          if (occupancy[y][x]) {
            blocked = true;
            break;
          }
        }
      }
      if (blocked) break;
      distance++;
    }
    return distance;
  }

  /** 返回某方块在四个方向上的可移动距离。 */
  function availableMoves(level, blocks, blockId) {
    const result = {};
    for (const direction of DIRECTIONS) {
      result[direction.key] = maxSlide(level, blocks, blockId, direction.dx, direction.dy);
    }
    return result;
  }

  /** 生成求解器用的所有合法“单次滑动”（含多格滑动）。 */
  function enumerateMoves(level, blocks, options) {
    const jumpsOnly = options && options.jumpsOnly;
    const moves = [];
    for (const block of blocks) {
      const occupancy = buildOccupancy(level, blocks, block.id);
      for (const direction of DIRECTIONS) {
        let distance = 0;
        while (true) {
          const nx = block.x + direction.dx * (distance + 1);
          const ny = block.y + direction.dy * (distance + 1);
          if (!inBounds(level, nx, ny, block.w, block.h)) break;
          let blocked = false;
          for (let y = ny; y < ny + block.h && !blocked; y++) {
            for (let x = nx; x < nx + block.w; x++) {
              if (occupancy[y][x]) {
                blocked = true;
                break;
              }
            }
          }
          if (blocked) break;
          distance++;
          // jumpsOnly 只生成“贴到障碍/边界”的终点，可显著减少搜索分支；
          // 提示功能希望动画自然，因此默认生成全部距离。
          if (jumpsOnly) continue;
          moves.push({
            id: block.id,
            dx: direction.dx,
            dy: direction.dy,
            distance,
            direction: direction.key
          });
        }
        if (jumpsOnly && distance > 0) {
          moves.push({
            id: block.id,
            dx: direction.dx,
            dy: direction.dy,
            distance,
            direction: direction.key
          });
        }
      }
    }
    return moves;
  }

  function moveBlock(level, blocks, blockId, dx, dy, distance) {
    const block = blocks.find((item) => item.id === blockId);
    if (!block) return null;
    if ((dx === 0) === (dy === 0)) return null;
    const requested = distance == null ? 1 : Math.abs(Math.trunc(distance));
    const max = maxSlide(level, blocks, blockId, dx, dy);
    const actual = Math.min(requested, max);
    if (actual <= 0) return null;
    return {
      id: block.id,
      from: { x: block.x, y: block.y },
      to: { x: block.x + dx * actual, y: block.y + dy * actual },
      dx: dx * actual,
      dy: dy * actual,
      distance: actual,
      direction: dx < 0 ? 'left' : dx > 0 ? 'right' : dy < 0 ? 'up' : 'down'
    };
  }

  function isGoal(level, blocks) {
    const goal = level.goal;
    if (!goal) return false;
    const block = blocks.find((item) => item.id === goal.blockId);
    if (!block) return false;
    if (goal.type === 'position') {
      return block.x === goal.x && block.y === goal.y;
    }
    if (goal.type === 'cover-cells') {
      return goal.cells.every((cell) => {
        return (
          cell.x >= block.x &&
          cell.x < block.x + block.w &&
          cell.y >= block.y &&
          cell.y < block.y + block.h
        );
      });
    }
    if (SG.Goals && typeof SG.Goals[goal.type] === 'function') {
      return SG.Goals[goal.type](level, block, goal);
    }
    return false;
  }

  /**
   * 校验关卡数据。返回错误数组，空数组代表关卡结构合法。
   * 这层校验会在游戏启动和未来的关卡编辑器保存时复用。
   */
  function validateLevel(level) {
    const errors = [];
    if (!level || !level.id) errors.push('缺少关卡 id');
    if (!level || !level.grid || !level.grid.cols || !level.grid.rows) {
      errors.push('缺少有效网格尺寸');
      return errors;
    }
    if (!Array.isArray(level.blocks) || !level.blocks.length) errors.push('关卡没有方块');
    if (!level.goal) errors.push('关卡没有目标条件');
    const occupied = Array.from({ length: level.grid.rows }, () =>
      Array(level.grid.cols).fill(null)
    );
    for (const block of level.blocks || []) {
      if (block.x < 0 || block.y < 0) errors.push(`${block.id} 超出棋盘`);
      if (block.x + block.w > level.grid.cols || block.y + block.h > level.grid.rows) {
        errors.push(`${block.id} 超出棋盘边界`);
      }
      for (let y = block.y; y < block.y + block.h; y++) {
        for (let x = block.x; x < block.x + block.w; x++) {
          if (!occupied[y] || occupied[y][x] === undefined) continue;
          if (occupied[y][x]) {
            errors.push(`${block.id} 与 ${occupied[y][x]} 在 (${x},${y}) 重叠`);
          } else {
            occupied[y][x] = block.id;
          }
        }
      }
    }
    if (level.goal && !level.blocks.some((block) => block.id === level.goal.blockId)) {
      errors.push('目标方块不存在');
    }
    if (level.exit) {
      if (level.exit.side !== 'bottom') errors.push('目前仅支持底部出口');
      if (
        level.exit.col < 0 ||
        level.exit.col + level.exit.span > level.grid.cols
      ) {
        errors.push('出口超出边界');
      }
    }
    return errors;
  }

  /** 从当前状态生成稳定可比较的状态键（求解器、缓存、存档共用）。 */
  function stateKey(level, blocks) {
    const ordered = level.blocks.map((spec) => {
      const block = blocks.find((item) => item.id === spec.id);
      return `${block.x},${block.y}`;
    });
    return ordered.join('|');
  }

  SG.Rules = {
    DIRECTIONS,
    buildOccupancy,
    inBounds,
    maxSlide,
    availableMoves,
    enumerateMoves,
    moveBlock,
    isGoal,
    validateLevel,
    stateKey
  };
})(typeof window !== 'undefined' ? window : globalThis);
