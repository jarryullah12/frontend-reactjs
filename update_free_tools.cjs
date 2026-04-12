const fs = require('fs');
const path = require('path');

const toolsTsxPath = path.join(__dirname, 'src', 'pages', 'Tools.tsx');
const toolsTsx = fs.readFileSync(toolsTsxPath, 'utf8');

// Extract all tool IDs that have a 'category' property (this excludes the category definitions)
const toolRegex = /\{ id: '([^']+)', name: [^,]+, category: '[^']+'/g;
let match;
const toolIds = [];
const toolNames = [];

// Also extract names for Pricing.tsx
const nameRegex = /\{ id: '([^']+)', name: (?:t\('[^']+'\)|'([^']+)')/g;
const idToName = {};

while ((match = toolRegex.exec(toolsTsx)) !== null) {
  toolIds.push(match[1]);
}

// Let's just get the first 50 tool IDs
const freeToolIds = toolIds.slice(0, 50);

// Update ProtectedToolRoute.tsx
const protectedRoutePath = path.join(__dirname, 'src', 'components', 'layout', 'ProtectedToolRoute.tsx');
let protectedRoute = fs.readFileSync(protectedRoutePath, 'utf8');
const freeTrialToolsArray = freeToolIds.map(id => `  '/tools/${id}'`).join(',\n');
protectedRoute = protectedRoute.replace(
  /const FREE_TRIAL_TOOLS = \[[^\]]*\];/,
  `const FREE_TRIAL_TOOLS = [\n${freeTrialToolsArray}\n];`
);
fs.writeFileSync(protectedRoutePath, protectedRoute);

// Update Tools.tsx FREE_TRIAL_TOOLS
let updatedToolsTsx = toolsTsx;
const toolsFreeTrialArray = freeToolIds.map(id => `    '${id}'`).join(',\n');
updatedToolsTsx = updatedToolsTsx.replace(
  /const FREE_TRIAL_TOOLS = \[[^\]]*\];/,
  `const FREE_TRIAL_TOOLS = [\n${toolsFreeTrialArray}\n  ];`
);
fs.writeFileSync(toolsTsxPath, updatedToolsTsx);

// Update Pricing.tsx
const pricingPath = path.join(__dirname, 'src', 'pages', 'Pricing.tsx');
let pricing = fs.readFileSync(pricingPath, 'utf8');

// We need to replace the array inside Pricing.tsx
// Let's extract the names of all tools from Tools.tsx to build the Pricing array
const allToolsForPricing = [];
const fullToolRegex = /\{ id: '([^']+)', name: (t\('[^']+'\)|'[^']+')/g;
while ((match = fullToolRegex.exec(toolsTsx)) !== null) {
  const id = match[1];
  if (toolIds.includes(id)) {
    const name = match[2].startsWith('t(') ? match[2] : match[2];
    const isFree = freeToolIds.includes(id);
    allToolsForPricing.push(`              { name: ${name}, type: '${isFree ? 'Free' : 'Premium'}' }`);
  }
}

const pricingArrayStr = `[\n${allToolsForPricing.join(',\n')}\n            ]`;

pricing = pricing.replace(
  /\[\s*\{\s*name:\s*[^,]+,\s*type:\s*'[^']+'\s*\}.*?\]/s,
  pricingArrayStr
);

fs.writeFileSync(pricingPath, pricing);

console.log('Successfully updated 50 free tools in ProtectedToolRoute.tsx, Tools.tsx, and Pricing.tsx');
