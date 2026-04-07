import { execSync } from 'node:child_process';
import { platform } from 'node:os';

const ports = [4200, 4201, 4202, 4203, 4204, 4205];
const isWindows = platform() === 'win32';

console.log(`🚀 Killing processes on ports: ${ports.join(', ')}`);

for (const port of ports) {
  try {
    if (isWindows) {
      // Windows: Find PID using netstat and kill using taskkill
      const stdout = execSync(`netstat -ano | findstr :${port}`).toString();
      const lines = stdout.split('\n').filter(line => line.trim().length > 0);
      
      const pids = new Set();
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        // The PID is the last element in the netstat output for listening/established connections
        const pid = parts[parts.length - 1];
        if (pid && !Number.isNaN(Number.parseInt(pid)) && pid !== '0') {
          pids.add(pid);
        }
      }

      for (const pid of pids) {
        console.log(`  [Windows] Killing PID ${pid} on port ${port}...`);
        execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
      }
    } else {
      // Linux/macOS: Use lsof to find PID and kill
      const pid = execSync(`lsof -t -i:${port}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
      if (pid) {
        console.log(`  [Unix] Killing PID ${pid} on port ${port}...`);
        execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
      }
    }
  } catch (_error) {
    // If the port is not in use, execSync might throw - we can safely ignore it
  }
}

console.log('✅ Port cleanup finished.');
