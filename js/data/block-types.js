/**
 * 救羊出圈 · 方块类型注册表
 * ------------------------------------------------------------
 * 新增一种动物/道具只需要：
 *   1. 在 BlockTypes 里注册 id、名称、调色板、SVG 绘制函数；
 *   2. 在关卡 JSON 中写 type: '你的 id'。
 * 绘制函数接收方块和唯一 uid，返回内联 SVG 字符串。
 * 图片素材将来也可以在这里改成 <img> 或 CSS background。
 */
(function (root) {
  'use strict';

  const SG = (root.SG = root.SG || {});
  const registry = Object.create(null);

  function svg(viewBox, uid, inner, className) {
    return (
      `<svg class="block-svg ${className || ''}" viewBox="${viewBox}" ` +
      `preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true" ` +
      `xmlns="http://www.w3.org/2000/svg">${inner}</svg>`
    );
  }

  function shadow(uid, cx, cy, rx, ry, color) {
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${color || '#79a872'}" opacity=".22"/>`;
  }

  function sparkle(x, y, size, color) {
    return (
      `<path d="M${x} ${y - size} Q${x + size * 0.25} ${y - size * 0.25} ${x + size} ${y} ` +
      `Q${x + size * 0.25} ${y + size * 0.25} ${x} ${y + size} ` +
      `Q${x - size * 0.25} ${y + size * 0.25} ${x - size} ${y} ` +
      `Q${x - size * 0.25} ${y - size * 0.25} ${x} ${y - size}Z" fill="${color}" opacity=".9"/>`
    );
  }

  // ---------------------------------------------------------------- 羊妈妈
  function sheepArt(block, uid) {
    return svg(
      '0 0 120 120',
      uid,
      `<defs>
        <radialGradient id="wool-${uid}" cx="38%" cy="22%" r="80%">
          <stop offset="0%" stop-color="#fffefb"/>
          <stop offset="62%" stop-color="#fff9ef"/>
          <stop offset="100%" stop-color="#f2e8d9"/>
        </radialGradient>
        <linearGradient id="face-${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffe4d2"/>
          <stop offset="100%" stop-color="#efc4ab"/>
        </linearGradient>
        <radialGradient id="blush-${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ff9eb2" stop-opacity=".78"/>
          <stop offset="100%" stop-color="#ff9eb2" stop-opacity="0"/>
        </radialGradient>
      </defs>
      ${shadow(uid, 60, 107, 35, 6.5)}
      <g class="sheep-g">
        <g fill="url(#face-${uid})" stroke="#dda98f" stroke-width="2">
          <ellipse cx="24" cy="49" rx="13" ry="7.5" transform="rotate(-28 24 49)"/>
          <ellipse cx="96" cy="49" rx="13" ry="7.5" transform="rotate(28 96 49)"/>
        </g>
        <g fill="#ffc1c8" opacity=".8">
          <ellipse cx="23" cy="50" rx="7" ry="3.4" transform="rotate(-28 23 50)"/>
          <ellipse cx="97" cy="50" rx="7" ry="3.4" transform="rotate(28 97 50)"/>
        </g>
        <g fill="#edc19e" stroke="#c9977b" stroke-width="2">
          <rect x="46" y="94" width="9" height="15" rx="4.5"/>
          <rect x="65" y="94" width="9" height="15" rx="4.5"/>
          <path d="M46 104 q4.5 5 9 0" fill="none" stroke="#9e745e"/>
          <path d="M65 104 q4.5 5 9 0" fill="none" stroke="#9e745e"/>
        </g>
        <g fill="url(#wool-${uid})" stroke="#e7d9c8" stroke-width="2.1">
          <circle cx="33" cy="47" r="20"/>
          <circle cx="87" cy="47" r="20"/>
          <circle cx="43" cy="31" r="18"/>
          <circle cx="77" cy="31" r="18"/>
          <circle cx="60" cy="29" r="20"/>
          <circle cx="31" cy="70" r="21"/>
          <circle cx="89" cy="70" r="21"/>
          <circle cx="45" cy="88" r="22"/>
          <circle cx="75" cy="88" r="22"/>
          <circle cx="60" cy="80" r="25"/>
        </g>
        <g fill="none" stroke="#e3d2bf" stroke-width="2" stroke-linecap="round" opacity=".75">
          <path d="M21 68 q-4 7 2 12"/>
          <path d="M99 68 q4 7 -2 12"/>
          <path d="M46 20 q6 -4 11 0"/>
          <path d="M70 18 q6 -4 11 1"/>
          <path d="M34 91 q5 5 11 1"/>
          <path d="M78 93 q6 3 11 -2"/>
        </g>
        <ellipse cx="60" cy="62" rx="27" ry="26" fill="url(#face-${uid})" stroke="#dda98f" stroke-width="2.2"/>
        <g fill="url(#wool-${uid})" stroke="#e7d9c8" stroke-width="2">
          <circle cx="44" cy="40" r="10.5"/>
          <circle cx="57" cy="36" r="12"/>
          <circle cx="70" cy="38" r="11"/>
          <circle cx="78" cy="45" r="8.5"/>
        </g>
        <g class="sheep-eye" fill="#4d3a34">
          <ellipse cx="49" cy="61" rx="3.7" ry="5.2"/>
          <ellipse cx="71" cy="61" rx="3.7" ry="5.2"/>
          <circle cx="50.2" cy="59" r="1.25" fill="#fff"/>
          <circle cx="72.2" cy="59" r="1.25" fill="#fff"/>
        </g>
        <g fill="url(#blush-${uid})">
          <ellipse cx="37" cy="70" rx="10" ry="7"/>
          <ellipse cx="83" cy="70" rx="10" ry="7"/>
        </g>
        <path d="M56 72 q4 3 8 0" fill="none" stroke="#9b6656" stroke-width="2" stroke-linecap="round"/>
        <path d="M60 72.5 v3.5 q-3 2.5 -5.5 0" fill="none" stroke="#9b6656" stroke-width="1.8" stroke-linecap="round"/>
        <g transform="translate(91 35) rotate(14)">
          <g fill="#fff6c9" stroke="#e8bd57" stroke-width="1.3">
            <ellipse cx="0" cy="-6.5" rx="4" ry="6"/>
            <ellipse cx="6.2" cy="-2" rx="4" ry="6" transform="rotate(72 6.2 -2)"/>
            <ellipse cx="3.8" cy="5.3" rx="4" ry="6" transform="rotate(144 3.8 5.3)"/>
            <ellipse cx="-3.8" cy="5.3" rx="4" ry="6" transform="rotate(216 -3.8 5.3)"/>
            <ellipse cx="-6.2" cy="-2" rx="4" ry="6" transform="rotate(288 -6.2 -2)"/>
          </g>
          <circle r="3.2" fill="#ffb35c"/>
        </g>
        ${sparkle(100, 75, 3, '#fff3a8')}
        ${sparkle(19, 78, 2, '#fff3a8')}
      </g>`,
      'sheep-art'
    );
  }

  // ---------------------------------------------------------------- 小鸭
  function duckArt(block, uid) {
    return svg(
      '0 0 120 120',
      uid,
      `<defs>
        <linearGradient id="duck-${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffe67d"/>
          <stop offset="100%" stop-color="#ffc94f"/>
        </linearGradient>
        <linearGradient id="duck-wing-${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fff2a8"/>
          <stop offset="100%" stop-color="#f9c74f"/>
        </linearGradient>
      </defs>
      ${shadow(uid, 61, 105, 32, 6)}
      <g>
        <g fill="#f0a85b" stroke="#d8863a" stroke-width="1.7">
          <path d="M45 98 q-10 10 4 11 q10 1 7 -9" />
          <path d="M78 98 q10 10 -4 11 q-10 1 -7 -9" />
        </g>
        <path d="M92 56 q18 -7 14 14 q-3 16 -20 18" fill="url(#duck-${uid})" stroke="#e5a847" stroke-width="2"/>
        <ellipse cx="66" cy="72" rx="36" ry="29" fill="url(#duck-${uid})" stroke="#e5a847" stroke-width="2.2"/>
        <circle cx="51" cy="45" r="27" fill="url(#duck-${uid})" stroke="#e5a847" stroke-width="2.2"/>
        <path d="M40 20 q0 -8 8 -7 q1 -8 9 -4 q6 -4 9 3" fill="none" stroke="#e5a847" stroke-width="2.6" stroke-linecap="round"/>
        <ellipse cx="73" cy="76" rx="19" ry="13" transform="rotate(-20 73 76)" fill="url(#duck-wing-${uid})" stroke="#e2ac42" stroke-width="1.8"/>
        <path d="M61 64 q9 6 18 0" fill="none" stroke="#e2ac42" stroke-width="1.8" stroke-linecap="round"/>
        <g fill="#f7a64c" stroke="#d98535" stroke-width="1.8">
          <path d="M26 47 q-14 1 -14 8 q0 7 14 6 q9 -1 9 -7 q0 -6 -9 -7Z"/>
          <path d="M26 54 q-6 1 -6 4" fill="none" stroke="#c5742c" stroke-width="1.5"/>
        </g>
        <g class="duck-eye">
          <circle cx="44" cy="41" r="4.2" fill="#50392c"/>
          <circle cx="45.6" cy="39.2" r="1.4" fill="#fff"/>
          <circle cx="56" cy="41" r="4.2" fill="#50392c"/>
          <circle cx="57.6" cy="39.2" r="1.4" fill="#fff"/>
        </g>
        <ellipse cx="34" cy="52" rx="7" ry="4" fill="#ff9e9e" opacity=".6"/>
        <ellipse cx="63" cy="52" rx="6" ry="3.5" fill="#ff9e9e" opacity=".5"/>
        <g transform="translate(70 22) rotate(16)">
          <path d="M0 6 Q-2 -2 5 -7" fill="none" stroke="#72a95d" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M2 3 q-9 -7 -12 0 q-1 6 9 5Z" fill="#9cd57e" stroke="#6f9f5c" stroke-width="1.2"/>
          <path d="M5 -3 q2 -10 9 -8 q5 2 0 9Z" fill="#aee28d" stroke="#6f9f5c" stroke-width="1.2"/>
        </g>
        ${sparkle(94, 34, 2.8, '#fff6bd')}
      </g>`,
      'duck-art'
    );
  }

  // ---------------------------------------------------------------- 小猪（支持横 / 竖两种构图）
  function pigArt(block, uid) {
    const wide = block.w > block.h;
    if (wide) {
      return svg(
        '0 0 160 110',
        uid,
        `<defs>
          <linearGradient id="pig-${uid}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffcdd9"/>
            <stop offset="100%" stop-color="#f5a6bd"/>
          </linearGradient>
          <radialGradient id="pig-blush-${uid}">
            <stop offset="0%" stop-color="#ff7f9e" stop-opacity=".7"/>
            <stop offset="100%" stop-color="#ff7f9e" stop-opacity="0"/>
          </radialGradient>
        </defs>
        ${shadow(uid, 85, 97, 52, 7)}
        <g>
          <path d="M137 59 q20 -7 14 14 q-2 12 -18 12" fill="none" stroke="#e293ab" stroke-width="4" stroke-linecap="round"/>
          <g fill="#e895ad" stroke="#d57f99" stroke-width="2">
            <path d="M117 91 q-10 1 -8 9 q2 6 11 3" />
            <path d="M59 93 q-8 1 -7 8 q1 6 10 3" />
          </g>
          <ellipse cx="96" cy="66" rx="54" ry="31" fill="url(#pig-${uid})" stroke="#d98ca5" stroke-width="2.2"/>
          <ellipse cx="55" cy="51" rx="37" ry="34" fill="url(#pig-${uid})" stroke="#d98ca5" stroke-width="2.2"/>
          <g fill="#f09bb2" stroke="#d47c96" stroke-width="2">
            <path d="M24 25 q-3 14 10 18 q8 -10 2 -23 q-7 -4 -12 5Z"/>
            <path d="M70 23 q5 13 -7 19 q-8 -8 -3 -22 q6 -5 10 3Z"/>
          </g>
          <ellipse cx="23" cy="59" rx="18" ry="14" fill="#ffb4c7" stroke="#d889a0" stroke-width="1.8"/>
          <g fill="#d77690">
            <ellipse cx="17" cy="58" rx="2.3" ry="3.3"/>
            <ellipse cx="28" cy="58" rx="2.3" ry="3.3"/>
          </g>
          <g class="pig-eye">
            <circle cx="43" cy="43" r="3.4" fill="#593a42"/>
            <circle cx="63" cy="43" r="3.4" fill="#593a42"/>
            <circle cx="44.2" cy="41.8" r="1.1" fill="#fff"/>
            <circle cx="64.2" cy="41.8" r="1.1" fill="#fff"/>
          </g>
          <g fill="url(#pig-blush-${uid})">
            <ellipse cx="34" cy="54" rx="8" ry="5"/>
            <ellipse cx="72" cy="54" rx="7" ry="4"/>
          </g>
          <path d="M45 58 q4 4 8 0" fill="none" stroke="#b66a80" stroke-width="1.8" stroke-linecap="round"/>
          <g transform="translate(88 31) rotate(9)">
            <g fill="#fff8dc" stroke="#e8c56a" stroke-width="1.2">
              <ellipse cx="0" cy="-5.5" rx="3.5" ry="5"/>
              <ellipse cx="5.2" cy="-1.7" rx="3.5" ry="5" transform="rotate(72 5.2 -1.7)"/>
              <ellipse cx="3.2" cy="4.5" rx="3.5" ry="5" transform="rotate(144 3.2 4.5)"/>
              <ellipse cx="-3.2" cy="4.5" rx="3.5" ry="5" transform="rotate(216 -3.2 4.5)"/>
              <ellipse cx="-5.2" cy="-1.7" rx="3.5" ry="5" transform="rotate(288 -5.2 -1.7)"/>
            </g>
            <circle r="2.8" fill="#ffb35c"/>
          </g>
          <path d="M102 34 q10 4 14 -5" fill="none" stroke="#e5a65c" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M122 29 l3 -7 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3Z" fill="#ffe9a1"/>
        </g>`,
        'pig-art'
      );
    }
    return svg(
      '0 0 120 160',
      uid,
      `<defs>
        <linearGradient id="pig-${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffd2de"/>
          <stop offset="100%" stop-color="#f4a1b9"/>
        </linearGradient>
        <radialGradient id="pig-blush-${uid}">
          <stop offset="0%" stop-color="#ff7f9e" stop-opacity=".72"/>
          <stop offset="100%" stop-color="#ff7f9e" stop-opacity="0"/>
        </radialGradient>
      </defs>
      ${shadow(uid, 60, 147, 34, 6)}
      <g>
        <g fill="#e895ad" stroke="#d57f99" stroke-width="2">
          <rect x="34" y="131" width="15" height="15" rx="7"/>
          <rect x="72" y="131" width="15" height="15" rx="7"/>
        </g>
        <ellipse cx="60" cy="108" rx="37" ry="36" fill="url(#pig-${uid})" stroke="#d98ca5" stroke-width="2.2"/>
        <path d="M94 112 q20 -4 15 15 q-3 13 -19 8" fill="none" stroke="#e293ab" stroke-width="4" stroke-linecap="round"/>
        <g fill="#f09bb2" stroke="#d47c96" stroke-width="2">
          <path d="M30 45 q-5 16 11 20 q9 -10 2 -25 q-8 -4 -13 5Z"/>
          <path d="M75 43 q6 14 -8 21 q-10 -9 -3 -24 q7 -5 11 3Z"/>
        </g>
        <ellipse cx="60" cy="70" rx="37" ry="34" fill="url(#pig-${uid})" stroke="#d98ca5" stroke-width="2.2"/>
        <ellipse cx="60" cy="82" rx="20" ry="14" fill="#ffb4c7" stroke="#d889a0" stroke-width="1.8"/>
        <g fill="#d77690">
          <ellipse cx="53" cy="81" rx="2.4" ry="3.4"/>
          <ellipse cx="67" cy="81" rx="2.4" ry="3.4"/>
        </g>
        <g class="pig-eye">
          <circle cx="47" cy="62" r="3.5" fill="#593a42"/>
          <circle cx="73" cy="62" r="3.5" fill="#593a42"/>
          <circle cx="48.2" cy="60.8" r="1.15" fill="#fff"/>
          <circle cx="74.2" cy="60.8" r="1.15" fill="#fff"/>
        </g>
        <g fill="url(#pig-blush-${uid})">
          <ellipse cx="36" cy="75" rx="9" ry="6"/>
          <ellipse cx="84" cy="75" rx="9" ry="6"/>
        </g>
        <path d="M51 95 q9 5 18 0" fill="none" stroke="#b66a80" stroke-width="1.8" stroke-linecap="round"/>
        <g transform="translate(84 36) rotate(12)">
          <g fill="#fff8dc" stroke="#e8c56a" stroke-width="1.2">
            <ellipse cx="0" cy="-5.5" rx="3.5" ry="5"/>
            <ellipse cx="5.2" cy="-1.7" rx="3.5" ry="5" transform="rotate(72 5.2 -1.7)"/>
            <ellipse cx="3.2" cy="4.5" rx="3.5" ry="5" transform="rotate(144 3.2 4.5)"/>
            <ellipse cx="-3.2" cy="4.5" rx="3.5" ry="5" transform="rotate(216 -3.2 4.5)"/>
            <ellipse cx="-5.2" cy="-1.7" rx="3.5" ry="5" transform="rotate(288 -5.2 -1.7)"/>
          </g>
          <circle r="2.8" fill="#ffb35c"/>
        </g>
      </g>`,
      'pig-art'
    );
  }

  // ---------------------------------------------------------------- 蘑菇
  function mushroomArt(block, uid) {
    return svg(
      '0 0 120 120',
      uid,
      `<defs>
        <linearGradient id="cap-${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff9a9e"/>
          <stop offset="100%" stop-color="#e9657a"/>
        </linearGradient>
        <linearGradient id="stem-${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fff8e4"/>
          <stop offset="100%" stop-color="#f4dfbd"/>
        </linearGradient>
      </defs>
      ${shadow(uid, 60, 104, 31, 6)}
      <g>
        <path d="M43 65 q-11 8 -16 3" fill="none" stroke="#f0dabc" stroke-width="7" stroke-linecap="round"/>
        <path d="M77 65 q11 8 16 3" fill="none" stroke="#f0dabc" stroke-width="7" stroke-linecap="round"/>
        <path d="M40 66 q2 34 20 34 q20 0 21 -34Z" fill="url(#stem-${uid})" stroke="#ddbf97" stroke-width="2"/>
        <g class="mushroom-face">
          <g class="mushroom-eye">
            <circle cx="52" cy="82" r="2.8" fill="#6d4a3d"/>
            <circle cx="68" cy="82" r="2.8" fill="#6d4a3d"/>
            <circle cx="53" cy="81" r=".9" fill="#fff"/>
            <circle cx="69" cy="81" r=".9" fill="#fff"/>
          </g>
          <ellipse cx="43" cy="88" rx="6" ry="3.6" fill="#ffa4b1" opacity=".65"/>
          <ellipse cx="77" cy="88" rx="6" ry="3.6" fill="#ffa4b1" opacity=".65"/>
          <path d="M56 90 q4 3 8 0" fill="none" stroke="#a97a60" stroke-width="1.7" stroke-linecap="round"/>
        </g>
        <path d="M12 61 C12 30 34 12 60 12 C86 12 108 30 108 61 C108 70 99 75 60 75 C21 75 12 70 12 61Z" fill="url(#cap-${uid})" stroke="#cf5269" stroke-width="2.3"/>
        <path d="M21 65 q38 15 79 0 q-4 9 -40 10 q-34 0 -39 -10Z" fill="#ffe9d6" opacity=".8"/>
        <g fill="#fff4e4" opacity=".95">
          <circle cx="34" cy="44" r="8"/>
          <circle cx="68" cy="33" r="6"/>
          <circle cx="83" cy="55" r="7"/>
          <circle cx="50" cy="56" r="4.5"/>
          <circle cx="22" cy="60" r="4"/>
        </g>
        <g fill="#fff" opacity=".55">
          <circle cx="32" cy="41" r="2.4"/>
          <circle cx="67" cy="31" r="1.8"/>
          <circle cx="81" cy="52" r="2"/>
        </g>
        <g stroke="#78a765" stroke-width="2" stroke-linecap="round" fill="#9bcd75">
          <path d="M24 103 q-3 -11 5 -15"/>
          <path d="M22 98 q-7 -3 -9 1 q-1 5 7 5Z"/>
          <path d="M94 104 q3 -9 -3 -13"/>
          <path d="M96 100 q7 -4 9 0 q1 4 -7 5Z"/>
        </g>
        ${sparkle(24, 29, 2.4, '#ffe9a8')}
      </g>`,
      'mushroom-art'
    );
  }

  // ---------------------------------------------------------------- 木箱（竖 / 方）
  function crateArt(block, uid) {
    const tall = block.h > block.w;
    const box = tall
      ? { x: 17, y: 24, w: 86, h: 116, r: 15 }
      : { x: 15, y: 28, w: 90, h: 76, r: 15 };
    const cx = box.x + box.w / 2;
    return svg(
      tall ? '0 0 120 160' : '0 0 120 120',
      uid,
      `<defs>
        <linearGradient id="wood-${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e5b77c"/>
          <stop offset="100%" stop-color="#c58b50"/>
        </linearGradient>
        <linearGradient id="wood-light-${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f3cf99"/>
          <stop offset="100%" stop-color="#d9a265"/>
        </linearGradient>
      </defs>
      ${shadow(uid, cx, box.y + box.h + 7, box.w / 2 + 5, 6)}
      <g transform="translate(0 ${tall ? 0 : 4})">
        <g stroke="#75a25e" stroke-width="2.2" stroke-linecap="round">
          <path d="M${cx} ${box.y + 3} q-2 -13 7 -17"/>
          <path d="M${cx + 6} ${box.y - 12} q8 -7 13 -1 q3 6 -8 7Z" fill="#9cd17b"/>
          <path d="M${cx - 1} ${box.y - 5} q-9 -7 -14 -1 q-3 6 9 7Z" fill="#aadd86"/>
        </g>
        <g>
          <rect x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" rx="${box.r}" fill="url(#wood-${uid})" stroke="#a96f3f" stroke-width="2.6"/>
          <rect x="${box.x + 7}" y="${box.y + 7}" width="${box.w - 14}" height="${box.h - 14}" rx="9" fill="url(#wood-light-${uid})" opacity=".58"/>
          <g stroke="#b37b48" stroke-width="2" opacity=".65">
            <path d="M${box.x + 14} ${box.y + 25} H${box.x + box.w - 14}"/>
            <path d="M${box.x + 14} ${box.y + box.h / 2} H${box.x + box.w - 14}"/>
            <path d="M${box.x + 14} ${box.y + box.h - 25} H${box.x + box.w - 14}"/>
          </g>
          <g stroke="#a96f3f" stroke-width="5" opacity=".7">
            <path d="M${box.x + 20} ${box.y + 15} L${box.x + box.w - 20} ${box.y + box.h - 15}"/>
            <path d="M${box.x + box.w - 20} ${box.y + 15} L${box.x + 20} ${box.y + box.h - 15}"/>
          </g>
          <g fill="#86552f">
            <circle cx="${box.x + 16}" cy="${box.y + 16}" r="3"/>
            <circle cx="${box.x + box.w - 16}" cy="${box.y + 16}" r="3"/>
            <circle cx="${box.x + 16}" cy="${box.y + box.h - 16}" r="3"/>
            <circle cx="${box.x + box.w - 16}" cy="${box.y + box.h - 16}" r="3"/>
          </g>
          <path d="M${cx} ${box.y + box.h / 2 - 8} q-7 0 -7 6 q0 5 7 9 q7 -4 7 -9 q0 -6 -7 -6Z" fill="#b77c4b" opacity=".6"/>
          <g fill="#ffd89b" opacity=".7">
            <rect x="${box.x + 12}" y="${box.y + 8}" width="14" height="3" rx="1.5"/>
          </g>
        </g>
      </g>`,
      'crate-art'
    );
  }

  // ---------------------------------------------------------------- 石头（宽）
  function rockArt(block, uid) {
    return svg(
      '0 0 160 100',
      uid,
      `<defs>
        <linearGradient id="rock-${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#c9d2d1"/>
          <stop offset="100%" stop-color="#96a8a7"/>
        </linearGradient>
        <linearGradient id="moss-${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#b7d88b"/>
          <stop offset="100%" stop-color="#83b46a"/>
        </linearGradient>
      </defs>
      ${shadow(uid, 82, 91, 55, 7)}
      <g>
        <path d="M20 76 C9 53 27 28 51 27 C64 14 94 16 107 28 C133 24 149 44 145 61 C150 79 129 91 110 87 C91 97 56 95 43 87 C31 90 23 84 20 76Z" fill="url(#rock-${uid})" stroke="#7f9290" stroke-width="2.4"/>
        <path d="M31 42 C42 25 63 20 78 27 C88 23 105 29 109 39 C97 32 80 34 69 42 C55 33 40 35 31 42Z" fill="url(#moss-${uid})" opacity=".9"/>
        <path d="M112 39 C122 35 137 42 140 52 C132 44 120 44 112 48Z" fill="#9ac77a" opacity=".9"/>
        <g fill="#7c8f8d" opacity=".65">
          <path d="M47 52 l7 -7 l6 8 l-3 8Z"/>
          <path d="M118 65 l9 -6 l4 7 l-8 7Z"/>
          <path d="M38 70 l7 -4 l4 6 l-7 5Z"/>
        </g>
        <g class="rock-face">
          <path d="M63 61 q5 -5 10 0" fill="none" stroke="#5b6e6d" stroke-width="2.6" stroke-linecap="round"/>
          <path d="M99 61 q5 -5 10 0" fill="none" stroke="#5b6e6d" stroke-width="2.6" stroke-linecap="round"/>
          <ellipse cx="60" cy="72" rx="8" ry="5" fill="#ff9fa9" opacity=".35"/>
          <ellipse cx="113" cy="72" rx="7" ry="4.5" fill="#ff9fa9" opacity=".35"/>
          <path d="M80 75 q5 3 10 0" fill="none" stroke="#5b6e6d" stroke-width="2.2" stroke-linecap="round"/>
        </g>
        <g stroke="#6e9a5a" stroke-width="2" fill="#a9d682" stroke-linecap="round">
          <path d="M126 32 q-1 -9 6 -12"/>
          <path d="M130 25 q8 -5 11 1 q1 5 -8 5Z"/>
          <circle cx="130" cy="18" r="4" fill="#fff1a8" stroke="#e6c56c"/>
          <circle cx="130" cy="18" r="1.7" fill="#ffbc63" stroke="none"/>
        </g>
        <g transform="translate(32 73)">
          <circle cx="0" cy="0" r="3" fill="#ffe6a3"/>
          <circle cx="-7" cy="-2" r="3" fill="#fff1c9"/>
          <circle cx="7" cy="-2" r="3" fill="#fff1c9"/>
        </g>
      </g>`,
      'rock-art'
    );
  }

  // ---------------------------------------------------------------- 小鸡
  function chickArt(block, uid) {
    return svg(
      '0 0 120 120',
      uid,
      `<defs>
        <linearGradient id="chick-${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fff3a8"/>
          <stop offset="100%" stop-color="#ffd45e"/>
        </linearGradient>
      </defs>
      ${shadow(uid, 60, 105, 29, 6)}
      <g>
        <g fill="#eea552" stroke="#d48938" stroke-width="1.6">
          <path d="M45 99 q-8 8 3 9 q8 1 6 -7"/>
          <path d="M73 99 q8 8 -3 9 q-8 1 -6 -7"/>
        </g>
        <ellipse cx="60" cy="73" rx="33" ry="29" fill="url(#chick-${uid})" stroke="#e3b044" stroke-width="2.2"/>
        <ellipse cx="36" cy="74" rx="10" ry="15" transform="rotate(22 36 74)" fill="#ffe98e" stroke="#e3b044" stroke-width="1.7"/>
        <ellipse cx="85" cy="74" rx="10" ry="15" transform="rotate(-22 85 74)" fill="#ffe98e" stroke="#e3b044" stroke-width="1.7"/>
        <circle cx="60" cy="47" r="27" fill="url(#chick-${uid})" stroke="#e3b044" stroke-width="2.2"/>
        <g fill="#fffdf4" stroke="#dfc9a6" stroke-width="1.6">
          <path d="M34 33 q6 -14 12 -1 q7 -14 13 0 q9 -12 12 2 q3 7 -4 9 q-17 4 -31 0 q-6 -2 -2 -10Z"/>
          <path d="M40 35 q6 -5 10 0" fill="none" stroke="#ead7b8"/>
          <path d="M59 33 q6 -4 9 1" fill="none" stroke="#ead7b8"/>
        </g>
        <path d="M55 17 q5 -9 11 0" fill="none" stroke="#e3b044" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M64 18 q5 -7 9 1" fill="none" stroke="#e3b044" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M41 49 q-12 0 -14 7 q-1 6 14 5 q8 -1 8 -6 q0 -5 -8 -6Z" fill="#f4a74e" stroke="#d58d38" stroke-width="1.6"/>
        <g class="chick-eye">
          <circle cx="50" cy="44" r="3.8" fill="#4b382d"/>
          <circle cx="70" cy="44" r="3.8" fill="#4b382d"/>
          <circle cx="51.3" cy="42.5" r="1.25" fill="#fff"/>
          <circle cx="71.3" cy="42.5" r="1.25" fill="#fff"/>
        </g>
        <ellipse cx="39" cy="54" rx="7" ry="4" fill="#ff9d9d" opacity=".63"/>
        <ellipse cx="81" cy="54" rx="6" ry="3.6" fill="#ff9d9d" opacity=".55"/>
        <path d="M55 56 q5 4 10 0" fill="none" stroke="#a47342" stroke-width="1.7" stroke-linecap="round"/>
        ${sparkle(92, 36, 2.5, '#fff8cc')}
        ${sparkle(26, 62, 1.8, '#fff8cc')}
      </g>`,
      'chick-art'
    );
  }

  /**
   * 注册一个方块类型。
   * @param {string} id
   * @param {object} def { name:{zh,en}, emoji, palette, art(block, uid) }
   */
  function register(id, def) {
    if (!id || registry[id]) throw new Error('方块类型 id 重复或为空: ' + id);
    if (typeof def.art !== 'function') throw new Error('方块类型缺少 art 绘制函数: ' + id);
    registry[id] = Object.assign(
      {
        id,
        name: { zh: id, en: id },
        emoji: '🧩',
        palette: {
          shell: '#fff7e8',
          shellEdge: '#ecdcc3',
          glow: 'rgba(255, 203, 130, .35)',
          text: '#6b5541'
        },
        sizes: [[1, 1]],
        tag: ''
      },
      def
    );
    return registry[id];
  }

  register('sheep', {
    name: { zh: '羊妈妈', en: 'Mama Sheep' },
    emoji: '🐑',
    tag: { zh: '主角', en: 'HERO' },
    sizes: [[2, 2]],
    palette: {
      shell: '#fffaf2',
      shellEdge: '#ead8c2',
      glow: 'rgba(255, 196, 151, .38)',
      text: '#725a48'
    },
    art: sheepArt
  });

  register('duck', {
    name: { zh: '小鸭', en: 'Duck' },
    emoji: '🦆',
    sizes: [[1, 1]],
    palette: {
      shell: '#fff7d9',
      shellEdge: '#f0dfa7',
      glow: 'rgba(255, 207, 78, .35)',
      text: '#7b6037'
    },
    art: duckArt
  });

  register('pig', {
    name: { zh: '小猪', en: 'Piggy' },
    emoji: '🐷',
    sizes: [[1, 2], [2, 1]],
    palette: {
      shell: '#fff1f5',
      shellEdge: '#f2cbd6',
      glow: 'rgba(255, 165, 190, .35)',
      text: '#7b515d'
    },
    art: pigArt
  });

  register('mushroom', {
    name: { zh: '蘑菇', en: 'Mushroom' },
    emoji: '🍄',
    sizes: [[1, 1]],
    palette: {
      shell: '#fff4ec',
      shellEdge: '#efcfc4',
      glow: 'rgba(240, 130, 145, .3)',
      text: '#7a514b'
    },
    art: mushroomArt
  });

  register('crate', {
    name: { zh: '木箱', en: 'Wooden Crate' },
    emoji: '📦',
    sizes: [[1, 2], [1, 1]],
    palette: {
      shell: '#fff2de',
      shellEdge: '#e5c9a0',
      glow: 'rgba(200, 143, 88, .3)',
      text: '#6e4b2f'
    },
    art: crateArt
  });

  register('rock', {
    name: { zh: '石头', en: 'Sleepy Rock' },
    emoji: '🪨',
    sizes: [[2, 1]],
    palette: {
      shell: '#f1f7f1',
      shellEdge: '#cbd9ce',
      glow: 'rgba(123, 170, 139, .3)',
      text: '#4d655d'
    },
    art: rockArt
  });

  register('chick', {
    name: { zh: '小鸡', en: 'Chick' },
    emoji: '🐤',
    sizes: [[1, 1]],
    palette: {
      shell: '#fff9df',
      shellEdge: '#eddfad',
      glow: 'rgba(255, 212, 94, .32)',
      text: '#745f39'
    },
    art: chickArt
  });

  SG.BlockTypes = {
    register,
    get(id) {
      return registry[id] || null;
    },
    all() {
      return Object.values(registry);
    },
    /**
     * 兼容图片素材：如果关卡方块写了 image，渲染层会优先使用它；
     * 否则使用注册表里的 SVG。这样替换美术资源无需改逻辑。
     */
    renderArt(block) {
      if (block.image) {
        return `<img class="block-image" src="${block.image}" alt="${block.alt || ''}" draggable="false">`;
      }
      const type = registry[block.type];
      if (!type) return `<span class="block-emoji">${block.emoji || '🧩'}</span>`;
      return type.art(block, block.uid);
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
