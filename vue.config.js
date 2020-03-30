process.env.VUE_APP_NAME = require('./package.json').app.name

module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['puppeteer'], // real magic in here
      builderOptions: {
        productName: process.env.VUE_APP_NAME
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
