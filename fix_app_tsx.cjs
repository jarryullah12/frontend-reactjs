const fs = require('fs');
const path = require('path');
const appTsxPath = path.join(__dirname, 'src', 'App.tsx');
let appTsx = fs.readFileSync(appTsxPath, 'utf8');
appTsx = appTsx.replace(/\\n/g, '\n');
fs.writeFileSync(appTsxPath, appTsx);
console.log('Fixed App.tsx newlines');
