process.env.VUE_APP_NAME = require('./package.json').app.name

module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: process.env.VUE_APP_NAME
      }
    }
  }
}
