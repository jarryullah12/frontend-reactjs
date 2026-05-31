const fs = require('fs');
const path = require('path');

const directoryPath = path.join(process.cwd(), 'src/pages/tools');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace background container for simple tools
  content = content.replace(
    /className="([^"]*)bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm([^"]*)"/g,
    'className="$1bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl p-6 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-xl dark:shadow-2xl dark:shadow-black/40 transition-all hover:shadow-2xl $2"'
  );

  // Replace textarea from simple tools
  content = content.replace(
    /className="([^"]*)border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-\[#4f39f6\] focus:border-transparent([^"]*)"/g,
    'className="$1border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all $2"'
  );
  
  // Replace input from simple tools
  content = content.replace(
    /className="([^"]*)px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-\[#4f39f6\] focus:border-transparent([^"]*)"/g,
    'className="$1px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all $2"'
  );

  // Beautify standard buttons from simple tools
  const oldButtonClass = /className="([^"]*)px-6 py-2 text-sm font-medium text-white bg-\[#4f39f6\] hover:bg-\[#4f39f6\]\/90 rounded-lg transition-colors([^"]*)"/g;
  content = content.replace(
    oldButtonClass,
    'className="$1px-6 py-2.5 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#432ddb] hover:shadow-lg hover:shadow-[#4f39f6]/30 rounded-xl transition-all active:scale-[0.98] $2"'
  );

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated Simple Tools: ${path.basename(filePath)}`);
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
console.log('Done beautifying simple tools inputs and buttons!');
