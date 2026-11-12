import fs from 'fs';
import zlib from 'zlib';

function crc32(buf) {
  let table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const toCrc = chunk.subarray(4, 8 + len);
  chunk.writeUInt32BE(crc32(toCrc), 8 + len);
  return chunk;
}

const buf = fs.readFileSync('public/logos/osan-group-official.png');

// Parse original PNG
let pos = 8;
const idatChunks = [];
let width, height;
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.slice(pos + 4, pos + 8).toString('ascii');
  if (type === 'IHDR') {
    width = buf.readUInt32BE(pos + 8);
    height = buf.readUInt32BE(pos + 12);
  } else if (type === 'IDAT') {
    idatChunks.push(buf.slice(pos + 8, pos + 8 + len));
  }
  pos += 12 + len;
}

const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
const bytesPerPixel = 4;
const rowSize = 1 + width * bytesPerPixel;

// Find bounding box
let minX = width, maxX = 0, minY = height, maxY = 0;
for (let y = 0; y < height; y++) {
  const rowStart = y * rowSize + 1;
  for (let x = 0; x < width; x++) {
    const a = decompressed[rowStart + x * bytesPerPixel + 3];
    if (a > 15) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

// Add padding of ~30px
const pad = 30;
minX = Math.max(0, minX - pad);
maxX = Math.min(width - 1, maxX + pad);
minY = Math.max(0, minY - pad);
maxY = Math.min(height - 1, maxY + pad);

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;

console.log('Original:', width, 'x', height);
console.log('Cropped:', cropW, 'x', cropH, 'from [', minX, minY, ']');

// Build cropped scanlines
const croppedScanlines = Buffer.alloc(cropH * (1 + cropW * 4));
let outPos = 0;

for (let y = minY; y <= maxY; y++) {
  croppedScanlines[outPos++] = 0; // Filter: None
  const srcRow = y * rowSize + 1 + minX * 4;
  decompressed.copy(croppedScanlines, outPos, srcRow, srcRow + cropW * 4);
  outPos += cropW * 4;
}

const compressed = zlib.deflateSync(croppedScanlines, { level: 9 });

const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(cropW, 0);
ihdrData.writeUInt32BE(cropH, 4);
ihdrData[8] = 8; // 8-bit
ihdrData[9] = 6; // RGBA
ihdrData[10] = 0;
ihdrData[11] = 0;
ihdrData[12] = 0;

const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const ihdrChunk = createChunk('IHDR', ihdrData);
const idatChunk = createChunk('IDAT', compressed);
const iendChunk = createChunk('IEND', Buffer.alloc(0));

const finalPng = Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
fs.writeFileSync('public/logos/osan-group-official-tight.png', finalPng);
console.log('Successfully saved public/logos/osan-group-official-tight.png!');

