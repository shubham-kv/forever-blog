const {merge} = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')

const PORT = process.env.PORT || 8080;

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		static: './public',
		host: 'localhost',
		port: PORT,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					// only for dev purposes, because it injects the CSS into the DOM using style tags
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								auto: true,
								mode: 'local',
								exportLocalsConvention: 'camelCaseOnly',
								localIdentName: '[local]',
								localIdentContext: path.resolve(__dirname, 'src'),
							}
						}
					}
				],
			},
		],
	},
})