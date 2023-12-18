/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['DM Sans', 'sans-serif'],
				display: ['Rebond Grotesque', 'sans-serif'],
			},
			colors: {
				brandYellow: {
					20: '#FFF8CC',
					40: '#FFF199',
					60: '#FFEA66',
					80: '#FFE333',
					100: '#FFDC00',
				},
				brandMagenta: {
					20: '#FFCCED',
					40: '#FF99DB',
					60: '#FF66C9',
					80: '#FF33B7',
					100: '#FF00A5',
				},
				brandRose: {
					20: '#FFF2F2',
					40: '#FFE6E5',
					60: '#FFD9D8',
					80: '#FFCDCB',
					100: '#FFC0BE',
				},
				brandTeal: {
					20: '#CCF5F0',
					40: '#99EAE1',
					60: '#66E0D2',
					80: '#33D5C3',
					100: '#00CBB4',
				},
				brandCream: {
					20: '#FCFBF9',
					40: '#F9F7F3',
					60: '#F6F3EC',
					80: '#F3EFE6',
					100: '#F0EBE0',
				},
				brandMint: {
					20: '#F8FCF4',
					40: '#F2F9E9',
					60: '#EBF6DE',
					80: '#E5F3D3',
					100: '#DEF0C8',
				},
				brandDarkGreen: {
					20: '#CFD7D8',
					40: '#A0AFB2',
					60: '#70868B',
					80: '#415E65',
					100: '#11363E',
				},
				brandBurgundy: {
					20: '#DDD0D7',
					40: '#BBA2AF',
					60: '#9A7386',
					80: '#78455E',
					100: '#561636',
				},
				darkText: {
					10: '#082227',
					20: '#11363E',
					30: '#082227',
				},
				lightText: {
					10: '#C0C0C0',
					20: '#E4E4E4',
					30: '#FFFFFF',
				},
				buttonRed: {
					default: '#AD015A',
					hover: '#8C014A',
				},
			},
			backgroundImage: {
				ribbonOne: "url('/images/bgs/ribbonOne.svg')",
			},
			keyframes: {
				leftToRight: {
					'0%': {
						transform: 'translateX(0%)',
					},
					'100%': {
						transform: 'translateX(-50%)',
					},
				},
			},
			animation: {
				scrollingText: 'leftToRight 10s linear infinite',
			},
			screens: {
				'3xl': '1920px',
				'4xl': '2360px',
			},
		},
	},
	plugins: [],
};
