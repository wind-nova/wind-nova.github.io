# 扩展指南

这个项目刻意拆成了「数据、规则、状态、渲染」四层。下面是最常见的扩展入口。

## 1. 新增一种方块

打开 `js/data/block-types.js`，在文件底部用 `register(id, definition)` 注册：

```js
register('bunny', {
  name: { zh: '小兔', en: 'Bunny' },
  emoji: '🐰',
  sizes: [[1, 1], [1, 2]],
  palette: {
    shell: '#fff4f0',
    shellEdge: '#e9cfc8',
    glow: 'rgba(255, 180, 190, .35)',
    text: '#745a55'
  },
  // block = { id, type, x, y, w, h }，uid 用于保证 SVG 渐变 id 唯一
  art(block, uid) {
    return `<svg viewBox="0 0 120 120" class="block-svg" aria-hidden="true">
      <!-- 在这里绘制 SVG，或返回 <img src="..."> -->
    </svg>`;
  }
});
```

然后在关卡的 `blocks` 中使用 `"type": "bunny"`，并确保 `w/h` 在 `sizes` 范围内。渲染、拖拽、撤销、提示都不需要改。

> 如果使用位图，也可以在关卡方块上写 `image: 'assets/bunny.png'` 和 `alt`，渲染层会优先使用图片。

## 2. 新增 / 修改关卡

唯一数据源是 `js/data/levels.json`。用 `npm start` 运行时，**改 JSON 后刷新即可，无需生成代码**：加载器会直接请求 JSON。

```bash
npm run validate      # 校验重叠/越界/可解性，输出最短步数
npm run sync-levels   # 仅为了 file:// 离线兜底时生成 js/data/levels.js
```

关卡字段与示例见根目录 `README.md`。新增关卡后，关卡选择、进度点、最佳成绩会自动识别。

### 关卡包（预留）

未来做关卡包时可以：

1. 让包携带一个 `levels` 数组和 `packId`；
2. 在应用启动时把多包合并到 `SG.Levels.all`；
3. 用 `packId` 过滤关卡选择列表，并给每个包单独的进度存储 key。

由于 `GameState` 只依赖传入的单关对象，多包不需要改规则层。

## 3. 关卡编辑器（预留）

`js/core/rules.js` 可直接在 Node 或浏览器编辑器里复用：

```js
const errors = SG.Rules.validateLevel(level);      // 结构校验
const max = SG.Rules.maxSlide(level, blocks, id, dx, dy);
const solved = SG.Solver.solve(level, blocks);     // { moves, reason, explored }
```

建议编辑器流程：

- 画布只负责编辑 JSON，不直接改游戏 DOM；
- 每次保存前调用 `validateLevel`；
- 用 `Solver.solve` 实时显示“是否可解 / 最短步数”；
- 导出 JSON 后走 `sync-levels` 流程。

## 4. 新主题 / 皮肤 / 音效

在 `js/data/themes.js` 的 `themes` 数组追加一项：

```js
{
  id: 'forest',
  name: { zh: '森林营地', en: 'Forest Camp' },
  decor: 'clouds',
  swatch: ['#...', '#...', '#...'],
  font: '"Nunito", "PingFang SC", sans-serif',
  audio: { base: 349.23, scale: [0, 2, 4, 7, 9, 12], wave: 'sine', brightness: .8 },
  confetti: ['#...', '#...'],
  vars: {
    '--sky-top': '#...',
    // 建议复制 meadow 的完整 vars 后逐项替换，避免缺少变量
  }
}
```

所有组件都消费 CSS 变量，不需要改样式选择器。音效由 `js/core/audio.js` 用 WebAudio 实时合成；将来要换成交响采样，只需替换 `SoundEngine.play()` 内部实现。

## 5. 新语言

1. 在 `js/data/i18n.js` 的 `dictionaries` 中增加一份完整 key；
2. 在 `js/app.js` 的 `loadSettings` 允许的语言列表中登记；
3. 在 `index.html` 的语言切换按钮里增加目标语言；
4. 关卡名称/副标题/提示已按 `{ zh, en }` 结构支持，可添加同名字段。

新增文案时优先写 `data-i18n` 或 `SG.I18n.t(key)`，不要把中文硬编码进组件。

## 6. 排行榜 / 账号

当前最佳成绩存于 `localStorage`：

- `sheep-escape:v1:records`
- `sheep-escape:v1:settings`

接入排行榜时，在 `js/app.js` 的 `handleWin()` 里保留本地记录，同时把
`{ levelId, steps, stars, timestamp }` 发送到后端即可。UI 无需改动，
因为 HUD 和关卡列表都通过 `getRecord(levelId)` 取数。

## 7. 移动端套壳

当前是零构建静态站点。要做 APK / iOS 容器时，直接把根目录静态文件放进：

- 原生 WebView 的 `assets/www`，或
- Capacitor / Cordova 的 `webDir`。

注意两点：

- Worker 提示功能需要 HTTP(S) 源；WebView 若使用 `file://`，会自动回退到主线程求解。
- 音效必须在首次用户手势后解锁，项目已经在第一次 `pointerdown` 处理。

当前交付未包含 APK 打包。
