import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#000000',
        grey: '#919294',
        'agility-orange': '#ff752a',
        'curiosity-yellow': '#ffbf00',
        'generosity-green': '#00dbb2',
        'honesty-blue': '#05aafc',
        'imagination-magenta': '#e034ce',
        'inspiration-red': '#f23432',
        'vibrancy-blue': '#5e5ffe',
      },
    },
  },
  plugins: [],
};
export default config;
