const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const path = require('path')
const poststylus = require('poststylus')
// const pxtorem = require('postcss-pxtorem')
const resolve = file => path.resolve(__dirname, file)

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/static/' : '/',
  outputDir: 'static',
  assetsDir: '',
  indexPath: '../templates/front/index.html',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 50,
            propList: ['*']
          })
        ]
      },
      stylus: {
        use: [
          poststylus([
            pxtorem({
              rootValue: 100,
              propWhiteList: []
            }),
            'autoprefixer'
          ])
        ],
        import: [
          resolve('./src/assets/mant/theme.custom')
        ]
      }
    }
  }
}
