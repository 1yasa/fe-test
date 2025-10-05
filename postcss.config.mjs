/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: {
		'postcss-import': {},
		'postcss-nested': {},
		'@tailwindcss/postcss': {},
		autoprefixer: {}
	}
}

export default config
