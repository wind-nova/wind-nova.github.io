/**
 * 提示求解 Worker。
 * 把 BFS 放到后台线程，复杂关卡（5×5）也不会卡住拖拽和动画。
 * 由 App 在支持 Worker 且非 file:// 页面时加载。
 */
importScripts('rules.js', 'solver.js');

self.onmessage = function (event) {
  const payload = event.data || {};
  const jobId = payload.jobId;
  try {
    const result = SG.Solver.solve(payload.level, payload.blocks, {
      maxStates: payload.maxStates || 500000,
      timeLimitMs: payload.timeLimitMs || 7000
    });
    self.postMessage({ jobId: jobId, result: result });
  } catch (error) {
    self.postMessage({
      jobId: jobId,
      error: error && error.message ? error.message : String(error)
    });
  }
};
