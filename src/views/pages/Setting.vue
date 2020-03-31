<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" offset="3">
        <v-list two-line subheader>
          <v-subheader>General</v-subheader>

          <v-list-item>
            <template v-slot:default>
              <v-list-item-content>
                <v-list-item-title>Thời gian delay giữa 2 lần (giây)</v-list-item-title>
                <v-text-field type="number" v-model="delay" min="1000" step="500" @change="setDelay()"></v-text-field>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      delay: this.$store.state.setting.delay
    }
  },
  methods: {
    setDelay: function () {
      this.$store.commit('setting/setDelay', {
        delay: this.delay
      })
    }
  }
}
</script>
