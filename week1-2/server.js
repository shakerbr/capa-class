const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const WORKSPACE = process.cwd();

function extractDate(dirname) {
  const match = dirname.match(/^(\d{4})(\d{2})(\d{2})/);
  if (match) {
    return {
      year: match[1],
      month: match[2],
      day: match[3],
      display: `${match[1]}/${match[2]}/${match[3]}`
    };
  }
  return null;
}

function scanProjects() {
  const results = [];

  function scan(dir, base) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          const indexPath = path.join(full, 'index.html');
          if (fs.existsSync(indexPath)) {
            const parent = path.dirname(full);
            const dateInfo = extractDate(path.basename(parent));
            let rel = full.substring(base.length).replace(/\\/g, '/');
            // Strip leading slash if present (Windows paths)
            if (rel.startsWith('/')) rel = rel.substring(1);
            results.push({
              name: entry.name,
              date: dateInfo ? dateInfo.display : null,
              path: './' + rel + '/'
            });
          } else {
            scan(full, base);
          }
        }
      }
    } catch (e) {}
  }

  scan(WORKSPACE, WORKSPACE);
  return results;
}

function groupProjects(projects) {
  const byDate = {};
  for (const p of projects) {
    const key = p.date || 'Other';
    (byDate[key] ||= []).push({ name: p.name, path: p.path });
  }

  return Object.keys(byDate)
    .map(date => ({ date, projects: byDate[date] }))
    .sort((a, b) => {
      if (a.date === 'Other') return 1;
      if (b.date === 'Other') return -1;
      return b.date.localeCompare(a.date);
    });
}

const server = http.createServer((req, res) => {
  if (req.url === '/projects.json') {
    const grouped = groupProjects(scanProjects());
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(grouped, null, 2));
    return;
  }

  if (req.url === '/shutdown') {
    res.end('Bye!');
    server.close();
    return;
  }

  // Resolve requested path to filesystem path
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(WORKSPACE, filePath);

  // Check if path is a directory - if so, look for index.html inside
  try {
    const stats = fs.lstatSync(filePath);
    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      if (fs.existsSync(indexPath)) {
        filePath = indexPath;
      } else {
        // No index.html in directory - not found
        res.writeHead(404);
        res.end('Not found');
        return;
      }
    }
  } catch (e) {
    // Path doesn't exist or error - will be caught below
  }

// Read and serve the file
   const isBinary = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico'].includes(path.extname(filePath).toLowerCase());
   fs.readFile(filePath, isBinary ? null : 'utf8', (err, data) => {
     if (err) {
       res.writeHead(404);
       res.end('Not found');
       return;
     }

     // Inject live-reload script before </body> for HTML files
     if (filePath.endsWith('.html')) {
       const script = `
 <script>
 (function() {
   var ws = new WebSocket('ws://localhost:${PORT}/__reload__');
   ws.onmessage = function(event) {
     if (event.data === 'reload') {
       window.location.reload();
     }
   };
   ws.onclose = function() {
     setTimeout(function() { ws = new WebSocket('ws://localhost:${PORT}/__reload__'); }, 1000);
   };
 })();
 </script>`;
       data = data.replace('</body>', script + '\n</body>');
     }

     res.writeHead(200, { 'Content-Type': getContentType(filePath) });
     res.end(data);
   });
});

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8',
  };
  return types[ext] || 'application/octet-stream';
}

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('Client connected');
});

function broadcastReload() {
  wss.clients.forEach(client => {
    if (client.readyState === 1) client.send('reload');
  });
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop');
});

// Watch for filesystem changes and trigger reload
let timeout;
fs.watch(WORKSPACE, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  if (eventType === 'change') {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log(`File changed: ${filename}, reloading clients...`);
      broadcastReload();
    }, 100);
  }
});
