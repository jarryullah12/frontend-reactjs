import { SEO } from '../../components/SEO';
import React, { useState } from 'react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function HTMLMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const minifyHTML = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }
    
    let minified = input
      .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/>\s+</g, '><') // Remove space between tags
      .trim();
      
    setOutput(minified);
  };

  return (
    <>
      <SEO title="HTML Minifier - OptiSEO Tools" description="Minify HTML code to reduce file size." />
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
      <ToolDescription points={toolDescriptions['html-minifier']} />
    </div>
    </>
  );
}
