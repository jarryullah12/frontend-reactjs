const fs = require('fs');
const path = require('path');

const dir = './src/pages/tools';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const matches = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const match = content.match(/<div className="[^"]*whitespace-pre-wrap[^"]*">/);
  if (match) {
    matches.push(`${file}: ${match[0]}`);
  }
}

console.log(matches.slice(0, 20).join('\n'));
