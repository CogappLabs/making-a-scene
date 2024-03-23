import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        grey: '#919294',
        orange: '#ff752a',
        yellow: '#ffbf00',
        green: '#00dbb2',
        blue: '#05aafc',
        magenta: '#e034ce',
        red: '#f23432',
      },
    },
  },
  plugins: [],
};
export default config;
