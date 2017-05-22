var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
	'script!jquery/dist/jquery.min.js',
	'script!foundation-sites/dist/foundation.min.js',
	'./app/app.jsx'
	],
	externals: {
		jquery: 'jQuery',

	},
	plugins:[
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery'
		})
	],
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	resolve: {
		root: __dirname,
		modulesDirectories: [
			'node_modules',
			'./app/components',
			'./app/api'
		],
		alias: {
			applicationStyles: "app/styles/app.scss",
			actions: 'app/actions/actions.jsx',
			reducers: 'app/reducers/reducers.jsx',
			configureStore: 'app/store/configureStore.jsx'
		},
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0']
				},
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	sassLoader: {
		includePaths: [
			path.resolve(__dirname, './node_modules/foundation-sites/scss')
		]
	},
	devtool: 'cheap-module-eval-source-map'

	// "cheap-source-map" can be used instead of above
	// which currently has bugs
	// buggy warning can also be avoided with filter in console.
	// see https://github.com/webpack/webpack/issues/91
	// 'cheap-source-map' sort of works, but line numbers are a bit off
	//devtool: 'cheap-source-map'
};
