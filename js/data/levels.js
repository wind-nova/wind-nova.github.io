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
    "id": "clover-5",
    "order": 2,
    "difficulty": "easy",
    "name": {
      "zh": "三叶草坡",
      "en": "Clover Slope"
    },
    "subtitle": {
      "zh": "三叶草开满小坡，右边那扇花门就是家。",
      "en": "Clover blooms across the slope. Home is through the flower gate on the right."
    },
    "hint": {
      "zh": "先让小鸭往右，再把胖猪向下一格、木箱向上让路。",
      "en": "Move Duck right, nudge Piggy down and the crate up, then slide Mama Sheep down."
    },
    "scene": "mushrooms",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 2,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 2,
      "y": 3
    },
    "par": 5,
    "starThresholds": [
      5,
      8
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 2,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "chick-a",
        "type": "chick",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "rock-a",
        "type": "rock",
        "x": 1,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "mushroom-a",
        "type": "mushroom",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "duck-a",
        "type": "duck",
        "x": 0,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "pig-a",
        "type": "pig",
        "x": 0,
        "y": 1,
        "w": 2,
        "h": 1
      },
      {
        "id": "pig-b",
        "type": "pig",
        "x": 1,
        "y": 3,
        "w": 2,
        "h": 1
      },
      {
        "id": "crate-a",
        "type": "crate",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 2
      }
    ]
  },
  {
    "id": "dew-4",
    "order": 3,
    "difficulty": "easy",
    "name": {
      "zh": "晨露小径",
      "en": "Dewdrop Path"
    },
    "subtitle": {
      "zh": "晨露还挂在草尖，左边的小门在等羊妈妈。",
      "en": "Dewdrops sparkle as Mama Sheep heads for the little gate on the left."
    },
    "hint": {
      "zh": "先把小蘑菇往上推，再依次挪开左边的小鸡和小猪。",
      "en": "Push the Mushroom upward first, then shuffle the Chick and Piggy on the left."
    },
    "scene": "daisies",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 0,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 0,
      "y": 3
    },
    "par": 5,
    "starThresholds": [
      5,
      8
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 2,
        "y": 3,
        "w": 2,
        "h": 2
      },
      {
        "id": "pig-a",
        "type": "pig",
        "x": 0,
        "y": 2,
        "w": 1,
        "h": 2
      },
      {
        "id": "duck-a",
        "type": "duck",
        "x": 3,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "crate-a",
        "type": "crate",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "mushroom-a",
        "type": "mushroom",
        "x": 1,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "chick-a",
        "type": "chick",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "crate-b",
        "type": "crate",
        "x": 1,
        "y": 3,
        "w": 1,
        "h": 2
      }
    ]
  },
  {
    "id": "berry-6",
    "order": 4,
    "difficulty": "easy",
    "name": {
      "zh": "莓果花园",
      "en": "Berry Garden"
    },
    "subtitle": {
      "zh": "莓果丛里挤挤挨挨，先请小猪们让一让。",
      "en": "The berry patch is crowded. Ask the piggies to shuffle along."
    },
    "hint": {
      "zh": "羊妈妈先向右挪一格，再让木箱和小猪依次错开。",
      "en": "Shift Mama Sheep right first, then let the crate and piggies shuffle apart."
    },
    "scene": "daisies",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 2,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 2,
      "y": 3
    },
    "par": 6,
    "starThresholds": [
      6,
      10
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 0,
        "y": 3,
        "w": 2,
        "h": 2
      },
      {
        "id": "pig-a",
        "type": "pig",
        "x": 1,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "crate-a",
        "type": "crate",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "pig-b",
        "type": "pig",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 2
      },
      {
        "id": "duck-a",
        "type": "duck",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "rock-a",
        "type": "rock",
        "x": 1,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "pig-c",
        "type": "pig",
        "x": 2,
        "y": 1,
        "w": 2,
        "h": 1
      }
    ]
  },
  {
    "id": "dewdrop-garden",
    "order": 5,
    "difficulty": "easy",
    "name": {
      "zh": "露珠花园",
      "en": "Dewdrop Garden"
    },
    "subtitle": {
      "zh": "露珠花园的花门就在前方，先看看谁挡了路。",
      "en": "The flower gate at Dewdrop Garden is close. See who is in the way."
    },
    "hint": {
      "zh": "先让小鸭向右挪动，再让木箱向右让一让。",
      "en": "Start by sliding Duck right, then let the wooden crate move right."
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
    "par": 6,
    "starThresholds": [
      6,
      9
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 0,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "duck",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "mushroom",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "pig",
        "x": 2,
        "y": 1,
        "w": 2,
        "h": 1
      },
      {
        "id": "b3",
        "type": "crate",
        "x": 1,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "crate",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "duck",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "crate",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "pig",
        "x": 0,
        "y": 0,
        "w": 2,
        "h": 1
      }
    ]
  },
  {
    "id": "breeze-7",
    "order": 6,
    "difficulty": "easy",
    "name": {
      "zh": "风铃草甸",
      "en": "Windbell Meadow"
    },
    "subtitle": {
      "zh": "风铃叮咚，出口前还有最后一道弯。",
      "en": "Windbells chime. One last turn before the gate."
    },
    "hint": {
      "zh": "先把出口前的小猪向下一格、再向左推开，接着把石头和小鸡挪出通道。",
      "en": "Push the Piggy near the gate down and left, then move the Rock and Chick out of the way."
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
    "par": 7,
    "starThresholds": [
      7,
      11
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 2,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "duck-a",
        "type": "duck",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "mushroom-a",
        "type": "mushroom",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "pig-a",
        "type": "pig",
        "x": 2,
        "y": 3,
        "w": 2,
        "h": 1
      },
      {
        "id": "rock-a",
        "type": "rock",
        "x": 0,
        "y": 2,
        "w": 2,
        "h": 1
      },
      {
        "id": "crate-a",
        "type": "crate",
        "x": 1,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "chick-a",
        "type": "chick",
        "x": 1,
        "y": 3,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "gumdrop-hill",
    "order": 7,
    "difficulty": "easy",
    "name": {
      "zh": "软糖草坡",
      "en": "Gumdrop Hill"
    },
    "subtitle": {
      "zh": "晨风轻轻吹过软糖草坡，羊妈妈要慢慢回家。",
      "en": "A morning breeze crosses Gumdrop Hill. Mama Sheep takes the long way home."
    },
    "hint": {
      "zh": "先让石头向右挪动，再让小鸡向右让一让。",
      "en": "Start by sliding the Rock right, then let Chick move right."
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
    "par": 7,
    "starThresholds": [
      7,
      11
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 2,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "chick",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "chick",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "rock",
        "x": 1,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b3",
        "type": "crate",
        "x": 1,
        "y": 2,
        "w": 1,
        "h": 2
      },
      {
        "id": "b4",
        "type": "chick",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "crate",
        "x": 3,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "mushroom",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "chick",
        "x": 1,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "mushroom",
        "x": 0,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b9",
        "type": "chick",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b10",
        "type": "crate",
        "x": 0,
        "y": 4,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "honey-bridge",
    "order": 8,
    "difficulty": "easy",
    "name": {
      "zh": "蜂蜜木桥",
      "en": "Honey Bridge"
    },
    "subtitle": {
      "zh": "蜂蜜木桥的路不长，每一步都要走得稳。",
      "en": "Honey Bridge is not far, but every step matters."
    },
    "hint": {
      "zh": "先让石头向左挪动，再让小鸡向上让一让。",
      "en": "Start by sliding the Rock left, then let Chick move up."
    },
    "scene": "daisies",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 2,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 2,
      "y": 3
    },
    "par": 7,
    "starThresholds": [
      7,
      11
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 1,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "chick",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "rock",
        "x": 2,
        "y": 1,
        "w": 2,
        "h": 1
      },
      {
        "id": "b2",
        "type": "mushroom",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b3",
        "type": "pig",
        "x": 0,
        "y": 2,
        "w": 1,
        "h": 2
      },
      {
        "id": "b4",
        "type": "mushroom",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "crate",
        "x": 2,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "crate",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "lily-trail",
    "order": 9,
    "difficulty": "easy",
    "name": {
      "zh": "铃兰小径",
      "en": "Lily Trail"
    },
    "subtitle": {
      "zh": "铃兰小径里的小伙伴都还没睡醒，轻轻推一推吧。",
      "en": "The little friends at Lily Trail are still sleepy. Push gently."
    },
    "hint": {
      "zh": "先让蘑菇向右挪动，再让羊妈妈向右挪一步。",
      "en": "Start by sliding Mushroom right, then step Mama Sheep right."
    },
    "scene": "fireflies",
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
    "par": 7,
    "starThresholds": [
      7,
      11
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 0,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "crate",
        "x": 2,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "chick",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "mushroom",
        "x": 2,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b3",
        "type": "rock",
        "x": 0,
        "y": 1,
        "w": 2,
        "h": 1
      },
      {
        "id": "b4",
        "type": "mushroom",
        "x": 0,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "mushroom",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "chick",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "crate",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "b8",
        "type": "crate",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b9",
        "type": "mushroom",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b10",
        "type": "chick",
        "x": 1,
        "y": 0,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "blossom-fence",
    "order": 10,
    "difficulty": "easy",
    "name": {
      "zh": "樱花篱笆",
      "en": "Blossom Fence"
    },
    "subtitle": {
      "zh": "樱花篱笆的出口亮着暖暖的光，带羊妈妈过去吧。",
      "en": "A warm light marks the gate at Blossom Fence. Lead Mama Sheep there."
    },
    "hint": {
      "zh": "先让木箱向上挪动，再让小猪向右让一让。",
      "en": "Start by sliding the wooden crate up, then let Piggy move right."
    },
    "scene": "mushrooms",
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
    "par": 7,
    "starThresholds": [
      7,
      11
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 0,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "pig",
        "x": 1,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "b1",
        "type": "crate",
        "x": 4,
        "y": 3,
        "w": 1,
        "h": 2
      },
      {
        "id": "b2",
        "type": "duck",
        "x": 2,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b3",
        "type": "chick",
        "x": 2,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "mushroom",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "pig",
        "x": 2,
        "y": 1,
        "w": 2,
        "h": 1
      },
      {
        "id": "b6",
        "type": "rock",
        "x": 1,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b7",
        "type": "duck",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "chick",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b9",
        "type": "crate",
        "x": 4,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b10",
        "type": "chick",
        "x": 0,
        "y": 4,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "acorn-8",
    "order": 11,
    "difficulty": "medium",
    "name": {
      "zh": "橡果小径",
      "en": "Acorn Trail"
    },
    "subtitle": {
      "zh": "橡果滚了一地，小心别把路堵住。",
      "en": "Acorns are scattered everywhere. Keep the way clear."
    },
    "hint": {
      "zh": "先让下方小鸡向右让一步，再把大石头往左推，羊妈妈就能向右下走。",
      "en": "Move the lower Chick right, push the Rock left, then let Mama Sheep step right and down."
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
    "par": 8,
    "starThresholds": [
      8,
      13
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 0,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "chick-a",
        "type": "chick",
        "x": 1,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "mushroom-a",
        "type": "mushroom",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "rock-a",
        "type": "rock",
        "x": 2,
        "y": 1,
        "w": 2,
        "h": 1
      },
      {
        "id": "duck-a",
        "type": "duck",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "crate-a",
        "type": "crate",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "crate-b",
        "type": "crate",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "mushroom-b",
        "type": "mushroom",
        "x": 2,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "duck-b",
        "type": "duck",
        "x": 1,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "chick-b",
        "type": "chick",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "cloudy-pen",
    "order": 12,
    "difficulty": "medium",
    "name": {
      "zh": "云朵羊圈",
      "en": "Cloudy Pen"
    },
    "subtitle": {
      "zh": "云朵羊圈比看上去更绕，先想一步再动手。",
      "en": "Cloudy Pen is trickier than it looks. Plan a step ahead."
    },
    "hint": {
      "zh": "先让小猪向上挪动，再让小鸭向上让一让。",
      "en": "Start by sliding Piggy up, then let Duck move up."
    },
    "scene": "fireflies",
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
      12
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 2,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "duck",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "rock",
        "x": 0,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "b2",
        "type": "pig",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "b3",
        "type": "pig",
        "x": 0,
        "y": 2,
        "w": 2,
        "h": 1
      },
      {
        "id": "b4",
        "type": "crate",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "crate",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "b6",
        "type": "mushroom",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "garden-2",
    "order": 13,
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
    "id": "moonlit-puddle",
    "order": 14,
    "difficulty": "medium",
    "name": {
      "zh": "月光水洼",
      "en": "Moonlit Puddle"
    },
    "subtitle": {
      "zh": "月光水洼里的每只小动物都要挪对位置，路才会打开。",
      "en": "Every friend at Moonlit Puddle must move before the path opens."
    },
    "hint": {
      "zh": "先让木箱向下挪动，再让小猪向左让一让。",
      "en": "Start by sliding the wooden crate down, then let Piggy move left."
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
    "par": 8,
    "starThresholds": [
      8,
      12
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 2,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "pig",
        "x": 2,
        "y": 3,
        "w": 2,
        "h": 1
      },
      {
        "id": "b1",
        "type": "crate",
        "x": 1,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "duck",
        "x": 1,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b3",
        "type": "duck",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "duck",
        "x": 0,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "pig",
        "x": 2,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b6",
        "type": "rock",
        "x": 0,
        "y": 2,
        "w": 2,
        "h": 1
      }
    ]
  },
  {
    "id": "starry-field",
    "order": 15,
    "difficulty": "medium",
    "name": {
      "zh": "星星麦田",
      "en": "Starry Field"
    },
    "subtitle": {
      "zh": "星星麦田的出口在发光，别被眼前的空位骗了。",
      "en": "The gate at Starry Field glows ahead. Do not trust the empty-looking gaps."
    },
    "hint": {
      "zh": "先让小鸡向上挪动，再让石头向上让一让。",
      "en": "Start by sliding Chick up, then let the Rock move up."
    },
    "scene": "mushrooms",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 0,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 0,
      "y": 3
    },
    "par": 8,
    "starThresholds": [
      8,
      12
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 2,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "chick",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "crate",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 2
      },
      {
        "id": "b2",
        "type": "crate",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b3",
        "type": "crate",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "duck",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "mushroom",
        "x": 2,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "duck",
        "x": 2,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "rock",
        "x": 0,
        "y": 2,
        "w": 2,
        "h": 1
      }
    ]
  },
  {
    "id": "dandelion-maze",
    "order": 16,
    "difficulty": "medium",
    "name": {
      "zh": "蒲公英迷宫",
      "en": "Dandelion Maze"
    },
    "subtitle": {
      "zh": "蒲公英迷宫里有点挤，耐心一点就能出去。",
      "en": "Dandelion Maze is a little crowded. Patience will find the way."
    },
    "hint": {
      "zh": "羊妈妈可以先向下挪动，再让小猪向左让一让。",
      "en": "Mama Sheep can step down first, then let Piggy move left."
    },
    "scene": "daisies",
    "grid": {
      "cols": 5,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 2,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 2,
      "y": 3
    },
    "par": 8,
    "starThresholds": [
      8,
      12
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 0,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "pig",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 2
      },
      {
        "id": "b1",
        "type": "chick",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "crate",
        "x": 4,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b3",
        "type": "mushroom",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "pig",
        "x": 2,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b5",
        "type": "crate",
        "x": 2,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "duck",
        "x": 1,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "mushroom",
        "x": 3,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "mushroom",
        "x": 2,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b9",
        "type": "crate",
        "x": 4,
        "y": 2,
        "w": 1,
        "h": 2
      },
      {
        "id": "b10",
        "type": "duck",
        "x": 4,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b11",
        "type": "duck",
        "x": 2,
        "y": 2,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "jam-cottage",
    "order": 17,
    "difficulty": "medium",
    "name": {
      "zh": "果酱小屋",
      "en": "Jam Cottage"
    },
    "subtitle": {
      "zh": "风吹过果酱小屋，羊妈妈在等你找到那条小路。",
      "en": "Wind crosses Jam Cottage. Mama Sheep is waiting for you to find the path."
    },
    "hint": {
      "zh": "羊妈妈可以先向上挪动，再让小鸡向左让一让。",
      "en": "Mama Sheep can step up first, then let Chick move left."
    },
    "scene": "fireflies",
    "grid": {
      "cols": 5,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 2,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 2,
      "y": 3
    },
    "par": 8,
    "starThresholds": [
      8,
      12
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 2,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "pig",
        "x": 1,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "b1",
        "type": "crate",
        "x": 1,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "chick",
        "x": 1,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b3",
        "type": "mushroom",
        "x": 4,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "chick",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "duck",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "mushroom",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "duck",
        "x": 4,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "crate",
        "x": 4,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b9",
        "type": "pig",
        "x": 0,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "b10",
        "type": "crate",
        "x": 4,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b11",
        "type": "chick",
        "x": 4,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b12",
        "type": "mushroom",
        "x": 2,
        "y": 4,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "moon-3",
    "order": 18,
    "difficulty": "medium",
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
  },
  {
    "id": "moonrise-15",
    "order": 19,
    "difficulty": "medium",
    "name": {
      "zh": "月升花门",
      "en": "Moonrise Gate"
    },
    "subtitle": {
      "zh": "月亮升起来了，最后一扇花门就在前方。",
      "en": "The moon is up. The last flower gate lies ahead."
    },
    "hint": {
      "zh": "先让羊妈妈向下一步，再把中间的石头和胖猪向右推。",
      "en": "Step Mama Sheep down, then push the Rock and Piggy in the middle to the right."
    },
    "scene": "fireflies",
    "grid": {
      "cols": 5,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 3,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 3,
      "y": 3
    },
    "par": 8,
    "starThresholds": [
      8,
      13
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 3,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "crate-a",
        "type": "crate",
        "x": 0,
        "y": 2,
        "w": 1,
        "h": 2
      },
      {
        "id": "pig-a",
        "type": "pig",
        "x": 1,
        "y": 3,
        "w": 2,
        "h": 1
      },
      {
        "id": "rock-a",
        "type": "rock",
        "x": 1,
        "y": 1,
        "w": 2,
        "h": 1
      },
      {
        "id": "mushroom-a",
        "type": "mushroom",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "rock-b",
        "type": "rock",
        "x": 0,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "chick-a",
        "type": "chick",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "pig-b",
        "type": "pig",
        "x": 3,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "duck-a",
        "type": "duck",
        "x": 2,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "crate-b",
        "type": "crate",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 1
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
        "id": "duck-b",
        "type": "duck",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "pond-9",
    "order": 20,
    "difficulty": "medium",
    "name": {
      "zh": "池塘边边",
      "en": "Pondside Path"
    },
    "subtitle": {
      "zh": "池塘边的石板路，需要大家齐心协力。",
      "en": "A stone path by the pond. Everyone must help."
    },
    "hint": {
      "zh": "先把左下的鸭子和蘑菇往上挪，再移开石头和另一只小鸭，清出向左的通道。",
      "en": "Move the Duck and Mushroom at the lower left up, then shift the Rock and the other Duck to open the left path."
    },
    "scene": "mushrooms",
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
      13
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 3,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "duck-a",
        "type": "duck",
        "x": 0,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "rock-a",
        "type": "rock",
        "x": 1,
        "y": 3,
        "w": 2,
        "h": 1
      },
      {
        "id": "mushroom-a",
        "type": "mushroom",
        "x": 0,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "crate-a",
        "type": "crate",
        "x": 4,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "crate-b",
        "type": "crate",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "chick-a",
        "type": "chick",
        "x": 2,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "mushroom-b",
        "type": "mushroom",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "pig-a",
        "type": "pig",
        "x": 0,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "mushroom-c",
        "type": "mushroom",
        "x": 2,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "duck-b",
        "type": "duck",
        "x": 1,
        "y": 2,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "starlight-13",
    "order": 21,
    "difficulty": "medium",
    "name": {
      "zh": "星光小径",
      "en": "Starlight Trail"
    },
    "subtitle": {
      "zh": "星光洒下来，大家要一起穿过这片大牧场。",
      "en": "Starlight falls as everyone crosses the big ranch."
    },
    "hint": {
      "zh": "先让顶部的小蘑菇向右，再把左上角的石头、蘑菇和木箱依次挪开。",
      "en": "Move the top Mushroom right, then clear the Rock, Mushroom and crate from the upper left."
    },
    "scene": "fireflies",
    "grid": {
      "cols": 5,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 0,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 0,
      "y": 3
    },
    "par": 8,
    "starThresholds": [
      8,
      13
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 2,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "pig-a",
        "type": "pig",
        "x": 1,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "mushroom-a",
        "type": "mushroom",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "crate-a",
        "type": "crate",
        "x": 4,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "pig-b",
        "type": "pig",
        "x": 4,
        "y": 3,
        "w": 1,
        "h": 2
      },
      {
        "id": "mushroom-b",
        "type": "mushroom",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "rock-a",
        "type": "rock",
        "x": 0,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "chick-a",
        "type": "chick",
        "x": 2,
        "y": 1,
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
        "id": "duck-a",
        "type": "duck",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "sunbeam-10",
    "order": 22,
    "difficulty": "medium",
    "name": {
      "zh": "暖阳牧场",
      "en": "Sunbeam Ranch"
    },
    "subtitle": {
      "zh": "暖阳照进牧场，羊妈妈想快点回家。",
      "en": "Sunbeams fill the ranch. Mama Sheep wants to get home quickly."
    },
    "hint": {
      "zh": "先让中间的小蘑菇向右，羊妈妈向上一步，再处理底部的胖猪和石头。",
      "en": "Move the Mushroom right, step Mama Sheep up, then deal with the Piggy and Rock below."
    },
    "scene": "daisies",
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
      13
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 1,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "duck-a",
        "type": "duck",
        "x": 4,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "pig-a",
        "type": "pig",
        "x": 4,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "rock-a",
        "type": "rock",
        "x": 3,
        "y": 3,
        "w": 2,
        "h": 1
      },
      {
        "id": "mushroom-a",
        "type": "mushroom",
        "x": 2,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "chick-a",
        "type": "chick",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "pig-b",
        "type": "pig",
        "x": 0,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "crate-a",
        "type": "crate",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "rock-b",
        "type": "rock",
        "x": 2,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "chick-b",
        "type": "chick",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "crate-b",
        "type": "crate",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "mushroom-arch",
    "order": 23,
    "difficulty": "medium",
    "name": {
      "zh": "蘑菇拱门",
      "en": "Mushroom Arch"
    },
    "subtitle": {
      "zh": "蘑菇拱门比看上去更绕，先想一步再动手。",
      "en": "Mushroom Arch is trickier than it looks. Plan a step ahead."
    },
    "hint": {
      "zh": "羊妈妈可以先向下挪动，再让小鸡向上让一让。",
      "en": "Mama Sheep can step down first, then let Chick move up."
    },
    "scene": "fireflies",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 0,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 0,
      "y": 3
    },
    "par": 9,
    "starThresholds": [
      9,
      14
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 0,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "pig",
        "x": 0,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "b1",
        "type": "pig",
        "x": 2,
        "y": 3,
        "w": 2,
        "h": 1
      },
      {
        "id": "b2",
        "type": "chick",
        "x": 3,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b3",
        "type": "pig",
        "x": 2,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "b4",
        "type": "duck",
        "x": 2,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "mushroom",
        "x": 2,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "duck",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "crate",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "duck",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "raspberry-maze",
    "order": 24,
    "difficulty": "medium",
    "name": {
      "zh": "树莓迷宫",
      "en": "Raspberry Maze"
    },
    "subtitle": {
      "zh": "这处树莓迷宫差一点点就通了，再试一步。",
      "en": "Raspberry Maze is almost clear. One more clever step."
    },
    "hint": {
      "zh": "先让蘑菇向右挪动，再让蘑菇向右让一让。",
      "en": "Start by sliding Mushroom right, then let Mushroom move right."
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
    "par": 9,
    "starThresholds": [
      9,
      14
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 0,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "crate",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "pig",
        "x": 2,
        "y": 2,
        "w": 2,
        "h": 1
      },
      {
        "id": "b2",
        "type": "mushroom",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b3",
        "type": "rock",
        "x": 2,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b4",
        "type": "mushroom",
        "x": 1,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "chick",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "crate",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "mushroom",
        "x": 0,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "crate",
        "x": 3,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b9",
        "type": "pig",
        "x": 0,
        "y": 1,
        "w": 2,
        "h": 1
      },
      {
        "id": "b10",
        "type": "duck",
        "x": 2,
        "y": 1,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "warm-breeze-farm",
    "order": 25,
    "difficulty": "medium",
    "name": {
      "zh": "暖风农场",
      "en": "Warm Breeze Farm"
    },
    "subtitle": {
      "zh": "暖风农场里的每只小动物都要挪对位置，路才会打开。",
      "en": "Every friend at Warm Breeze Farm must move before the path opens."
    },
    "hint": {
      "zh": "先让木箱向上挪动，再让木箱向右让一让。",
      "en": "Start by sliding the wooden crate up, then let the wooden crate move right."
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
    "par": 9,
    "starThresholds": [
      9,
      14
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 2,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "rock",
        "x": 2,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b1",
        "type": "mushroom",
        "x": 0,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "crate",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "b3",
        "type": "mushroom",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "crate",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "pig",
        "x": 1,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "b6",
        "type": "duck",
        "x": 1,
        "y": 0,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "windmill-hill",
    "order": 26,
    "difficulty": "medium",
    "name": {
      "zh": "风车山丘",
      "en": "Windmill Hill"
    },
    "subtitle": {
      "zh": "风车山丘的出口在发光，别被眼前的空位骗了。",
      "en": "The gate at Windmill Hill glows ahead. Do not trust the empty-looking gaps."
    },
    "hint": {
      "zh": "先让小猪向左挪动，再让木箱向上让一让。",
      "en": "Start by sliding Piggy left, then let the wooden crate move up."
    },
    "scene": "mushrooms",
    "grid": {
      "cols": 5,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 3,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 3,
      "y": 3
    },
    "par": 9,
    "starThresholds": [
      9,
      14
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 2,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "crate",
        "x": 4,
        "y": 2,
        "w": 1,
        "h": 2
      },
      {
        "id": "b1",
        "type": "mushroom",
        "x": 4,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "rock",
        "x": 3,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b3",
        "type": "crate",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "pig",
        "x": 1,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "b5",
        "type": "pig",
        "x": 3,
        "y": 1,
        "w": 2,
        "h": 1
      },
      {
        "id": "b6",
        "type": "chick",
        "x": 0,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "rock",
        "x": 1,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "b8",
        "type": "crate",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b9",
        "type": "duck",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b10",
        "type": "mushroom",
        "x": 1,
        "y": 0,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "firefly-hollow",
    "order": 27,
    "difficulty": "medium",
    "name": {
      "zh": "萤火虫谷",
      "en": "Firefly Hollow"
    },
    "subtitle": {
      "zh": "萤火虫谷里有点挤，耐心一点就能出去。",
      "en": "Firefly Hollow is a little crowded. Patience will find the way."
    },
    "hint": {
      "zh": "羊妈妈可以先向右挪动，再让小猪向下让一让。",
      "en": "Mama Sheep can step right first, then let Piggy move down."
    },
    "scene": "daisies",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 2,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 2,
      "y": 3
    },
    "par": 10,
    "starThresholds": [
      10,
      15
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 0,
        "y": 0,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "crate",
        "x": 1,
        "y": 2,
        "w": 1,
        "h": 2
      },
      {
        "id": "b1",
        "type": "duck",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "pig",
        "x": 2,
        "y": 2,
        "w": 2,
        "h": 1
      },
      {
        "id": "b3",
        "type": "chick",
        "x": 0,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "mushroom",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "chick",
        "x": 0,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "duck",
        "x": 3,
        "y": 1,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "rainbow-12",
    "order": 28,
    "difficulty": "medium",
    "name": {
      "zh": "彩虹坡道",
      "en": "Rainbow Slope"
    },
    "subtitle": {
      "zh": "彩虹挂在山坡上，出口藏在弯弯的小路尽头。",
      "en": "A rainbow arcs over the slope. The gate waits at the end of a winding path."
    },
    "hint": {
      "zh": "先让出口附近的小猪向下滑，再移开左边的石头，腾出横向通道。",
      "en": "Slide the Piggy near the exit down, then move the Rock on the left to open the cross path."
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
    "par": 10,
    "starThresholds": [
      10,
      16
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 2,
        "y": 0,
        "w": 2,
        "h": 2
      },
      {
        "id": "pig-a",
        "type": "pig",
        "x": 2,
        "y": 2,
        "w": 1,
        "h": 2
      },
      {
        "id": "rock-a",
        "type": "rock",
        "x": 0,
        "y": 1,
        "w": 2,
        "h": 1
      },
      {
        "id": "mushroom-a",
        "type": "mushroom",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "crate-a",
        "type": "crate",
        "x": 1,
        "y": 2,
        "w": 1,
        "h": 2
      },
      {
        "id": "pig-b",
        "type": "pig",
        "x": 0,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "chick-a",
        "type": "chick",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "rainbow-fence",
    "order": 29,
    "difficulty": "medium",
    "name": {
      "zh": "彩虹篱笆",
      "en": "Rainbow Fence"
    },
    "subtitle": {
      "zh": "风吹过彩虹篱笆，羊妈妈在等你找到那条小路。",
      "en": "Wind crosses Rainbow Fence. Mama Sheep is waiting for you to find the path."
    },
    "hint": {
      "zh": "先让小鸡向上挪动，再让小鸡向右让一让。",
      "en": "Start by sliding Chick up, then let Chick move right."
    },
    "scene": "fireflies",
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
    "par": 10,
    "starThresholds": [
      10,
      15
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 0,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "rock",
        "x": 2,
        "y": 1,
        "w": 2,
        "h": 1
      },
      {
        "id": "b1",
        "type": "chick",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "mushroom",
        "x": 1,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b3",
        "type": "mushroom",
        "x": 0,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "chick",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "pig",
        "x": 2,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b6",
        "type": "chick",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "crate",
        "x": 2,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "crate",
        "x": 2,
        "y": 2,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "trellis-11",
    "order": 30,
    "difficulty": "medium",
    "name": {
      "zh": "藤蔓花架",
      "en": "Trellis Garden"
    },
    "subtitle": {
      "zh": "藤蔓爬上了花架，路也变得更绕了。",
      "en": "Vines climb the trellis, and the path grows twisty."
    },
    "hint": {
      "zh": "先把顶部的小鸡和木箱挪到右边，再让左侧的小猪和蘑菇依次让路。",
      "en": "Move the top Chick and crate right, then shuffle the Piggy and Mushroom on the left."
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
    "par": 10,
    "starThresholds": [
      10,
      16
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 1,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "chick-a",
        "type": "chick",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "pig-a",
        "type": "pig",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 2
      },
      {
        "id": "mushroom-a",
        "type": "mushroom",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "duck-a",
        "type": "duck",
        "x": 2,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "rock-a",
        "type": "rock",
        "x": 0,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "crate-a",
        "type": "crate",
        "x": 1,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "pig-b",
        "type": "pig",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 2
      }
    ]
  },
  {
    "id": "lavender-field",
    "order": 31,
    "difficulty": "medium",
    "name": {
      "zh": "薰衣草田",
      "en": "Lavender Field"
    },
    "subtitle": {
      "zh": "这处薰衣草田差一点点就通了，再试一步。",
      "en": "Lavender Field is almost clear. One more clever step."
    },
    "hint": {
      "zh": "先让小鸡向左挪动，再让木箱向左让一让。",
      "en": "Start by sliding Chick left, then let the wooden crate move left."
    },
    "scene": "mushrooms",
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
    "par": 10,
    "starThresholds": [
      10,
      15
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 3,
        "y": 3,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "mushroom",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "chick",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "pig",
        "x": 4,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "b3",
        "type": "pig",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "b4",
        "type": "duck",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "crate",
        "x": 2,
        "y": 2,
        "w": 1,
        "h": 2
      },
      {
        "id": "b6",
        "type": "duck",
        "x": 4,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "chick",
        "x": 3,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "mushroom",
        "x": 2,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b9",
        "type": "pig",
        "x": 1,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b10",
        "type": "rock",
        "x": 1,
        "y": 1,
        "w": 2,
        "h": 1
      },
      {
        "id": "b11",
        "type": "pig",
        "x": 0,
        "y": 2,
        "w": 1,
        "h": 2
      }
    ]
  },
  {
    "id": "misty-bridge",
    "order": 32,
    "difficulty": "medium",
    "name": {
      "zh": "晨雾小桥",
      "en": "Misty Bridge"
    },
    "subtitle": {
      "zh": "晨雾小桥比看上去更绕，先想一步再动手。",
      "en": "Misty Bridge is trickier than it looks. Plan a step ahead."
    },
    "hint": {
      "zh": "先让小猪向上挪动，再让小猪向左让一让。",
      "en": "Start by sliding Piggy up, then let Piggy move left."
    },
    "scene": "fireflies",
    "grid": {
      "cols": 5,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 2,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 2,
      "y": 3
    },
    "par": 10,
    "starThresholds": [
      10,
      15
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 3,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "duck",
        "x": 4,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "pig",
        "x": 3,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b2",
        "type": "pig",
        "x": 1,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "b3",
        "type": "pig",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "b4",
        "type": "duck",
        "x": 4,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "pig",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 2
      },
      {
        "id": "b6",
        "type": "mushroom",
        "x": 1,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "crate",
        "x": 0,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "pig",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 2
      },
      {
        "id": "b9",
        "type": "chick",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b10",
        "type": "crate",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "bell-barn",
    "order": 33,
    "difficulty": "hard",
    "name": {
      "zh": "铃铛谷仓",
      "en": "Bell Barn"
    },
    "subtitle": {
      "zh": "铃铛谷仓果然绕，深呼吸，再慢慢推。",
      "en": "Bell Barn is twisty indeed. Breathe, then push gently."
    },
    "hint": {
      "zh": "羊妈妈可以先向下挪动，再让小鸡向左让一让。",
      "en": "Mama Sheep can step down first, then let Chick move left."
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
    "par": 11,
    "starThresholds": [
      11,
      17
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 0,
        "y": 0,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "pig",
        "x": 2,
        "y": 3,
        "w": 2,
        "h": 1
      },
      {
        "id": "b1",
        "type": "chick",
        "x": 1,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "pig",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "b3",
        "type": "crate",
        "x": 0,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "chick",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "crate",
        "x": 2,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "pig",
        "x": 2,
        "y": 1,
        "w": 1,
        "h": 2
      }
    ]
  },
  {
    "id": "crescent-pond",
    "order": 34,
    "difficulty": "hard",
    "name": {
      "zh": "月牙池塘",
      "en": "Crescent Pond"
    },
    "subtitle": {
      "zh": "月牙池塘的出口在发光，每一步都算数。",
      "en": "The exit at Crescent Pond glows ahead. Every step counts."
    },
    "hint": {
      "zh": "先让木箱向下挪动，再让小鸡向右让一让。",
      "en": "Start by sliding the wooden crate down, then let Chick move right."
    },
    "scene": "daisies",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 2,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 2,
      "y": 3
    },
    "par": 11,
    "starThresholds": [
      11,
      17
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 1,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "crate",
        "x": 1,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "crate",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "b2",
        "type": "rock",
        "x": 2,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b3",
        "type": "mushroom",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "pig",
        "x": 2,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "b5",
        "type": "chick",
        "x": 3,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "chick",
        "x": 2,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "mushroom",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "chick",
        "x": 1,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b9",
        "type": "mushroom",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "cloudtop-ranch",
    "order": 35,
    "difficulty": "hard",
    "name": {
      "zh": "云顶牧场",
      "en": "Cloudtop Ranch"
    },
    "subtitle": {
      "zh": "小伙伴们挤成一团，云顶牧场的最后一格要靠巧劲。",
      "en": "The friends are packed tight. The last gap at Cloudtop Ranch needs a clever touch."
    },
    "hint": {
      "zh": "先让小鸡向左挪动，再让石头向左让一让。",
      "en": "Start by sliding Chick left, then let the Rock move left."
    },
    "scene": "fireflies",
    "grid": {
      "cols": 5,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 2,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 2,
      "y": 3
    },
    "par": 11,
    "starThresholds": [
      11,
      17
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 3,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "duck",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "pig",
        "x": 0,
        "y": 3,
        "w": 2,
        "h": 1
      },
      {
        "id": "b2",
        "type": "pig",
        "x": 4,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "b3",
        "type": "pig",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "b4",
        "type": "chick",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "crate",
        "x": 1,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "b6",
        "type": "pig",
        "x": 2,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "b7",
        "type": "mushroom",
        "x": 4,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "chick",
        "x": 3,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b9",
        "type": "rock",
        "x": 2,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b10",
        "type": "chick",
        "x": 2,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b11",
        "type": "chick",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "starlight-fence",
    "order": 36,
    "difficulty": "hard",
    "name": {
      "zh": "星光篱笆",
      "en": "Starlight Fence"
    },
    "subtitle": {
      "zh": "星光篱笆的夜色很深，花门的光却越来越近。",
      "en": "Night gathers at Starlight Fence, but the flower gate is getting closer."
    },
    "hint": {
      "zh": "先让木箱向上挪动，再让小鸡向右让一让。",
      "en": "Start by sliding the wooden crate up, then let Chick move right."
    },
    "scene": "daisies",
    "grid": {
      "cols": 5,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 2,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 2,
      "y": 3
    },
    "par": 11,
    "starThresholds": [
      11,
      17
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 1,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "crate",
        "x": 4,
        "y": 2,
        "w": 1,
        "h": 2
      },
      {
        "id": "b1",
        "type": "chick",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "pig",
        "x": 1,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b3",
        "type": "pig",
        "x": 0,
        "y": 3,
        "w": 2,
        "h": 1
      },
      {
        "id": "b4",
        "type": "chick",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "pig",
        "x": 3,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b6",
        "type": "pig",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "b7",
        "type": "duck",
        "x": 3,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "pig",
        "x": 1,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "b9",
        "type": "duck",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b10",
        "type": "duck",
        "x": 4,
        "y": 4,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "fireworks-meadow",
    "order": 37,
    "difficulty": "hard",
    "name": {
      "zh": "花火草甸",
      "en": "Fireworks Meadow"
    },
    "subtitle": {
      "zh": "别急，花火草甸的路要一步一步让出来。",
      "en": "Take your time. The path through Fireworks Meadow opens one step at a time."
    },
    "hint": {
      "zh": "先让小猪向左挪动，再让木箱向左让一让。",
      "en": "Start by sliding Piggy left, then let the wooden crate move left."
    },
    "scene": "mushrooms",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 2,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 2,
      "y": 3
    },
    "par": 12,
    "starThresholds": [
      12,
      18
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 1,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "mushroom",
        "x": 2,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "crate",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "b2",
        "type": "pig",
        "x": 2,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b3",
        "type": "crate",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "duck",
        "x": 0,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "crate",
        "x": 3,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "mushroom",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "duck",
        "x": 2,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "crate",
        "x": 1,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b9",
        "type": "duck",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "apple-tree-house",
    "order": 38,
    "difficulty": "hard",
    "name": {
      "zh": "苹果树屋",
      "en": "Apple Tree House"
    },
    "subtitle": {
      "zh": "苹果树屋的出口在发光，每一步都算数。",
      "en": "The exit at Apple Tree House glows ahead. Every step counts."
    },
    "hint": {
      "zh": "先让石头向左挪动，再让蘑菇向左让一让。",
      "en": "Start by sliding the Rock left, then let Mushroom move left."
    },
    "scene": "fireflies",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 0,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 0,
      "y": 3
    },
    "par": 13,
    "starThresholds": [
      13,
      20
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 1,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "pig",
        "x": 3,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "b1",
        "type": "pig",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "b2",
        "type": "pig",
        "x": 1,
        "y": 1,
        "w": 2,
        "h": 1
      },
      {
        "id": "b3",
        "type": "rock",
        "x": 1,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "b4",
        "type": "mushroom",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "mushroom",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "rock",
        "x": 2,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b7",
        "type": "crate",
        "x": 0,
        "y": 2,
        "w": 1,
        "h": 2
      }
    ]
  },
  {
    "id": "dream-gate",
    "order": 39,
    "difficulty": "hard",
    "name": {
      "zh": "梦境花门",
      "en": "Dream Gate"
    },
    "subtitle": {
      "zh": "梦境花门的夜色很深，花门的光却越来越近。",
      "en": "Night gathers at Dream Gate, but the flower gate is getting closer."
    },
    "hint": {
      "zh": "先让小鸡向下挪动，再让羊妈妈向下挪一步。",
      "en": "Start by sliding Chick down, then step Mama Sheep down."
    },
    "scene": "fireflies",
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
    "par": 13,
    "starThresholds": [
      13,
      20
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 0,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "pig",
        "x": 2,
        "y": 1,
        "w": 2,
        "h": 1
      },
      {
        "id": "b1",
        "type": "crate",
        "x": 2,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "duck",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b3",
        "type": "crate",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "pig",
        "x": 2,
        "y": 3,
        "w": 2,
        "h": 1
      },
      {
        "id": "b5",
        "type": "duck",
        "x": 0,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "rock",
        "x": 0,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b7",
        "type": "chick",
        "x": 1,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "chick",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "galaxy-ranch",
    "order": 40,
    "difficulty": "hard",
    "name": {
      "zh": "银河牧场",
      "en": "Galaxy Ranch"
    },
    "subtitle": {
      "zh": "小伙伴们挤成一团，银河牧场的最后一格要靠巧劲。",
      "en": "The friends are packed tight. The last gap at Galaxy Ranch needs a clever touch."
    },
    "hint": {
      "zh": "先让小猪向上挪动，再让小鸡向上让一让。",
      "en": "Start by sliding Piggy up, then let Chick move up."
    },
    "scene": "mushrooms",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 0,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 0,
      "y": 3
    },
    "par": 13,
    "starThresholds": [
      13,
      20
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 0,
        "y": 0,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "pig",
        "x": 0,
        "y": 2,
        "w": 2,
        "h": 1
      },
      {
        "id": "b1",
        "type": "rock",
        "x": 0,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "b2",
        "type": "pig",
        "x": 3,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "b3",
        "type": "chick",
        "x": 2,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "chick",
        "x": 2,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "pig",
        "x": 2,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "b6",
        "type": "rock",
        "x": 2,
        "y": 3,
        "w": 2,
        "h": 1
      }
    ]
  },
  {
    "id": "honey-maze",
    "order": 41,
    "difficulty": "hard",
    "name": {
      "zh": "蜜糖迷宫",
      "en": "Honey Maze"
    },
    "subtitle": {
      "zh": "蜜糖迷宫果然绕，深呼吸，再慢慢推。",
      "en": "Honey Maze is twisty indeed. Breathe, then push gently."
    },
    "hint": {
      "zh": "先让蘑菇向左挪动，再让小猪向上让一让。",
      "en": "Start by sliding Mushroom left, then let Piggy move up."
    },
    "scene": "daisies",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 2,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 2,
      "y": 3
    },
    "par": 13,
    "starThresholds": [
      13,
      20
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 1,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "mushroom",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "pig",
        "x": 1,
        "y": 1,
        "w": 2,
        "h": 1
      },
      {
        "id": "b2",
        "type": "mushroom",
        "x": 1,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b3",
        "type": "pig",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 2
      },
      {
        "id": "b4",
        "type": "pig",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "b5",
        "type": "crate",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "b6",
        "type": "duck",
        "x": 2,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "mushroom",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "crate",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b9",
        "type": "mushroom",
        "x": 1,
        "y": 0,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "aurora-hill",
    "order": 42,
    "difficulty": "hard",
    "name": {
      "zh": "极光山丘",
      "en": "Aurora Hill"
    },
    "subtitle": {
      "zh": "别急，极光山丘的路要一步一步让出来。",
      "en": "Take your time. The path through Aurora Hill opens one step at a time."
    },
    "hint": {
      "zh": "羊妈妈可以先向下挪动，再让小鸡向下让一让。",
      "en": "Mama Sheep can step down first, then let Chick move down."
    },
    "scene": "daisies",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 2,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 2,
      "y": 3
    },
    "par": 14,
    "starThresholds": [
      14,
      21
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 0,
        "y": 2,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "chick",
        "x": 2,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "pig",
        "x": 1,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "b2",
        "type": "chick",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b3",
        "type": "chick",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "rock",
        "x": 2,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "b5",
        "type": "crate",
        "x": 2,
        "y": 3,
        "w": 1,
        "h": 2
      },
      {
        "id": "b6",
        "type": "chick",
        "x": 3,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "duck",
        "x": 3,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b8",
        "type": "mushroom",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b9",
        "type": "mushroom",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "cloud-14",
    "order": 43,
    "difficulty": "hard",
    "name": {
      "zh": "云朵迷宫",
      "en": "Cloud Maze"
    },
    "subtitle": {
      "zh": "云朵把路遮住了，慢慢推，别着急。",
      "en": "Clouds hide the way. Push gently and take your time."
    },
    "hint": {
      "zh": "先让羊妈妈向右挪一格，再把左下角的小蘑菇和小猪往上推，路会慢慢打开。",
      "en": "Shift Mama Sheep right, then push the Mushroom and Piggy at the lower left upward. The path will open."
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
    "par": 14,
    "starThresholds": [
      14,
      21
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 1,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "chick-a",
        "type": "chick",
        "x": 1,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "mushroom-a",
        "type": "mushroom",
        "x": 0,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "rock-a",
        "type": "rock",
        "x": 2,
        "y": 0,
        "w": 2,
        "h": 1
      },
      {
        "id": "duck-a",
        "type": "duck",
        "x": 1,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "rock-b",
        "type": "rock",
        "x": 1,
        "y": 4,
        "w": 2,
        "h": 1
      },
      {
        "id": "pig-a",
        "type": "pig",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 2
      },
      {
        "id": "pig-b",
        "type": "pig",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 2
      }
    ]
  },
  {
    "id": "moon-maze",
    "order": 44,
    "difficulty": "hard",
    "name": {
      "zh": "月亮迷宫",
      "en": "Moon Maze"
    },
    "subtitle": {
      "zh": "月亮迷宫的出口在发光，每一步都算数。",
      "en": "The exit at Moon Maze glows ahead. Every step counts."
    },
    "hint": {
      "zh": "先让小猪向下挪动，再让蘑菇向左让一让。",
      "en": "Start by sliding Piggy down, then let Mushroom move left."
    },
    "scene": "mushrooms",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 2,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 2,
      "y": 3
    },
    "par": 14,
    "starThresholds": [
      14,
      21
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 0,
        "y": 3,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "mushroom",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "crate",
        "x": 0,
        "y": 2,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "pig",
        "x": 1,
        "y": 0,
        "w": 1,
        "h": 2
      },
      {
        "id": "b3",
        "type": "chick",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "crate",
        "x": 3,
        "y": 1,
        "w": 1,
        "h": 2
      },
      {
        "id": "b5",
        "type": "mushroom",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "duck",
        "x": 3,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "pig",
        "x": 2,
        "y": 3,
        "w": 1,
        "h": 2
      },
      {
        "id": "b8",
        "type": "mushroom",
        "x": 2,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b9",
        "type": "crate",
        "x": 2,
        "y": 2,
        "w": 1,
        "h": 1
      }
    ]
  },
  {
    "id": "sheep-kingdom",
    "order": 45,
    "difficulty": "hard",
    "name": {
      "zh": "羊羊王国",
      "en": "Sheep Kingdom"
    },
    "subtitle": {
      "zh": "羊羊王国果然绕，深呼吸，再慢慢推。",
      "en": "Sheep Kingdom is twisty indeed. Breathe, then push gently."
    },
    "hint": {
      "zh": "先让蘑菇向右挪动，再让石头向上让一让。",
      "en": "Start by sliding Mushroom right, then let the Rock move up."
    },
    "scene": "fireflies",
    "grid": {
      "cols": 4,
      "rows": 5
    },
    "exit": {
      "side": "bottom",
      "col": 2,
      "span": 2
    },
    "goal": {
      "type": "position",
      "blockId": "sheep",
      "x": 2,
      "y": 3
    },
    "par": 14,
    "starThresholds": [
      14,
      21
    ],
    "blocks": [
      {
        "id": "sheep",
        "type": "sheep",
        "x": 2,
        "y": 1,
        "w": 2,
        "h": 2
      },
      {
        "id": "b0",
        "type": "chick",
        "x": 2,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b1",
        "type": "duck",
        "x": 2,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b2",
        "type": "crate",
        "x": 0,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b3",
        "type": "chick",
        "x": 1,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b4",
        "type": "crate",
        "x": 0,
        "y": 4,
        "w": 1,
        "h": 1
      },
      {
        "id": "b5",
        "type": "mushroom",
        "x": 0,
        "y": 1,
        "w": 1,
        "h": 1
      },
      {
        "id": "b6",
        "type": "crate",
        "x": 3,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b7",
        "type": "rock",
        "x": 0,
        "y": 2,
        "w": 2,
        "h": 1
      },
      {
        "id": "b8",
        "type": "mushroom",
        "x": 3,
        "y": 3,
        "w": 1,
        "h": 1
      },
      {
        "id": "b9",
        "type": "crate",
        "x": 0,
        "y": 0,
        "w": 1,
        "h": 1
      },
      {
        "id": "b10",
        "type": "pig",
        "x": 2,
        "y": 4,
        "w": 2,
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
