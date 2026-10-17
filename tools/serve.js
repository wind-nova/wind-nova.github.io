/**
 * 零依赖本地静态服务器。
 * 用法：node tools/serve.js [port]
 * 默认 http://127.0.0.1:4173
 *
 * 提示功能在 HTTP 下会启用 Web Worker；直接双击 index.html（file://）也能玩，
 * 但提示会退回主线程计算。
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const port = Number(process.argv[2] || process.env.PORT || 4173);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav'
};

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent((req.url || '/').split('?')[0]);
  } catch (_) {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }
  if (pathname === '/') pathname = '/index.html';
  const filePath = path.resolve(root, '.' + pathname);
  if (!filePath.startsWith(root + path.sep)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found: ' + pathname);
      return;
    }
    res.writeHead(200, {
      'Content-Type': mime[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`救羊出圈 · http://127.0.0.1:${port}`);
});
