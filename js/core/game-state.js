/**
 * 救羊出圈 · 游戏状态层
 * ------------------------------------------------------------
 * 维护方块位置、步数、撤销栈和通关状态。
 * 不依赖 DOM；渲染层订阅 onChange 后自行更新。
 */
(function (root) {
  'use strict';

  const SG = (root.SG = root.SG || {});
  const Rules = SG.Rules;

  class GameState {
    constructor(level) {
      this.listeners = new Set();
      this.setLevel(level);
    }

    setLevel(level) {
      const errors = Rules.validateLevel(level);
      if (errors.length) throw new Error('关卡不合法：' + errors.join('；'));
      this.level = level;
      this.reset(true);
    }

    reset(silent) {
      this.blocks = this.level.blocks.map((spec) => ({
        id: spec.id,
        type: spec.type,
        x: spec.x,
        y: spec.y,
        w: spec.w,
        h: spec.h,
        image: spec.image,
        alt: spec.alt
      }));
      this.steps = 0;
      this.history = [];
      this.won = false;
      this.lastMove = null;
      if (!silent) this.emit('reset', { });
    }

    getBlock(id) {
      return this.blocks.find((block) => block.id === id) || null;
    }

    getSelectedMoves(id) {
      return Rules.availableMoves(this.level, this.blocks, id);
    }

    /**
     * 提交一次滑动。距离会被自动夹到合法范围内。
     * 只要实际移动 >= 1 格，就记为一步。
     */
    commitMove(id, dx, dy, distance) {
      if (this.won) return null;
      const move = Rules.moveBlock(this.level, this.blocks, id, dx, dy, distance);
      if (!move) return null;

      const snapshot = {
        blocks: this.blocks.map((block) => ({ ...block })),
        steps: this.steps,
        won: this.won
      };
      this.history.push(snapshot);
      if (this.history.length > 400) this.history.shift();

      const block = this.getBlock(id);
      block.x = move.to.x;
      block.y = move.to.y;
      this.steps += 1;
      this.lastMove = { ...move, type: block.type };

      const justWon = Rules.isGoal(this.level, this.blocks);
      this.won = justWon;
      this.emit('move', { move: this.lastMove, steps: this.steps, won: justWon });
      if (justWon) this.emit('win', { steps: this.steps });
      return { ...move, won: justWon };
    }

    canUndo() {
      return this.history.length > 0 && !this.won;
    }

    undo() {
      if (!this.canUndo()) return null;
      const snapshot = this.history.pop();
      const previous = this.blocks.map((block) => ({ ...block }));
      this.blocks = snapshot.blocks;
      this.steps = snapshot.steps;
      this.won = snapshot.won;
      // 找出被撤销的那一步，用于音效/提示。
      const changed = this.blocks.find((block, index) => {
        const old = previous[index];
        return old && (old.x !== block.x || old.y !== block.y);
      });
      this.lastMove = null;
      this.emit('undo', { blockId: changed ? changed.id : null, steps: this.steps });
      return changed ? changed.id : null;
    }

    serialize() {
      return {
        levelId: this.level.id,
        steps: this.steps,
        positions: this.blocks.map(({ id, x, y }) => ({ id, x, y })),
        won: this.won
      };
    }
  }

  // 事件混入（保持状态层轻量，也方便未来换成 Proxy / 状态库）。
  GameState.prototype.emit = function (type, payload) {
    this.listeners.forEach((callback) => callback(type, payload, this));
  };
  GameState.prototype.onChange = function (callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  };

  SG.GameState = GameState;
})(typeof window !== 'undefined' ? window : globalThis);
