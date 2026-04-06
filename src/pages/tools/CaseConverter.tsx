import { SEO } from '../../components/SEO';
import React, { useState } from 'react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function CaseConverter() {
  const [text, setText] = useState('');

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const toTitleCase = () => {
    setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
  };
  const toSentenceCase = () => {
    setText(text.toLowerCase().replace(/(^\s*\w|[\.!?]\s*\w)/g, (c) => c.toUpperCase()));
  };

  return (
    <>
      <SEO title="Case Converter - OptiSEO Tools" description="Convert text to uppercase, lowercase, title case, and sentence case." />
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
        <ToolDescription points={toolDescriptions['case-converter']} />
      </div>
    </div>
    </>
  );
}
