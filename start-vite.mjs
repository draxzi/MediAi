process.env.CI = 'true';

process.on('SIGTERM', () => {
  console.log('SIGTERM received - ignoring');
});

process.on('SIGHUP', () => {
  console.log('SIGHUP received - ignoring');
});

process.on('exit', (code) => {
  console.log('Process exiting with code:', code);
});

const { createServer } = await import('vite');

const server = await createServer({
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: true,
  },
});

await server.listen();
server.printUrls();

console.log('Vite server is running on port 5000');

await new Promise(() => {});
