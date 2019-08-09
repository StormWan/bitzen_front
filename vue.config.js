const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const path = require('path')
const poststylus = require('poststylus')
const resolve = file => path.resolve(__dirname, file)

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/static/dist' : '/',
  outputDir: 'static/dist',
  assetsDir: '',
  indexPath: '../../templates/frontend/index.html',
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
          poststylus(pxtorem({
            rootValue: 100,
            minPixelValue: 2,
            propWhiteList: []
          }))
        ],
        import: [
          resolve('./src/assets/mant/theme.custom')
        ]
      }
    }
  }
}
