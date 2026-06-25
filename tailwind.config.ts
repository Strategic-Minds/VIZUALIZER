import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'xps-yellow': '#F5C518',
        'xps-black': '#1A1A1A',
        'xps-blue': '#0056A6',
      },
      fontFamily: {
        sans: ['Inter','system-ui','sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
