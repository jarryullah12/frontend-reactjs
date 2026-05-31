const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src/pages/tools');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace standard card
  content = content.replace(
    /className="([^"]*)bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6(?: shadow-sm)?([^"]*)"/g,
    'className="$1bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl rounded-2xl border border-white/50 dark:border-gray-700/50 p-6 shadow-xl dark:shadow-2xl dark:shadow-black/40 transition-all hover:shadow-2xl $2"'
  );

  // Replace light result card
  content = content.replace(
    /className="([^"]*)bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6(?: shadow-sm)?([^"]*)"/g,
    'className="$1bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg $2"'
  );
  
  // Make the mb-8 header div more beautiful
  content = content.replace(
    /<div className="mb-8">\s*<h1 className="text-3xl font-bold/g,
    '<div className="mb-12 text-center md:text-left">\n        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight'
  );
  
  // Subtitle spacing
  content = content.replace(
    /<\/h1>\s*<p className="text-gray-600 dark:text-gray-400">/g,
    '</h1>\n        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">'
  );

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.basename(filePath)}`);
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
console.log('Done beautifying tools!');
