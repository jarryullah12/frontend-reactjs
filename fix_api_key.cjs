const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'src', 'pages', 'tools');

fs.readdirSync(toolsDir).forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(toolsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('import.meta.env.VITE_GEMINI_API_KEY')) {
      content = content.replace(/import\.meta\.env\.VITE_GEMINI_API_KEY/g, 'process.env.GEMINI_API_KEY');
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  }
});
