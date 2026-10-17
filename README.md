# 救羊出圈 · Save the Sheep

移动端优先的软萌动物华容道。拖动小鸭、小猪、蘑菇和木箱，为圆滚滚的羊妈妈让出一条通往花门出口的路。

纯 HTML + CSS + 原生 JavaScript，没有构建步骤、没有第三方运行时依赖。所有动物均为手绘内联 SVG。

## 快速开始

```bash
npm start
# 打开 http://127.0.0.1:4173
```

也可以直接双击 `index.html` 离线游玩；此时提示功能会从 Web Worker 自动回退到主线程计算。

```bash
npm run validate     # 校验 3 个关卡并求最短步数
npm run sync-levels  # 仅离线 file:// 兜底需要；HTTP 下改 JSON 刷新即可
```

## 已实现

- **3 个可玩关卡**：4×5 新手关、4×5 进阶关、5×5 烧脑关，最短步数分别为 3 / 8 / 8。
- **7 种手绘 SVG 方块**：羊妈妈、小鸭、小猪、蘑菇、木箱、石头、小鸡。
- **移动端优先交互**：
  - 鼠标 / 触摸拖拽，支持一次滑过 1～多格；
  - 点选方块后显示四向按钮，点一下走一格；
  - 点击空格也能让选中方块朝那个方向滑动；
  - 键盘方向键同样可以操作。
- **完整游戏状态**：步数、最佳纪录、撤销、重开、星级评分、水平进度。
- **提示系统**：浏览器 Web Worker 内运行 BFS 最短路径求解，高亮下一步方块、方向和格数。
- **情绪化动画**：弹性滑动、选中摇摆、眨眼、方向按钮跳动、通关星星、全屏 canvas 撒花。
- **主题 / 音效 / 多语言**：
  - 薄荷草地、樱花牧场、月光牧场三套主题；
  - 三套主题各有独立音阶、音色、撒花配色的合成音效；
  - 简体中文 / English 实时切换。
- **响应式**：320px 手机、平板、桌面、手机横屏都可用；横屏自动切换为左右双栏。
- **可扩展架构**：关卡 JSON、方块类型注册表、主题配置、i18n 字典、规则层与状态层分离。
- **无障碍基础**：方块可聚焦、方向按钮有 aria-label、弹窗语义与 `prefers-reduced-motion` 适配。

## 玩法

1. 拖动动物方块，给羊妈妈让路；选中方块时会出现方向按钮。
2. 方块不能重叠。目标是把 2×2 的羊妈妈移动到下方发光的出口区域。
3. 右上角的步数记录每一次滑动（一次多格拖拽也只算一步），最佳成绩保存在本地。
4. 卡住了就点 **提示**：后台求解器会告诉你可以先移动谁、向哪边、几格。

## 项目结构

```text
.
├── index.html                  # 页面骨架 / 弹层 / 无障碍语义
├── css/
│   └── style.css               # 主题变量、响应式、动画
├── js/
│   ├── app.js                  # 应用控制器：输入、渲染、弹层、庆祝
│   ├── core/
│   │   ├── rules.js            # 纯规则：边界、碰撞、最大滑动、通关判定
│   │   ├── game-state.js       # 状态：步数、撤销栈、通关事件
│   │   ├── solver.js           # BFS 最短路径求解器
│   │   ├── hint-worker.js      # 求解 Worker 入口
│   │   └── audio.js            # WebAudio 合成音效
│   └── data/
│       ├── levels.json         # 关卡唯一数据源
│       ├── levels-loader.js    # HTTP 下直接读取 JSON
│       ├── levels.js           # file:// 离线兜底（由 JSON 生成）
│       ├── block-types.js      # 方块类型注册表 + SVG 美术
│       ├── themes.js           # 主题 / 音阶 / 字体 / 撒花
│       └── i18n.js             # 中文 / English 文案
├── assets/favicon.svg
├── tools/
│   ├── serve.js                # 零依赖静态服务器
│   ├── solve-levels.js         # 校验 + 求解关卡
│   └── sync-levels.js          # levels.json → levels.js
└── docs/EXTENDING.md           # 深入扩展指南
```

## 架构分层

```text
输入事件
  │
  ├── app.js（渲染层 / 控制器）
  │       │ 只调用 GameState.commitMove / undo / reset
  │       ▼
  │   GameState（状态层）
  │       │ 调用纯函数
  │       ▼
  │   Rules（规则层）
  │
  ├── 数据层：levels.json / block-types / themes / i18n
  └── 求解：Solver 在 Worker 中运行，只返回建议，不直接改状态
```

- **规则层**（`js/core/rules.js`）不碰 DOM、不读 localStorage，可直接给关卡编辑器、Node 校验脚本复用。
- **状态层**（`js/core/game-state.js`）管理撤销快照与通关事件，渲染层只订阅 `onChange`。
- **渲染层**（`js/app.js` + CSS）负责 DOM、指针手势、FLIP 弹性动画、弹层与撒花。
- **数据层**只放配置和素材，新增内容不需要改核心逻辑。

## 关卡 JSON

每关是一个对象，完整字段见 `js/data/levels.json`。最小示例：

```json
{
  "id": "meadow-1",
  "order": 1,
  "difficulty": "easy",
  "name": { "zh": "草地小径", "en": "Meadow Path" },
  "subtitle": { "zh": "第一次出门…", "en": "A gentle first stroll…" },
  "hint": { "zh": "先把小鸭…", "en": "Send Duck…" },
  "scene": "daisies",
  "grid": { "cols": 4, "rows": 5 },
  "exit": { "side": "bottom", "col": 1, "span": 2 },
  "goal": { "type": "position", "blockId": "sheep", "x": 1, "y": 3 },
  "par": 3,
  "starThresholds": [3, 5],
  "blocks": [
    { "id": "sheep", "type": "sheep", "x": 1, "y": 0, "w": 2, "h": 2 },
    { "id": "duck-a", "type": "duck", "x": 1, "y": 2, "w": 1, "h": 1 }
  ]
}
```

- `exit` 只负责渲染出口标记；通关实际由 `goal` 判定。
- `goal.type` 支持：
  - `position`：指定方块左上角坐标；
  - `cover-cells`：覆盖若干格子（便于以后做非矩形出口）。
- `par` 和 `starThresholds` 由 `npm run validate` 辅助校准；`validate` 会打印求解路径。
- **正常使用 `npm start` 时，只改 `levels.json`、刷新页面即可**，不需要生成代码。`levels.js` 只在直接双击 `index.html`（`file://`）时作为离线兜底；那种场景才需要运行一次 `npm run sync-levels`。
- 方块可选 `image` / `alt` 字段覆盖 SVG 美术，渲染层会自动改用 `<img>`。

## 修改 / 新增关卡

1. 编辑 `js/data/levels.json`，刷新浏览器即可看到修改。
2. `npm run validate`，确认“✅ 可解”并把打印出的最短步数填回 `par`。
3. 如果希望双击 `index.html` 离线运行，再执行 `npm run sync-levels` 同步兜底文件。

求解脚本会校验：越界、重叠、目标是否存在、出口范围，以及从初始状态到目标的 BFS 解。

## 更多扩展

方块类型、主题、多语言、关卡包、编辑器接口等深入说明见 **[docs/EXTENDING.md](docs/EXTENDING.md)**。

## 验收要点对照

| 需求 | 实现 |
| --- | --- |
| 至少 3 个可玩关卡 | `meadow-1` / `garden-2` / `moon-3`，均通过 BFS 可解性校验 |
| 羊主角 + ≥4 种其他方块 | 6 种其他动物 / 道具 |
| 移动动画流畅 | CSS transform 拖拽 + FLIP/WAAPI 回弹；稳定 60fps 的手势渲染 |
| 通关庆祝 | 羊跳跃 + 星星弹出 + canvas 撒花 + 合成胜利音效 |
| 数据驱动 | 关卡 JSON + 类型 / 主题 / i18n 配置表 |
| 组件分离 | rules / game-state / solver / UI 分层 |
| 响应式 | 320px 起，平板、桌面、横屏双栏 |
| 多语言 / 音效开关 / 皮肤 | 全部可直接在设置面板切换 |

## 说明

本次交付为网页版；按需求暂未打包 APK。之后若需要移动安装包，可沿用当前无构建依赖的静态产物，用 WebView 容器或 Capacitor 套壳即可。

代码和 SVG 均为本项目内原创实现，可直接继续修改与分发。
