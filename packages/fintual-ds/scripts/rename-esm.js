#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function copyAndRename(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    return;
  }

  const files = fs.readdirSync(srcDir);

  files.forEach((file) => {
    const srcPath = path.join(srcDir, file);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      const newDestDir = path.join(destDir, file);
      if (!fs.existsSync(newDestDir)) {
        fs.mkdirSync(newDestDir, { recursive: true });
      }
      copyAndRename(srcPath, newDestDir);
    } else if (file.endsWith('.js')) {
      const destPath = path.join(destDir, file.replace(/\.js$/, '.mjs'));
      fs.copyFileSync(srcPath, destPath);
      console.log(`Created: ${destPath}`);
    }
  });
}

const tempEsmDir = path.join(__dirname, '../dist/temp-esm');
const distDir = path.join(__dirname, '../dist');

if (fs.existsSync(tempEsmDir)) {
  console.log('Converting ESM .js files to .mjs...');
  copyAndRename(tempEsmDir, distDir);

  fs.rmSync(tempEsmDir, { recursive: true, force: true });
  console.log('Cleaned up temp-esm directory');
  console.log('Done!');
} else {
  console.error('dist/temp-esm/ directory not found.');
  process.exit(1);
}
