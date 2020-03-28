<template>
  <div>
    <v-carousel v-model="model">
      <v-carousel-item
        v-for="(color, i) in colors"
        :key="color"
      >
        <v-sheet
          :color="color"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">Slide {{ i + 1 }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-row>
      <v-col class="d-flex text-md-justify flex-column">
        <v-btn class="mx-auto mt-5" color="primary" @click="goHome()" rounded>Tôi đã hiểu rồi!</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LocalDB from '../helpers/localdb'

export default {
  data () {
    return {
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange'
      ],
      model: 0
    }
  },
  methods: {
    goHome: function () {
      const localDb = new LocalDB({
        configName: 'user-cookie',
        defaults: {
          cookie: ''
        }
      })

      const cookie = localDb.get('cookie')
      if (cookie.length > 0) {
        this.$router.push('/pages/home')
      } else {
        this.$router.push('/account')
      }
    }
  }
}
</script>
