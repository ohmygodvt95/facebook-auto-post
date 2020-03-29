import Vue from 'vue'
const electron = require('electron')
const path = require('path')

function install (Vue, opts) {
  Vue.prototype.$database = {
    db: null,
    connect: function () {
      const Datastore = require('nedb')
      this.db = new Datastore({
        filename: path.join((electron.app || electron.remote.app).getPath('userData'), 'database.db'),
        autoload: true
      })
    },
    getInstance () {
      if (this.db === null) {
        this.connect()
      }
      return this.db
    }
  }
}

export default Vue.use(install)
