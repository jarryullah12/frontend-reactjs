const fs = require('fs');
const path = require('path');
const toolsTsxPath = path.join(__dirname, 'src', 'pages', 'Tools.tsx');
let toolsTsx = fs.readFileSync(toolsTsxPath, 'utf8');
toolsTsx = toolsTsx.replace(/\\n/g, '\n');
fs.writeFileSync(toolsTsxPath, toolsTsx);
console.log('Fixed Tools.tsx newlines');
