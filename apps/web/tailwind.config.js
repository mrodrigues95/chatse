const { createGlobPatternsForDependencies } = require('@nx/next/tailwind.js');
const defaultTheme = require('tailwindcss/defaultTheme');
const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
	presets: [require('../../tailwind-workspace-preset.js')],
	content: [
		path.join(
			__dirname,
			'{src,app}/**/*!(*.stories|*.spec).{js,jsx,ts,tsx,html,css}',
		),
		...createGlobPatternsForDependencies(__dirname),
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
