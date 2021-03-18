const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	entry: path.resolve(__dirname, 'src', 'frontend', 'index.jsx'),
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(css|scss|sass)$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist', 'frontend'),
		filename: '[name].[contenthash].bundle.js',
		clean: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'frontend', 'public', 'index.html'),
			filename: 'index.html'
		})
	],
	resolve: {
		extensions: ['.js', '.jsx']
	}
}
