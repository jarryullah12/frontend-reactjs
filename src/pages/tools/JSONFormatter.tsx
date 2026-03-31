import { SEO } from '../../components/SEO';
import React, { useState } from 'react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

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
    <>
      <SEO title="JSON Formatter - OptiSEO Tools" description="Format, validate, and minify JSON data." />
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
      <ToolDescription points={toolDescriptions['json-formatter']} />
    </div>
    </>
  );
}
