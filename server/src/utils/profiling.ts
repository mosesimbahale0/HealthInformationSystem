export default function logMemory() {
    process.on('warning', e => console.warn(e.stack));
    const used = process.memoryUsage();
    console.log(`Memory Usage:
    RSS: ${(used.rss/1024/1024).toFixed(2)} MB
    Heap Total: ${(used.heapTotal/1024/1024).toFixed(2)} MB
    Heap Used: ${(used.heapUsed/1024/1024).toFixed(2)} MB
    External: ${(used.external/1024/1024).toFixed(2)} MB`);
  }
  