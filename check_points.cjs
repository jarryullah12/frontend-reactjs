const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'toolDescriptions.ts');
const content = fs.readFileSync(filePath, 'utf8');

const matches = content.match(/\[([\s\S]*?)\]/g);
if (matches) {
  matches.forEach((match, index) => {
    const points = match.split('\n').filter(line => line.trim().startsWith("'")).length;
    console.log(`Tool ${index + 1}: ${points} points`);
  });
}
