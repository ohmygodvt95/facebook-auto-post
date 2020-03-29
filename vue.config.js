process.env.VUE_APP_NAME = require('./package.json').app.name

module.exports = {
  configureWebpack: {
    externals: {
      puppeteer: 'require("puppeteer")' // this is magic
    }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: process.env.VUE_APP_NAME
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
