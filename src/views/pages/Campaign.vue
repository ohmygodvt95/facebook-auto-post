<template>
  <v-card flat v-if="campaign" style="overflow: auto; border-radius: 0;">
    <v-toolbar
      style="border-radius: 0"
      extended
      flat
      color="primary"
    >
    </v-toolbar>

    <v-card
      class="mx-auto"
      max-width="1000"
      style="margin-top: -64px;"
    >
      <v-toolbar flat>
        <v-btn icon to="/pages/home" color="primary"><v-icon>arrow_back</v-icon></v-btn>
        <v-toolbar-title class="grey--text">{{ campaign.name }}</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn fab color="error" small>
          <v-icon>play_arrow</v-icon>
        </v-btn>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text style="height: 380px; overflow: scroll">
        <v-tabs vertical>
          <v-tab>
            <v-icon left>mdi-account</v-icon>
            Mục tiêu
          </v-tab>
          <v-tab>
            <v-icon left>mdi-lock</v-icon>
            Nội dung
          </v-tab>
          <v-tab>
            <v-icon left>mdi-access-point</v-icon>
            Kết quả
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-toolbar flat small>
                  <v-spacer></v-spacer>

                  <v-btn text color="primary" small @click="openGroupDialog()">
                    <v-icon>add</v-icon>
                    Thêm group
                  </v-btn>
                </v-toolbar>

                <v-simple-table fixed-header>
                  <template v-slot:default>
                    <thead>
                    <tr>
                      <th class="text-left">Tên group</th>
                      <th class="text-left">Đường dẫn</th>
                      <th class="text-left">Trạng thái</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in campaign.groups" :key="item.name">
                      <td :title="item.text">{{ item.text | limit_str(40) }}</td>
                      <td>
                        <v-btn icon color="primary" small @click="openLink(item.href.replace('mbasic', 'www'))"><v-icon>link</v-icon></v-btn>
                        {{ item.href | www | limit_str(40) }}
                      </td>
                      <td>{{ item.value }}</td>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
            </v-card>
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
              <v-card>
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Chọn group mục tiêu</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn dark text @click="closeGroupDialog()">Xác nhận</v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                        v-if="loading"
                      ></v-progress-circular>
                      <v-checkbox v-for="item in listGroups" v-bind:key="item.href"
                        v-model="item.value"
                        :label="item.text"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-dialog>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text></v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text></v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import Crawler from '../../helpers/crawler'

export default {
  data () {
    return {
      loading: true,
      model: '',
      search: '',
      dialog: false,
      campaign: null,
      listGroups: [],
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          to: '/pages/home'
        },
        {
          text: 'Chi tiết',
          disabled: true
        }
      ]
    }
  },
  methods: {
    setData: function (campaign) {
      this.campaign = campaign
      this.items[1].text = campaign.name
    },
    openGroupDialog: async function () {
      this.dialog = true
      const crawler = new Crawler(null, false)
      if (this.loading) {
        this.listGroups = await crawler.runCrawlerGroups()
        this.loading = false
      }
    },
    closeGroupDialog: function () {
      this.dialog = false
      this.campaign.groups = this.listGroups.filter((i) => i.value)
    }
  },
  created () {
    const thisInt = this
    this.$database.getInstance().findOne({ type: 'campaign', _id: this.$route.params.id }, function (err, res) {
      if (!err) {
        thisInt.setData(res)
      }
    })
  }
}
</script>

<style>
</style>
