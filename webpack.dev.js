const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { DefinePlugin } = require('webpack')
const dotenv = require('dotenv').config()
const path = require('path')

// excuse the massive amount of comments, im just trying to remember what this config file is doing :<

module.exports = {
	// same as using webpack --mode development
	mode: 'development',
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
					// extracts css into separate files
					MiniCssExtractPlugin.loader,
					// style-loader not compatible with mini-css-extract
					// 'style-loader',
					// load the css
					'css-loader',
					// compile sass to css
					'sass-loader'
				]
			}
		]
	},

	devtool: 'eval-cheap-source-map',

	// where webpack will output javascript bundle
	output: {
		path: path.resolve(__dirname, 'dist', 'frontend'),
		// [name] is replaced with entry name (main)
		// [contenthash] is generated based on the files
		// contents, which makes it good for cache busting
		filename: 'js/[name].[contenthash].bundle.js',
		// cleans the output directory before outputting files
		clean: true
	},
	plugins: [
		// copies index.html to output and automatically inserts the bundled javascript
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'frontend', 'public', 'index.html'),
			filename: 'index.html',

			// fixes injected js not being loaded when navigating to nested route
			publicPath: '/'
		}),
		new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash].css'
		}),

		// using copy-webpack-plugin to copy files from /public, similar to how CRA works
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'src/frontend/public',
					globOptions: {
						// ignore index.html because html-webpack-plugin already handles that
						ignore: ['**/index.html']
					}
				}
			]
		}),

		// allows use of environment variables on frontend so long as the variable is prefixed with PUBLIC_
		new DefinePlugin({
			"process.env": Object.keys(dotenv.parsed).filter(env => env.startsWith('PUBLIC_')).reduce((prev, curr) => ({
				...prev,
				[curr]: JSON.stringify(dotenv.parsed[curr])
			}), {})
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

		// needed to fix client-side routing, since express server will try to handle requests
		historyApiFallback: true,

		// proxy api requests to backend server during development (since webpack-dev-server runs on different port)
		proxy: {
			'/api': {
				target: 'http://localhost:7000'
			}
		}
	}
}
