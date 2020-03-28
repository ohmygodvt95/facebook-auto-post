import Vue from 'vue'
const shell = require('electron').shell

const commons = {
  methods: {
    openLink: function (link) {
      shell.openExternal(link)
    }
  }
}

export default Vue.mixin(commons)
