/**
 * 救羊出圈 · 内置关卡（自动生成文件）
 * ------------------------------------------------------------
 * 数据源：js/data/levels.json
 * 请勿直接修改本文件；修改 JSON 后运行 npm run sync-levels。
 *
 * 字段说明详见 README.md 的「关卡 JSON」一节。
 * 修改关卡后运行 npm run validate 重新求最短步数并校验可解性。
 */
(function (root) {
  'use strict';

  const SG = (root.SG = root.SG || {});

  const levels = [
  {
    "id": "meadow-1",
    "order": 1,
    "difficulty": "easy",
    "name": {
      "zh": "草地小径",
      "en": "Meadow Path"
    },
    "subtitle": {
      "zh": "第一次出门，先帮小家伙们挪挪脚。",
      "en": "A gentle first stroll. Make room for the little ones."
    },
    "hint": {
      "zh": "先把小鸭和小蘑菇请到两边，羊妈妈就有路啦。",
      "en": "Send Duck and Mushroom to the sides, then Mama Sheep can walk straight down."
    },
    "scene": "daisies",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 1,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 1,
      "y": 3
    },
    "par": 3,
    "starThresholds": [
      3,
      5
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 1,
        "y": 0,
        "w": 2,
        "h": 2
      },
      {
        "id": "duck-a",
        "type": "duck",
        "x": 1,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "mushroom-a",
        "type": "mushroom",
        "x": 2,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "pig-a",
        "type": "pig",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 2
      },
      {
        "id": "crate-a",
        "type": "crate",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 2
      },
      {
        "id": "chick-a",
        "type": "chick",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "garden-2",
    "order": 2,
    "difficulty": "medium",
    "name": {
      "zh": "花园捉迷藏",
      "en": "Garden Hide-and-Seek"
    },
    "subtitle": {
      "zh": "花园里挤满了朋友，聪明的绕路才是近路。",
      "en": "The garden is crowded. A clever detour is the shortest way."
    },
    "hint": {
      "zh": "小猪挡在正中间，试试先给上面的朋友们腾个位置。",
      "en": "Piggy is blocking the middle. Make a little room above before you push on."
    },
    "scene": "mushrooms",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 1,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 1,
      "y": 3
    },
    "par": 8,
    "starThresholds": [
      8,
      14
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 1,
        "y": 0,
        "w": 2,
        "h": 2
      },
      {
        "id": "pig-b",
        "type": "pig",
        "x": 1,
        "y": 2,
        "w": 1,
        "h": 2
      },
      {
        "id": "duck-b",
        "type": "duck",
        "x": 2,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "mushroom-b",
        "type": "mushroom",
        "x": 2,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "crate-b",
        "type": "crate",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 2
      },
      {
        "id": "chick-b",
        "type": "chick",
        "x": 0,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "chick-d",
        "type": "chick",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "duck-e",
        "type": "duck",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "moon-3",
    "order": 3,
    "difficulty": "hard",
    "name": {
      "zh": "月光大牧场",
      "en": "Moonlit Ranch"
    },
    "subtitle": {
      "zh": "星星亮起来了，带羊妈妈穿过更大的牧场。",
      "en": "The stars are out. Cross the bigger ranch and bring Mama Sheep home."
    },
    "hint": {
      "zh": "空间变大了，先挪开左边的大木箱，让岩石和小猪腾出中间的路。",
      "en": "There is more space now. Move the tall crate on the left to free the middle."
    },
    "scene": "fireflies",
    "grid": {
      "cols": 5,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 1,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 1,
      "y": 3
    },
    "par": 8,
    "starThresholds": [
      8,
      15
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 1,
        "y": 0,
        "w": 2,
        "h": 2
      },
      {
        "id": "pig-c",
        "type": "pig",
        "x": 1,
        "y": 2,
        "w": 2,
        "h": 1
      },
      {
        "id": "rock-c",
        "type": "rock",
        "x": 3,
        "y": 2,
        "w": 2,
        "h": 1
      },
      {
        "id": "crate-c",
        "type": "crate",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 2
      },
      {
        "id": "mushroom-c",
        "type": "mushroom",
        "x": 2,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "duck-c",
        "type": "duck",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "chick-c",
        "type": "chick",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "duck-d",
        "type": "duck",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "chick-e",
        "type": "chick",
        "x": 4,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "mushroom-d",
        "type": "mushroom",
        "x": 4,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "crate-d",
        "type": "crate",
        "x": 2,
        "y": 4,
        "w": 1,
        "h": 1
      }
    ]
  }
];

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
