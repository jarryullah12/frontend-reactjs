const fs = require('fs');
const path = require('path');

const headerPath = path.join(__dirname, 'src', 'components', 'layout', 'Header.tsx');
let header = fs.readFileSync(headerPath, 'utf8');

// 1. Revert "102 Tools" back to "{t('nav.tools')}"
header = header.replace(/102 Tools/g, "{t('nav.tools')}");

// 2. Update the tools array to include all 102 tools
// We can get the full list from Tools.tsx
const toolsTsxPath = path.join(__dirname, 'src', 'pages', 'Tools.tsx');
const toolsTsx = fs.readFileSync(toolsTsxPath, 'utf8');

const allToolsForHeader = [];
const fullToolRegex = /\{ id: '([^']+)', name: (t\('[^']+'\)|'[^']+')/g;
let match;
while ((match = fullToolRegex.exec(toolsTsx)) !== null) {
  const id = match[1];
  let name = match[2];
  // If name is a translation key, we need to extract the actual string or use the translation
  // In Header.tsx, we'll just use the same format
  allToolsForHeader.push(`    { id: '${id}', name: ${name} }`);
}

const newToolsArray = `  const tools = [\n${allToolsForHeader.join(',\n')}\n  ];`;

header = header.replace(/const tools = \[[^\]]*\];/s, newToolsArray);

fs.writeFileSync(headerPath, header);

console.log('Successfully updated Header.tsx');
