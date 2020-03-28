<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col cols="6" offset="3">
          <v-card
            class="mx-auto mt-5"
          >
            <v-card-text>
              <h3 class="mb-3">Facebook Account</h3>
              <p v-if="cookie.length === 0">
                Bạn chưa đăng nhập, bấm vào nút đăng nhập phía dưới để đăng nhập vào tài khoản. Tài khoản này sẽ được dùng để tự động post bài viết vào các group.
              </p>
              <p v-else>
                Bạn hiện đang đăng nhập, click vào đăng xuất để thay đổi tài khoản khác.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                v-if="cookie.length === 0" @click="open()"
              >
                ĐĂNG NHẬP
              </v-btn>
              <v-btn
                text
                color="deep-purple accent-4"
                v-else="" @click="deleteCookie()"
              >
                ĐĂNG XUẤT
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LocalDB from '../../helpers/localdb'
const { session } = require('electron').remote

export default {
  name: 'Home',
  data: function () {
    return {
      localDb: null,
      cookie: ''
    }
  },
  methods: {
    open: function () {
      const modal = window.open('https://mbasic.facebook.com/', 'popup')
      const timer = setInterval(function (callback) {
        session.defaultSession.cookies.get({ url: 'https://mbasic.facebook.com' })
          .then((cookies) => {
            const check = cookies.filter((cookie) => { return cookie.name === 'c_user' })
            if (check.length > 0) {
              clearInterval(timer)
              modal.close()
              callback(cookies)
            }
          })
      }, 500, this.updateCookie)
    },
    updateCookie: function (cookies) {
      this.cookie = cookies
      this.localDb.set('cookie', cookies)
      session.defaultSession.clearStorageData([], (data) => {})
      this.$notifier.showMessage({ content: 'Đăng nhập thành công' })
      if (this.$route.path === '/account') {
        this.$router.push('/pages/home')
      }
    },
    deleteCookie () {
      this.cookie = ''
      this.localDb.set('cookie', '')
      this.$notifier.showMessage({ content: 'Đăng xuất thành công' })
    }
  },
  created: function () {
    this.localDb = new LocalDB({
      configName: 'user-cookie',
      defaults: {
        cookie: ''
      }
    })

    this.cookie = this.localDb.get('cookie')
  }
}
</script>
