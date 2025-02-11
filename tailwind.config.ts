import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'garden-bg': 'rgb(220, 207, 207)',
      },
    },
  },
  plugins: [],
}

export default config
