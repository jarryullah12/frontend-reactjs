const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'src', 'pages', 'tools');
const files = fs.readdirSync(toolsDir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(toolsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the object array with string array
    content = content.replace(
      /\|\|\s*\[\s*\{\s*title:\s*'What is this tool\?',\s*description:\s*'(.*?)'\s*\},[\s\S]*?\]/g,
      "|| [\n          'What is this tool? $1',\n          'How to use it? Simply enter your input and click Process.',\n          'Why use it? It helps optimize your SEO workflow.'\n        ]"
    );
    
    fs.writeFileSync(filePath, content);
  }
});

console.log('Fixed ToolDescription props in all tools');
