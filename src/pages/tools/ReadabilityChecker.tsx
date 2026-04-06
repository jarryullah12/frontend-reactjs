import { SEO } from '../../components/SEO';
import React, { useState } from 'react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function ReadabilityChecker() {
  const [text, setText] = useState('');

  const analyzeText = () => {
    if (!text.trim()) return null;
    
    const words = text.trim().split(/\s+/).length;
    const sentences = text.split(/[\.!?]+/).filter(s => s.trim().length > 0).length || 1;
    const characters = text.replace(/[^a-zA-Z]/g, '').length;
    
    // Simple estimation of syllables
    const syllables = Math.max(1, Math.round(characters / 3));
    
    // Flesch Reading Ease formula
    const readingEase = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
    
    let grade = 'College';
    if (readingEase > 90) grade = '5th Grade';
    else if (readingEase > 80) grade = '6th Grade';
    else if (readingEase > 70) grade = '7th Grade';
    else if (readingEase > 60) grade = '8th & 9th Grade';
    else if (readingEase > 50) grade = '10th to 12th Grade';
    else if (readingEase > 30) grade = 'College';
    else grade = 'College Graduate';

    return {
      words,
      sentences,
      readingEase: Math.max(0, Math.min(100, Math.round(readingEase))),
      grade
    };
  };

  const stats = analyzeText();

  return (
    <>
      <SEO title="Readability Checker - OptiSEO Tools" description="Check the readability score of your text." />
      <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Readability Checker</h1>
          <p className="text-gray-600 dark:text-gray-400">Check the readability score of your text.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <textarea
            className="w-full h-64 p-4 mb-6 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent resize-none"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-[#4f39f6]">{stats.words}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-[#4f39f6]">{stats.sentences}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Sentences</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-[#4f39f6]">{stats.readingEase}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Reading Ease (0-100)</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
                <div className="text-lg font-bold text-[#4f39f6] flex items-center justify-center h-8">{stats.grade}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Level</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToolDescription points={toolDescriptions['readability-checker']} />
    </div>
    </>
  );
}
