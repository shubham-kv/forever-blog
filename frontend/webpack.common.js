const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	resolve: {
		modules: [__dirname, 'src', 'node_modules'],
		mainFiles: ['index'],
		extensions: ['*', '.js', '.jsx', 'json'],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src'),
				use: ['babel-loader']
			},
			{
				test: /\.png|svg|jpg|gif$/,
				use: ['file-loader'],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Production',
			template: './public/index.html',
			favicon: './public/assets/svgs/logo.svg'
		}),
		new InterpolateHtmlPlugin({
			PUBLIC_URL: ''
		})
	],
	output: {
		filename: '[name].[fullhash].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		publicPath: '/'
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
}
