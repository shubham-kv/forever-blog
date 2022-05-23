const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const {merge} = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common')

module.exports = merge(common, {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								auto: true,
								mode: 'local',
								exportLocalsConvention: 'camelCaseOnly',
								localIdentName: '[hash:base64]',
								localIdentContext: path.resolve(__dirname, 'src'),
							}
						}
					}
				],
			}
		]
	},
	plugins: [new MiniCssExtractPlugin({
		filename: '[name].[contenthash].css',
		chunkFilename: '[id].[contenthash].css'
	})],
	optimization: {
		minimizer: [
			`...`,
			new CssMinimizerPlugin()
		]
	}
})
