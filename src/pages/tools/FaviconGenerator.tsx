import { SEO } from '../../components/SEO';
import React, { useState, useRef } from 'react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function FaviconGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [favicon, setFavicon] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setFavicon(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateFavicon = () => {
    if (!image || !canvasRef.current) return;
    
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = 32;
      canvas.height = 32;
      ctx.drawImage(img, 0, 0, 32, 32);
      
      const generated = canvas.toDataURL('image/png');
      setFavicon(generated);
    };
  };

  return (
    <>
      <SEO title="Favicon Generator - OptiSEO Tools" description="Generate a 32x32 favicon from any image." />
      <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Favicon Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate a 32x32 favicon from any image.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Image (Square recommended)</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4f39f6]/10 file:text-[#4f39f6] hover:file:bg-[#4f39f6]/20" />
          </div>
          
          {image && (
            <div className="mb-6">
              <button 
                onClick={generateFavicon}
                className="px-6 py-2 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 rounded-lg transition-colors"
              >
                Generate Favicon
              </button>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

          {favicon && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Generated Favicon</h3>
              <div className="p-8 bg-gray-100 dark:bg-gray-800 rounded-lg inline-block mb-4">
                <img src={favicon} alt="Generated Favicon Preview" className="w-8 h-8" loading="lazy" width="32" height="32" />
              </div>
              <br />
              <a 
                href={favicon} 
                download="favicon.png"
                className="inline-block px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                Download favicon.png
              </a>
            </div>
          )}
        </div>
      </div>
      <ToolDescription points={toolDescriptions['favicon-generator']} />
    </div>
    </>
  );
}
