const disposableDomains = require('disposable-email-domains');
console.log('Is array?', Array.isArray(disposableDomains));
console.log('Includes tempmail.co?', disposableDomains.includes('tempmail.co'));
console.log('Includes yopmail.com?', disposableDomains.includes('yopmail.com'));
