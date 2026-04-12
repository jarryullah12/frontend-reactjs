const fs = require('fs');
const path = require('path');
const toolDescPath = path.join(__dirname, 'src', 'data', 'toolDescriptions.ts');
let toolDesc = fs.readFileSync(toolDescPath, 'utf8');
toolDesc = toolDesc.replace(/\\n/g, '\n');
fs.writeFileSync(toolDescPath, toolDesc);
console.log('Fixed toolDescriptions.ts newlines');
