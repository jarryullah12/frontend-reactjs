const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'src', 'pages', 'tools');

const implementations = {
  'WordCounter.tsx': `import React, { useState } from 'react';

export function WordCounter() {
  const [text, setText] = useState('');

  const wordCount = text.trim() ? text.trim().split(/\\s+/).length : 0;
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\\s/g, '').length;
  const paragraphCount = text.trim() ? text.split(/\\n+/).filter(p => p.trim().length > 0).length : 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Word Counter</h1>
          <p className="text-gray-600 dark:text-gray-400">Count words, characters, and paragraphs in your text.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-[#4f39f6]">{wordCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-[#4f39f6]">{charCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-[#4f39f6]">{charCountNoSpaces}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Without Spaces</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-[#4f39f6]">{paragraphCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Paragraphs</div>
            </div>
          </div>
          <textarea
            className="w-full h-64 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent resize-none"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="mt-4 flex justify-end">
            <button 
              onClick={() => setText('')}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Clear Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'CharacterCounter.tsx': `import React, { useState } from 'react';

export function CharacterCounter() {
  const [text, setText] = useState('');

  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\\s/g, '').length;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Character Counter</h1>
          <p className="text-gray-600 dark:text-gray-400">Count characters with and without spaces.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-[#4f39f6]">{charCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Characters</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-[#4f39f6]">{charCountNoSpaces}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Characters (No Spaces)</div>
            </div>
          </div>
          <textarea
            className="w-full h-64 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent resize-none"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="mt-4 flex justify-end">
            <button 
              onClick={() => setText('')}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Clear Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'CaseConverter.tsx': `import React, { useState } from 'react';

export function CaseConverter() {
  const [text, setText] = useState('');

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const toTitleCase = () => {
    setText(text.replace(/\\w\\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
  };
  const toSentenceCase = () => {
    setText(text.toLowerCase().replace(/(^\\s*\\w|[\\.!?]\\s*\\w)/g, (c) => c.toUpperCase()));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Case Converter</h1>
          <p className="text-gray-600 dark:text-gray-400">Convert text to uppercase, lowercase, title case, and sentence case.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <textarea
            className="w-full h-64 p-4 mb-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent resize-none"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="flex flex-wrap gap-3">
            <button onClick={toUpperCase} className="px-4 py-2 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 rounded-lg transition-colors">UPPERCASE</button>
            <button onClick={toLowerCase} className="px-4 py-2 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 rounded-lg transition-colors">lowercase</button>
            <button onClick={toTitleCase} className="px-4 py-2 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 rounded-lg transition-colors">Title Case</button>
            <button onClick={toSentenceCase} className="px-4 py-2 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 rounded-lg transition-colors">Sentence case</button>
            <button onClick={() => setText('')} className="ml-auto px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors">Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'Base64EncoderDecoder.tsx': `import React, { useState } from 'react';

export function Base64EncoderDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const handleProcess = () => {
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (err) {
      setError('Invalid input for Base64 decoding.');
      setOutput('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Base64 Encoder/Decoder</h1>
          <p className="text-gray-600 dark:text-gray-400">Encode or decode text to Base64 format.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex gap-4 mb-4">
            <button 
              onClick={() => { setMode('encode'); setOutput(''); setError(''); }}
              className={\`px-4 py-2 text-sm font-medium rounded-lg transition-colors \${mode === 'encode' ? 'bg-[#4f39f6] text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'}\`}
            >
              Encode
            </button>
            <button 
              onClick={() => { setMode('decode'); setOutput(''); setError(''); }}
              className={\`px-4 py-2 text-sm font-medium rounded-lg transition-colors \${mode === 'decode' ? 'bg-[#4f39f6] text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'}\`}
            >
              Decode
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input Text</label>
            <textarea
              className="w-full h-32 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent resize-none"
              placeholder={mode === 'encode' ? "Enter text to encode..." : "Enter Base64 to decode..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-center mb-4">
            <button 
              onClick={handleProcess}
              className="px-6 py-2 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 rounded-lg transition-colors"
            >
              {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
            <textarea
              className="w-full h-32 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              readOnly
              value={output}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'JSONFormatter.tsx': `import React, { useState } from 'react';

export function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJSON = () => {
    setError('');
    if (!input.trim()) {
      setOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (err: any) {
      setError('Invalid JSON: ' + err.message);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    setError('');
    if (!input.trim()) {
      setOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (err: any) {
      setError('Invalid JSON: ' + err.message);
      setOutput('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">JSON Formatter</h1>
          <p className="text-gray-600 dark:text-gray-400">Format, validate, and minify JSON data.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input JSON</label>
              <textarea
                className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent resize-none font-mono text-sm"
                placeholder="Paste your JSON here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
              <textarea
                className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none font-mono text-sm"
                readOnly
                value={output}
              ></textarea>
            </div>
          </div>
          
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <div className="mt-6 flex flex-wrap gap-3">
            <button 
              onClick={formatJSON}
              className="px-4 py-2 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 rounded-lg transition-colors"
            >
              Format JSON
            </button>
            <button 
              onClick={minifyJSON}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Minify JSON
            </button>
            <button 
              onClick={() => { setInput(''); setOutput(''); setError(''); }}
              className="ml-auto px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'HTMLMinifier.tsx': `import React, { useState } from 'react';

export function HTMLMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const minifyHTML = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }
    
    let minified = input
      .replace(/<!--[\\s\\S]*?-->/g, '') // Remove comments
      .replace(/\\s+/g, ' ') // Collapse whitespace
      .replace(/>\\s+</g, '><') // Remove space between tags
      .trim();
      
    setOutput(minified);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">HTML Minifier</h1>
          <p className="text-gray-600 dark:text-gray-400">Minify HTML code to reduce file size.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input HTML</label>
              <textarea
                className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent resize-none font-mono text-sm"
                placeholder="Paste your HTML here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minified HTML</label>
              <textarea
                className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none font-mono text-sm"
                readOnly
                value={output}
              ></textarea>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <button 
              onClick={minifyHTML}
              className="px-4 py-2 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 rounded-lg transition-colors"
            >
              Minify HTML
            </button>
            <button 
              onClick={() => { setInput(''); setOutput(''); }}
              className="ml-auto px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
`
};

Object.entries(implementations).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(toolsDir, filename), content);
});

console.log('Implemented basic tools');
