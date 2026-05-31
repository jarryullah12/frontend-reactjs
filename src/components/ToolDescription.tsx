import React from 'react';

interface ToolDescriptionProps {
  points?: any; // Accepting any because it might be an array or an EnhancedToolDescription
  enhancedDetails?: any;
  title?: string;
}

export function ToolDescription({ points, enhancedDetails, title }: ToolDescriptionProps) {
  // If points is passed but it's an object instead of an array (because of our recent data layout shift)
  const data = enhancedDetails || (!Array.isArray(points) ? points : null);

  if (data && data.whatItDoes) {
    return (
      <div className="mt-16 bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl p-8 lg:p-10 rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-xl dark:shadow-2xl dark:shadow-black/40 space-y-8 animate-in fade-in duration-700 relative z-10">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">What Does This Tool Do?</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{data.whatItDoes}</p>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Who Is It For?</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{data.whoIsItFor}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">What Are the Benefits?</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{data.benefits}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">A Simple Example</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{data.example}</p>
        </div>
      </div>
    );
  }

  // Dynamic Content Generation from 10 points arrays (legacy fallback if strictly passed an array)
  if (Array.isArray(points) && points.length >= 5) {
    const cleanPoint = (str: string) => {
      if (!str) return '';
      const parts = str.split('?');
      return (parts.length > 1 ? parts.slice(1).join('?') : str).trim();
    };

    const p0 = cleanPoint(points[0]);
    const p1 = cleanPoint(points[1]);
    const p2 = cleanPoint(points[2]);
    const p3 = cleanPoint(points[3]);
    const p4 = cleanPoint(points[4]);
    const p6 = cleanPoint(points[6]);
    const p7 = cleanPoint(points[7]);
    const p8 = cleanPoint(points[8]);
    const p9 = cleanPoint(points[9]);

    const whatItDoes = `${p0 || 'This tool provides essential functions specifically designed for web optimization.'} ${p2 ? 'Additionally, ' + p2.charAt(0).toLowerCase() + p2.slice(1) : ''} In addition to its core functions, it ${p4?.toLowerCase() || 'streamlines your workflow'} and provides comprehensive features to meet your requirements. This powerful utility is specifically designed to ensure you get the best possible output with minimal effort, making your tasks significantly easier.`;
    
    // Who is it for
    const whoForBase = p8 || 'ideal for professionals and beginners alike';
    const whoIsItFor = `This tool is ${whoForBase.toLowerCase()}. Whether you are a digital marketer, SEO professional, web developer, or a forward-thinking business owner, this application is exceptionally useful for optimizing your daily workflow and achieving targets. It caters specifically to users seeking to improve their digital presence and productivity without requiring deep technical knowledge.`;
    
    // Benefits
    const benefits = `${p1 || 'It helps increase visibility and efficiency.'} ${p3 || 'You can easily integrate it into your regular tasks.'} Furthermore, it ${p6?.toLowerCase() || 'provides fast and reliable results'} and ${p7?.toLowerCase() || 'ensures high data accuracy'}. Ultimately, it is ${p9?.toLowerCase() || 'incredibly easy to use and saves you valuable time'}, ensuring better overall performance for your projects. Regular use of this tool guarantees long-term digital growth.`;
    
    // Example
    const example = `For example, simply input your required data, URL, or parameters into the provided fields above. Once you click the processing or action button, the tool will instantly connect to the servers, process your request in real-time, and generate the exact optimized output you need. You can then review the results and apply them directly to your active campaigns or website structure.`;

    return (
      <div className="mt-16 bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl p-8 lg:p-10 rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-xl dark:shadow-2xl dark:shadow-black/40 space-y-8 animate-in fade-in duration-700 relative z-10">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">What Does This Tool Do?</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{whatItDoes}</p>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Who Is It For?</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{whoIsItFor}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">What Are the Benefits?</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{benefits}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">A Simple Example</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{example}</p>
        </div>
      </div>
    );
  }

  // Final fallback (Bullet points)
  return (
    <div className="mt-16 bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl p-8 lg:p-10 rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-xl dark:shadow-2xl dark:shadow-black/40 relative z-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">About this Tool</h2>
      <ul className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-400 text-lg">
        {Array.isArray(points) && points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
