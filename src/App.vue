<template>
  <v-app>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <snackbar></snackbar>
  </v-app>
</template>

<script>
import snackbar from '@/components/Snackbar.vue'

export default {
  name: 'App',
  components: { snackbar },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'message/showNotificationMessage') {
        // eslint-disable-next-line no-new
        new Notification(process.env.VUE_APP_NAME, {
          title: process.env.VUE_APP_NAME,
          body: state.message.notificationMessage
        })
      }
    })
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
