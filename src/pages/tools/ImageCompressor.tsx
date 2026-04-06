import { SEO } from '../../components/SEO';
import React, { useState, useRef } from 'react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function ImageCompressor() {
  const [image, setImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setCompressedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = () => {
    if (!image || !canvasRef.current) return;
    
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const compressed = canvas.toDataURL('image/jpeg', quality);
      setCompressedImage(compressed);
    };
  };

  return (
    <>
      <SEO title="Image Compressor - OptiSEO Tools" description="Compress images without losing quality." />
      <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Image Compressor</h1>
          <p className="text-gray-600 dark:text-gray-400">Compress images without losing quality.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4f39f6]/10 file:text-[#4f39f6] hover:file:bg-[#4f39f6]/20" />
          </div>
          
          {image && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Compression Quality: {Math.round(quality * 100)}%</label>
              <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="w-full" />
              <button 
                onClick={compressImage}
                className="mt-4 px-6 py-2 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 rounded-lg transition-colors"
              >
                Compress Image
              </button>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

          {compressedImage && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Compressed Image</h3>
              <img src={compressedImage} alt="Compressed Image Preview" loading="lazy" className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700 mb-4" />
              <a 
                href={compressedImage} 
                download="compressed_image.jpg"
                className="inline-block px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                Download Image
              </a>
            </div>
          )}
        </div>
      </div>
      <ToolDescription points={toolDescriptions['image-compressor']} />
    </div>
    </>
  );
}
