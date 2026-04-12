const fs = require('fs');
const path = require('path');

// 1. Update Header.tsx to say "102 Tools"
const headerPath = path.join(__dirname, 'src', 'components', 'layout', 'Header.tsx');
let header = fs.readFileSync(headerPath, 'utf8');
header = header.replace(/\{t\('nav\.tools'\)\}/g, '102 Tools');
fs.writeFileSync(headerPath, header);

// 2. Update Pricing.tsx to say "50 Free SEO Tools" and "52 Premium SEO Tools"
const pricingPath = path.join(__dirname, 'src', 'pages', 'Pricing.tsx');
let pricing = fs.readFileSync(pricingPath, 'utf8');
pricing = pricing.replace(/50 Essential SEO Tools/g, '50 Free SEO Tools');
pricing = pricing.replace(/100\+ Advanced SEO Tools/g, '52 Premium SEO Tools');
fs.writeFileSync(pricingPath, pricing);

// 3. Update all tools to have 10 points
const toolsDir = path.join(__dirname, 'src', 'pages', 'tools');
const files = fs.readdirSync(toolsDir);

const tenPoints = `[
          'What is this tool? It is a powerful SEO utility designed to optimize your workflow.',
          'How to use it? Simply enter your input and click Process.',
          'Why use it? It helps improve your website ranking and visibility.',
          'Is it free to use? Yes, depending on your subscription plan.',
          'How accurate are the results? We use advanced algorithms and AI to ensure high accuracy.',
          'Do I need to install anything? No, this is a completely web-based tool.',
          'Is my data secure? Yes, we do not store your input data after processing.',
          'Can I export the results? Yes, you can copy or export the results easily.',
          'Who is this tool for? SEO professionals, marketers, and website owners.',
          'How often should I use it? As often as needed for your daily SEO tasks.'
        ]`;

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(toolsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the 3 points with 10 points
    content = content.replace(
      /\|\|\s*\[\s*'What is this tool\?[^\]]*\]/g,
      `|| ${tenPoints}`
    );
    
    fs.writeFileSync(filePath, content);
  }
});

console.log('Successfully updated Header, Pricing, and Tool descriptions');
