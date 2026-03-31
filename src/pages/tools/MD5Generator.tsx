import { SEO } from '../../components/SEO';
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function MD5Generator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const generateMD5 = () => {
    if (!input) {
      setOutput('');
      return;
    }
    const hash = CryptoJS.MD5(input).toString();
    setOutput(hash);
  };

  return (
    <>
      <SEO title="MD5 Generator - OptiSEO Tools" description="Generate MD5 hash for any text." />
      <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">MD5 Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate MD5 hash for any text.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input Text</label>
            <textarea
              className="w-full h-32 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent resize-none"
              placeholder="Enter text to hash..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-center mb-4">
            <button 
              onClick={generateMD5}
              className="px-6 py-2 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 rounded-lg transition-colors"
            >
              Generate MD5
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">MD5 Hash</label>
            <input
              type="text"
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
              readOnly
              value={output}
            />
          </div>
        </div>
      </div>
      <ToolDescription points={toolDescriptions['md5-generator']} />
    </div>
    </>
  );
}
