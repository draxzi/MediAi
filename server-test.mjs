import http from 'http';

process.on('SIGTERM', () => {
  console.log('SIGTERM received at', new Date().toISOString());
});

process.on('exit', (code) => {
  console.log('Process exiting - code:', code, 'at', new Date().toISOString());
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('MediAI is running');
});

server.listen(5000, '0.0.0.0', () => {
  console.log('Server listening on port 5000 at', new Date().toISOString());
});

setInterval(() => {
  console.log('Still alive at', new Date().toISOString());
}, 5000);
