import React from 'react';

interface ToolDescriptionProps {
  points: string[];
}

export function ToolDescription({ points }: ToolDescriptionProps) {
  return (
    <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">About this Tool</h2>
      <ul className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-400">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
