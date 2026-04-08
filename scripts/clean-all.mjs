import { rmSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execSync } from 'node:child_process';

const root = resolve(process.cwd());

// Directories to be deleted recursively
const folderNames = ['dist', '.nx', 'node_modules'];

// Root-level targets
const targets = [
  ...folderNames.map(name => join(root, name))
];

// Scan sub-directories for targets
const scanDirs = ['apps', 'libs', 'libs/shared'];

console.log('🧹 Starting deep cleanup...');

scanDirs.forEach(scanDir => {
  const fullScanPath = join(root, scanDir);
  if (!existsSync(fullScanPath)) return;

  const subDirs = readdirSync(fullScanPath);
  subDirs.forEach(subDir => {
    const projectPath = join(fullScanPath, subDir);
    if (!statSync(projectPath).isDirectory()) return;

    folderNames.forEach(folderName => {
      const targetPath = join(projectPath, folderName);
      if (existsSync(targetPath)) {
        targets.push(targetPath);
      }
    });
  });
});

let deletedCount = 0;
targets.forEach(path => {
  if (existsSync(path)) {
    try {
      console.log(`  Deleting: ${path}`);
      rmSync(path, { recursive: true, force: true });
      deletedCount++;
    } catch (err) {
      console.error(`  ❌ Failed to delete ${path}: ${err.message}`);
    }
  }
});

// Reset Nx
try {
  console.log('🔄 Resetting Nx cache...');
  execSync('pnpm nx reset', { stdio: 'inherit' });
} catch {
  console.warn('  ⚠️ Nx reset failed (maybe nx is not installed or pnpm missing)');
}

console.log(`\n✅ Cleanup complete! Deleted ${deletedCount} directories.`);
console.log('🚀 Please run \'pnpm install\' now.');
