const path = require('path')
const poststylus = require('poststylus')
const pxtorem = require('postcss-pxtorem')

const resolve = file => path.resolve(__dirname, file)

module.exports = {
	// publicPath: '/', // 根路径
	// outputDir: 'dist', // 构建输出目录
	productionSourceMap: false, // 打包时不生成.map文件
	lintOnSave: false, // 是否开启eslint保存检测,有效值（true||false||error)
	css: {
		loaderOptions: {
			stylus: {
				use: [
					poststylus([
						pxtorem({
							rootValue: 100,
							propWhiteList: [],
							minPixelValue: 1,
							unitPrecision: 2
						}),
						'autoprefixer'
					])
				],
				import: [
					// resolve('./src/assets/theme.custom')
				]
			}
			// less: {
			//   use: []
			// }
		}
	},
	chainWebpack: (config) => {
		config.resolve.alias
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('@', resolve('src'))
	},
	devServer: {
		// port:7890,
		proxy: {

			'/tujingling': {
				target: 'http://127.0.0.1:9090/',
				changeOrigin: true,
				pathRewrite: {
					'^/tujingling': ''
				}
			},

		

			'/flickr': {
				target: 'https://api.flickr.com/',
				changeOrigin: true,
				pathRewrite: {
					'^/flickr': ''
				}
			},


			'/beforeShutterstock': {
				target: 'https://api.proxy.analytics.shutterstock.com/',
				changeOrigin: true,
				pathRewrite: {
					'^/beforeShutterstock': ''
				}
			},
			'/shutterstock': {
				target: 'https://www.shutterstock.com/',
				changeOrigin: true,
				pathRewrite: {
					'^/shutterstock': ''
				}
			},


			'/baidu': {
				target: 'https://www.baidu.com/',
				changeOrigin: true,
				pathRewrite: {
					'^/baidu': ''
				}
			},
			'/api': {
				target: 'http://localhost:9090',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			},
			'/phncdn': {
				target: 'https://cv-h.phncdn.com',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			},
		}
		// lintOnSave: process.env.NODE_ENV !== 'production'
	}
}
