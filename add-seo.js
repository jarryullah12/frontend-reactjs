import fs from 'fs';
import path from 'path';

const toolsDir = path.join(process.cwd(), 'src/pages/tools');
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(toolsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes('import { SEO }')) continue;

  // Extract text from h1, removing any tags inside
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const pMatch = content.match(/<p[^>]*>([\s\S]*?)<\/p>/);

  if (h1Match && pMatch) {
    let title = h1Match[1].replace(/<[^>]+>/g, '').trim();
    let desc = pMatch[1].replace(/<[^>]+>/g, '').trim();

    // If title has {t('...')} we can't easily extract it, but let's just use a generic title or keep it if it's plain text.
    if (title.includes('{t(')) {
       // Extract the key or just use a generic one
       title = file.replace('.tsx', '').replace(/([A-Z])/g, ' $1').trim();
    }
    if (desc.includes('{t(')) {
       desc = `Use our free ${title} tool to optimize your website.`;
    }

    // Add import
    if (content.includes("import React")) {
      content = content.replace("import React", "import { SEO } from '../../components/SEO';\nimport React");
    } else if (content.includes("import {")) {
      content = content.replace("import {", "import { SEO } from '../../components/SEO';\nimport {");
    } else {
      content = "import { SEO } from '../../components/SEO';\n" + content;
    }

    // Wrap return
    content = content.replace(/return\s*\(\s*<div/, `return (\n    <>\n      <SEO title="${title} - OptiSEO Tools" description="${desc}" />\n      <div`);
    
    // Replace the last </div>\n  );\n}
    content = content.replace(/<\/div>\s*\);\s*}\s*$/, `</div>\n    </>\n  );\n}\n`);

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
