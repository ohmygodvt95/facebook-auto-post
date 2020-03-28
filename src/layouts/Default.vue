<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>FB Auto Tools</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon title="Info" to="/guide" link>
        <v-icon>info</v-icon>
      </v-btn>
    </v-app-bar>
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
    <v-content>
      <router-view></router-view>
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
export default {
  name: 'Layout',
  data: () => ({
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
