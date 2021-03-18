const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

// excuse the massive amount of comments, im just trying to remember what this config file is doing :<

module.exports = {
	// where webpack starts building bundle
	entry: path.resolve(__dirname, 'src', 'frontend', 'index.jsx'),
	module: {
		rules: [
			// use babel to transpile javascript
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
				// presets not required here because I use .babelrc and babel-loader will use that
				// presets: ['@babel/preset-env','@babel/preset-react']
			},
			// injects css and sass files
			{
				test: /\.(css|scss|sass)$/,
				use: [
					// idk style-loader was advised to use with css-loader
					'style-loader',
					// load the css
					'css-loader',
					// compile sass to css
					'sass-loader'
				]
			}
		]
	},

	// where webpack will output javascript bundle
	output: {
		path: path.resolve(__dirname, 'dist', 'frontend'),
		// [name] is replaced with entry name (main)
		// [contenthash] is generated based on the files
		// contents, which makes it good for cache busting
		filename: '[name].[contenthash].bundle.js',
		// cleans the output directory before outputting files
		clean: true
	},
	plugins: [
		// copies index.html to output and automatically inserts the bundled javascript
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'frontend', 'public', 'index.html'),
			filename: 'index.html'
		})
	],

	// needed to fix auto reloading until webpack-dev-server fix is released (https://github.com/webpack/webpack-dev-server/issues/2758)
	target: 'web',

	// when importing files without an extension, webpack will look for files with these extensions
	// ex. if I do "import App from './App'" without the jsx extension, webpack will know to import App.jsx
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist', 'frontend'),

		// proxy api requests to backend server during development (since webpack-dev-server runs on different port)
		proxy: {
			'/api': {
				target: 'http://localhost:7000'
			}
		}
	}
}
