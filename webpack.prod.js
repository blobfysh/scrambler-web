const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
	mode: 'production',
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
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist', 'frontend'),
		filename: 'js/[name].[contenthash].bundle.js',
		clean: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'frontend', 'public', 'index.html'),
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash].css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'src/frontend/public',
					globOptions: {
						ignore: ['**/index.html']
					}
				}
			]
		})
	],
	optimization: {
		minimize: true,
		minimizer: [
			// ... will extend existing minimizers (needed since TerserPlugin is included with webpack 5)
			'...',

			// plugin to minimize css
			new CssMinimizerPlugin()
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
}
