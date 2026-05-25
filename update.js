const fs = require('fs');
let file = fs.readFileSync('components/TemplateRenderer.tsx', 'utf8');

// The regex will look for data.skills.length > 0 block and add languages below it.
// Too risky with regex, I'll do it manually.
