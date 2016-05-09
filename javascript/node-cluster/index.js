const cluster = require('cluster');
const countQueensFrom = require('./n-queens');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  const n = 8;
  let solutions = 0;
  let processes = 0;
  let completed = 0;
  const limit = numCPUs < n ? numCPUs : n;

  let startTime = Date.now();
  for (let i = 0; processes < limit; i++) {
    let worker = cluster.fork();
    worker.send({ type: 'start', processes, n });
    processes++;

    worker.on('message', (msg) => {
      if (msg.type === 'completed') {
        solutions += msg.solutions;
        completed++;

        if (processes < n) {
          worker.send({ type: 'start', processes, n });
          processes++;
        } else if (completed === n) {
          let endTime = Date.now();
          console.log(`Found ${solutions} solutions in ${endTime - startTime}ms`);
          cluster.disconnect();
        } else {
          worker.kill();
        }
      }
    });
  }
} else {
  process.on('message', (msg) => {
    if (msg.type === 'start') {
      countQueensFrom(msg.processes, msg.n);
    }
  });
}
