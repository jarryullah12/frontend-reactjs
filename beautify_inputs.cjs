const fs = require('fs');
const path = require('path');

const directoryPath = path.join(process.cwd(), 'src/pages/tools');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace input classes
  content = content.replace(
    /className="([^"]*)border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-\[#4f39f6\]([^"]*)"/g,
    'className="$1border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all $2"'
  );

  // Replace textarea classes where it has bg-gray-50
  content = content.replace(
    /className="([^"]*)border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-\[#4f39f6\]([^"]*)"/g,
    'className="$1border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all $2"'
  );

  // Beautify standard buttons
  const oldButtonClass = /className="([^"]*)w-full bg-\[#4f39f6\] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#432ddb] transition-colors([^"]*)"/g;
  content = content.replace(
    oldButtonClass,
    'className="$1w-full bg-[#4f39f6] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#432ddb] hover:shadow-lg hover:shadow-[#4f39f6]/30 transition-all active:scale-[0.98] $2"'
  );

  // Replace old flex button classes
  const oldFlexButtonClass = /className="([^"]*)flex items-center justify-center gap-2 w-full bg-\[#4f39f6\] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#432ddb] transition-colors([^"]*)"/g;
  content = content.replace(
    oldFlexButtonClass,
    'className="$1flex items-center justify-center gap-2 w-full bg-[#4f39f6] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#432ddb] hover:shadow-lg hover:shadow-[#4f39f6]/30 transition-all active:scale-[0.98] $2"'
  );

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated Inputs/Buttons: ${path.basename(filePath)}`);
  }
}

function traverseDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (file.endsWith('.tsx')) {
      processFile(fullPath);
    }
  });
}

traverseDir(directoryPath);
console.log('Done beautifying inputs and buttons!');
