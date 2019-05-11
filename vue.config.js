const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

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
            rootValue: 100,
            propList: ['*']
          })
        ]
      },
      less: {
        modifyVars: {
          // nav bar
          'nav-bar-title-font-size': '32px',
          'nav-bar-arrow-size': '32px',
          'nav-bar-height': '92px',
          'nav-bar-text-color': '#000',
          // tabbar
          'tabs-line-height': '88px',
          'tabs-card-height': '60px',
          'tabbar-height': '100px',
          'tabbar-background-color': 'white',
          'tabbar-item-font-size': '24px',
          'tabbar-item-text-color': 'gray-darker',
          'tabbar-item-active-color': 'blue',
          'tabbar-item-line-height': 2,
          'tabbar-item-icon-size': '36px',
          'tabbar-item-margin-bottom': '10px'
        }
      }
    }
  }
}
