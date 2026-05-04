const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'src', 'pages', 'tools');
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.tsx'));

let updatedCount = 0;

const regex = /\{\s*result\s*&&\s*!loading\s*&&\s*\(\s*<div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">\s*<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Results<\/h3>\s*<div className="prose dark:prose-invert max-w-none">\s*\{\s*typeof result === 'string' \? <p className="whitespace-pre-wrap">\{result\}<\/p> : JSON\.stringify\(result, null, 2\)\s*\}\s*<\/div>\s*<\/div>\s*\)\s*\}/g;

for (const file of files) {
  const filePath = path.join(toolsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.match(regex)) {
    // Replace the block
    content = content.replace(regex, "{result && !loading && <ResultDisplay result={result} />}");

    // Add import
    if (!content.includes("ResultDisplay")) {
      const importStatement = "import { ResultDisplay } from '../../components/ResultDisplay';\n";
      
      // Find the last import statement to insert after it
      const importMatches = [...content.matchAll(/^import.*?;?/gm)];
      if (importMatches.length > 0) {
        const lastImport = importMatches[importMatches.length - 1];
        const insertPos = lastImport.index + lastImport[0].length;
        content = content.slice(0, insertPos) + '\n' + importStatement + content.slice(insertPos);
      } else {
        content = importStatement + content;
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Total updated: ${updatedCount}`);
