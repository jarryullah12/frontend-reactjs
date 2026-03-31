import { SEO } from '../../components/SEO';
import React, { useState } from 'react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function WordCounter() {
  const [text, setText] = useState('');

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;
  const paragraphCount = text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;

  return (
    <>
      <SEO title="Word Counter - OptiSEO Tools" description="Count words, characters, and paragraphs in your text." />
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
      <ToolDescription points={toolDescriptions['word-counter']} />
    </div>
    </>
  );
}
