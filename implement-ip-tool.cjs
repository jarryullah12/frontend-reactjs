const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'src', 'pages', 'tools');

const implementations = {
  'WhatIsMyIP.tsx': `import React, { useState, useEffect } from 'react';
import { Globe, Copy, CheckCircle2 } from 'lucide-react';

export function WhatIsMyIP() {
  const [ipData, setIpData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchIP();
  }, []);

  const fetchIP = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('Failed to fetch IP data');
      const data = await response.json();
      setIpData(data);
    } catch (err: any) {
      setError('Could not retrieve IP address information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (ipData?.ip) {
      navigator.clipboard.writeText(ipData.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Is My IP</h1>
          <p className="text-gray-600 dark:text-gray-400">Find out your public IP address and location details.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4f39f6] mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">Detecting your IP address...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={fetchIP}
                className="px-4 py-2 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : ipData ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4f39f6]/10 text-[#4f39f6] mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Your Public IP Address</h2>
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">{ipData.ip}</span>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 text-gray-400 hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors"
                  title="Copy IP"
                >
                  {copied ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6" />}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left border-t border-gray-100 dark:border-gray-800 pt-8">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">City</div>
                  <div className="font-medium text-gray-900 dark:text-white">{ipData.city || 'N/A'}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Region</div>
                  <div className="font-medium text-gray-900 dark:text-white">{ipData.region || 'N/A'}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Country</div>
                  <div className="font-medium text-gray-900 dark:text-white">{ipData.country_name || 'N/A'}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">ISP</div>
                  <div className="font-medium text-gray-900 dark:text-white truncate" title={ipData.org}>{ipData.org || 'N/A'}</div>
                </div>
              </div>
            </div>
          ) : null}
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

console.log('Implemented IP tool');
