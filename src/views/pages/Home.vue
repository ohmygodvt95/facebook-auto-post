<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">
    Home
    <v-btn @click="open()">Click</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    open: function () {
      this.$notifier.showMessage({ content: 'Hello, snackbar' })
      this.$notifier.showFooterMessage({ message: 'aaaaa' })
      this.$notifier.showNotificationMessage({ message: 'a duuuu' })
    }
  }
}
</script>
