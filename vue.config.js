const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/static/' : '/',
  // outputDir: 'static',
  // assetsDir: '',
  // indexPath: '../templates/front/index.html',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 80,
            propList: ['*']
          })
        ]
      }
    }
  }
}
