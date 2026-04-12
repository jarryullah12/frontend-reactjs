const fs = require('fs');
const path = require('path');

const headerPath = path.join(__dirname, 'src', 'components', 'layout', 'Header.tsx');
let header = fs.readFileSync(headerPath, 'utf8');

// The tools array in Header.tsx currently includes categories like 'all', 'seo', 'minifiers', etc.
// We need to remove those and only keep the actual tools.
// Let's just replace the entire tools array with the correct one.

const toolsTsxPath = path.join(__dirname, 'src', 'pages', 'Tools.tsx');
const toolsTsx = fs.readFileSync(toolsTsxPath, 'utf8');

const allToolsForHeader = [];
const fullToolRegex = /\{ id: '([^']+)', name: (t\('[^']+'\)|'[^']+')/g;
let match;
const categories = ['all', 'seo', 'minifiers', 'validators', 'keyword', 'analysis', 'ai_content', 'ai_email', 'ai_ideas', 'ai_social', 'utility'];

while ((match = fullToolRegex.exec(toolsTsx)) !== null) {
  const id = match[1];
  let name = match[2];
  if (!categories.includes(id)) {
    allToolsForHeader.push(`    { id: '${id}', name: ${name} }`);
  }
}

const newToolsArray = `  const tools = [\n${allToolsForHeader.join(',\n')}\n  ];`;

header = header.replace(/const tools = \[[^\]]*\];/s, newToolsArray);

fs.writeFileSync(headerPath, header);

console.log('Successfully updated Header.tsx tools array to only include actual tools');
