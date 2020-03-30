<template>
  <v-app>
    <div id="titlebar">
      <v-system-bar window fixed>
        <b>Facebook Auto Tools</b>
        <v-spacer></v-spacer>
        <v-icon class="controls" title="Minimize" @click="minimize()">remove</v-icon>
        <v-icon class="controls" title="Maximize" @click="maximize()">crop_square</v-icon>
        <v-icon class="controls" title="Close" @click="close()">close</v-icon>
      </v-system-bar>
      <v-app-bar
        app
        color="primary"
        dark
        style="-webkit-app-region: drag; top: 32px;"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>FB Auto Tools</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon title="Info" to="/guide" link>
          <v-icon>info</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            FB Auto Tools
          </v-list-item-title>
          <v-list-item-subtitle>
            v0.0.1
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="link in links" v-bind:key="link.name" :to="link.url" link>
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ link.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-content id="v-app-content">
      <router-view></router-view>
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        dark
        fixed
        bottom
        right
        color="primary"
        style="bottom: 50px"
        @click="toTop"
        small
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-content>
    <v-footer app>
      <small>{{ message }}</small>
      <v-spacer></v-spacer>
      <div>
        <small>
          Made by <a style="text-decoration: none" href="#" @click="openLink('https://fb.com/ohmygodvt95')">ohmygodvt95</a> with <span style="color: red;">♥</span>
        </small>
        <small>&copy; {{ new Date().getFullYear() }}</small>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
const remote = require('electron').remote
const win = remote.getCurrentWindow()

export default {
  name: 'Layout',
  data: () => ({
    fab: false,
    message: '',
    drawer: false,
    group: null,
    links: [
      {
        icon: 'dashboard',
        name: 'Home',
        url: '/pages/home'
      },
      {
        icon: 'lock_open',
        name: 'Account',
        url: '/pages/account'
      },
      {
        icon: 'assignment_ind',
        name: 'About',
        url: '/pages/about'
      },
      {
        icon: 'settings',
        name: 'Settings',
        url: '/pages/settings'
      }
    ]
  }),
  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    },
    close: function () {
      win.close()
    },
    maximize: function () {
      if (win.isFullScreen()) {
        win.setFullScreen(false)
      } else {
        win.setFullScreen(true)
      }
    },
    minimize: function () {
      win.minimize()
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'message/showFooterMessage') {
        this.message = state.message.footerMessage
      }
    })
  }
}
</script>

<style lang="scss">
  .controls
  {
    padding: 5px;
    &:hover
    {
      background-color: darkgray;
    }
  }

  #titlebar {
    height: 88px;
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }

  #v-app-content {
    padding-top: 0!important;
    max-height: calc(100vh - 88px - 36px);
    overflow-y: auto;
  }
</style>
