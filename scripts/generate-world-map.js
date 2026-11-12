// Script to generate a high quality dotted world map SVG
import fs from 'fs';

// Simplified continent multi-polygons in [lon, lat] coordinates
const continents = [
  // North America - Alaska & Canada
  [
    [-168, 65], [-160, 71], [-140, 70], [-125, 69], [-85, 70], [-75, 62], [-60, 60],
    [-55, 52], [-65, 45], [-75, 45], [-82, 42], [-90, 48], [-95, 49], [-123, 49],
    [-125, 52], [-132, 56], [-136, 59], [-150, 60], [-162, 55], [-166, 60]
  ],
  // Greenland
  [
    [-50, 60], [-40, 60], [-25, 70], [-20, 77], [-30, 83], [-55, 82], [-60, 75], [-50, 65]
  ],
  // USA Continental
  [
    [-124, 48], [-95, 49], [-82, 45], [-70, 45], [-68, 43], [-74, 40], [-76, 35],
    [-81, 31], [-81, 25], [-85, 30], [-95, 29], [-97, 26], [-105, 31], [-117, 32],
    [-122, 37], [-124, 43]
  ],
  // Mexico & Central America
  [
    [-117, 32], [-105, 31], [-97, 26], [-97, 20], [-88, 21], [-87, 16], [-83, 10],
    [-78, 8], [-80, 9], [-85, 13], [-95, 16], [-105, 20], [-110, 24], [-115, 30]
  ],
  // South America
  [
    [-77, 8], [-72, 11], [-60, 10], [-50, 3], [-35, -5], [-35, -12], [-40, -22],
    [-50, -30], [-55, -35], [-65, -42], [-68, -54], [-73, -52], [-74, -45],
    [-70, -30], [-75, -20], [-81, -5], [-80, 2], [-77, 8]
  ],
  // Europe
  [
    [-9, 36], [-9, 43], [0, 44], [-4, 48], [2, 51], [8, 54], [10, 57], [14, 55],
    [24, 58], [28, 65], [20, 70], [28, 71], [40, 68], [50, 66], [50, 50],
    [40, 45], [30, 46], [26, 40], [20, 38], [15, 40], [12, 44], [3, 42], [-3, 37]
  ],
  // UK & Ireland
  [
    [-10, 51], [-6, 55], [-3, 58], [0, 53], [-1, 51], [-5, 50]
  ],
  // Scandinavia
  [
    [5, 58], [10, 60], [18, 68], [28, 70], [24, 60], [15, 56], [10, 57]
  ],
  // Africa
  [
    [-17, 15], [-17, 21], [-13, 28], [-5, 36], [10, 37], [11, 33], [25, 32],
    [32, 31], [34, 27], [37, 22], [42, 12], [51, 10], [45, 2], [40, -5],
    [35, -18], [32, -28], [28, -34], [18, -34], [13, -23], [12, -15], [9, 2],
    [4, 5], [-5, 5], [-14, 8], [-17, 12]
  ],
  // Madagascar
  [
    [44, -13], [50, -14], [48, -25], [44, -25]
  ],
  // Middle East & Arabian Peninsula (Oman, Saudi Arabia, UAE, Yemen, etc.)
  [
    [34, 27], [36, 32], [44, 37], [50, 37], [60, 37], [63, 32], [60, 25],
    [59, 22], // Oman coast
    [55, 17], [50, 14], [44, 13], [43, 16], [40, 20], [38, 25]
  ],
  // Russia & Northern Asia
  [
    [50, 50], [50, 66], [60, 70], [80, 73], [105, 77], [130, 72], [160, 70],
    [175, 66], [170, 60], [155, 55], [140, 53], [130, 48], [120, 50],
    [100, 52], [80, 50], [65, 48]
  ],
  // Central Asia & China & Mongolia
  [
    [65, 48], [80, 50], [100, 52], [120, 50], [130, 48], [122, 40], [120, 32],
    [118, 24], [108, 22], [100, 22], [90, 28], [80, 32], [70, 36], [60, 37]
  ],
  // India & Subcontinent
  [
    [68, 24], [72, 32], [80, 32], [90, 28], [92, 22], [88, 21], [80, 16],
    [80, 9], [76, 9], [73, 16], [68, 22]
  ],
  // Southeast Asia
  [
    [98, 20], [105, 21], [108, 15], [104, 10], [100, 6], [102, 2], [98, 9], [96, 16]
  ],
  // Japan
  [
    [130, 32], [135, 35], [141, 41], [143, 44], [140, 45], [136, 38], [130, 34]
  ],
  // Indonesia & Malaysia / Philippines islands
  [
    [96, 4], [105, -5], [115, -8], [125, -9], [135, -4], [140, -3], [130, -1], [115, 0], [108, 2]
  ],
  [
    [115, 6], [118, 4], [117, -2], [110, -3], [109, 2]
  ],
  [
    [120, 18], [125, 14], [126, 8], [122, 7], [120, 13]
  ],
  // Australia
  [
    [114, -22], [118, -35], [135, -35], [140, -38], [148, -38], [153, -28],
    [148, -19], [142, -11], [136, -12], [130, -14], [125, -15], [122, -18]
  ],
  // New Zealand
  [
    [166, -46], [174, -41], [178, -38], [174, -36], [172, -43], [168, -46]
  ]
];

// Point in polygon test
function pointInPoly(pt, poly) {
  let [x, y] = pt;
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    let [xi, yi] = poly[i];
    let [xj, yj] = poly[j];
    let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Convert lon/lat to SVG coordinates (1000 x 500)
// Lon: -180 to 180 -> 20 to 980
// Lat: 80 to -60 -> 30 to 470
function toSvg(lon, lat) {
  let x = ((lon + 180) / 360) * 960 + 20;
  let y = ((85 - lat) / 145) * 440 + 30;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

const stepLon = 3.2; // degrees
const stepLat = 3.2; // degrees

let dots = [];

for (let lat = 82; lat >= -55; lat -= stepLat) {
  for (let lon = -175; lon <= 180; lon += stepLon) {
    let pt = [lon, lat];
    let isLand = continents.some(poly => pointInPoly(pt, poly));
    if (isLand) {
      let [sx, sy] = toSvg(lon, lat);
      // Check if near Muscat, Oman (lat ~23.6, lon ~58.5)
      let distOman = Math.hypot(lon - 58.5, lat - 23.6);
      dots.push({ x: sx, y: sy, isOman: distOman < 4.0 });
    }
  }
}

console.log(`Generated ${dots.length} dots for world map.`);

let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" width="100%" height="100%" fill="none">
  <defs>
    <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2473AB" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#2473AB" stop-opacity="0" />
    </radialGradient>
  </defs>
  <g class="world-dots" fill="#2473AB" opacity="0.32">
${dots.map(d => `    <circle cx="${d.x}" cy="${d.y}" r="${d.isOman ? 2.5 : 1.6}" ${d.isOman ? 'fill="#0284C7" opacity="1"' : ''}/>`).join('\n')}
  </g>
  <!-- Oman Global Hub Marker Pulse -->
  <g transform="translate(${toSvg(58.5, 23.6)[0]}, ${toSvg(58.5, 23.6)[1]})">
    <circle r="6" fill="#0284c7" opacity="0.25">
      <animate attributeName="r" values="3;9;3" dur="3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle r="3" fill="#0284C7" />
    <circle r="1.5" fill="#FFFFFF" />
  </g>
</svg>`;

fs.writeFileSync('public/images/world-map-dots.svg', svgContent, 'utf-8');
console.log('Saved public/images/world-map-dots.svg successfully!');

