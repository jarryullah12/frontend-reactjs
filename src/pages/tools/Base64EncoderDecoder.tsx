import { SEO } from '../../components/SEO';
import React, { useState } from 'react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

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
    <>
      <SEO title="Base64 Encoder/Decoder - OptiSEO Tools" description="Encode or decode text to Base64 format." />
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
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${mode === 'encode' ? 'bg-[#4f39f6] text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'}`}
            >
              Encode
            </button>
            <button 
              onClick={() => { setMode('decode'); setOutput(''); setError(''); }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${mode === 'decode' ? 'bg-[#4f39f6] text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'}`}
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
        <ToolDescription points={toolDescriptions['base64-encoder-decoder']} />
      </div>
    </div>
    </>
  );
}
