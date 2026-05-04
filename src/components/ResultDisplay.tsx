import React, { useState } from 'react';
import { Copy, CheckCircle2, Download } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

interface ResultDisplayProps {
  result: string | any;
  title?: string;
  hideCard?: boolean;
}

export function ResultDisplay({ result, title = "Results", hideCard = false }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const textToDownload = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'result.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (hideCard) {
    return (
      <div className="w-full">
        {typeof result === 'string' ? (
          <div className="prose prose-indigo dark:prose-invert max-w-none">
            <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>{result}</Markdown>
          </div>
        ) : (
          <pre className="p-4 bg-gray-50 dark:bg-gray-950 rounded-xl overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors shadow-sm"
            title="Copy to clipboard"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleDownload}
            className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors shadow-sm"
            title="Download result"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {typeof result === 'string' ? (
          <div className="prose prose-indigo dark:prose-invert max-w-none">
            <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>{result}</Markdown>
          </div>
        ) : (
          <pre className="p-4 bg-gray-50 dark:bg-gray-950 rounded-xl overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
