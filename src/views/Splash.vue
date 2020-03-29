<template>
  <div id="splash" class="d-flex flex-column">
    <img src="../assets/logo.png" alt="Logo" class="mx-auto">
    <v-progress-circular
      :size="40"
      color="primary"
      indeterminate
      class="mx-auto"
    ></v-progress-circular>
  </div>
</template>

<script>
import LocalDB from '../helpers/localdb'

export default {
  created () {
    this.$database.getInstance()
  },
  mounted () {
    this.localDb = new LocalDB({
      configName: 'user-cookie',
      defaults: {
        cookie: ''
      }
    })

    this.cookie = this.localDb.get('cookie')
    setTimeout((cookie) => {
      if (cookie.length > 0) {
        this.$router.push('/pages/home')
      } else {
        this.$router.push('/guide')
      }
    }, 2000, this.localDb.get('cookie'))
  }
}
</script>

<style lang="scss">
#splash {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  * {
    display: block;
  }

  img {
    height: 150px;
    margin-top: calc(50vh - 90px);
  }
}
</style>
