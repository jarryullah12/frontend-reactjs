/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: '#334155', // slate-700
            a: {
              color: '#2563eb', // blue-600
              '&:hover': {
                color: '#1d4ed8',
              },
            },
          },
        },
        invert: {
          css: {
            color: '#f8fafc', // slate-50 (effectively white)
            '--tw-prose-body': '#f8fafc',
            '--tw-prose-headings': '#ffffff',
            '--tw-prose-links': '#60a5fa',
            '--tw-prose-bold': '#ffffff',
            '--tw-prose-counters': '#94a3b8',
            '--tw-prose-bullets': '#475569',
            '--tw-prose-hr': '#334155',
            '--tw-prose-quotes': '#f1f5f9',
            '--tw-prose-quote-borders': '#334155',
            '--tw-prose-captions': '#94a3b8',
            '--tw-prose-code': '#ffffff',
            '--tw-prose-pre-code': '#f8fafc',
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-th-borders': '#475569',
            '--tw-prose-td-borders': '#334155',
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
