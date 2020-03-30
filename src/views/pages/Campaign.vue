<template>
  <v-card flat v-if="campaign" style="overflow-y: auto; border-radius: 0; height: calc(100vh - 132px);">
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

        <v-btn fab color="error" small @click="run()">
          <v-icon v-if="!play">play_arrow</v-icon>
          <v-icon v-else>pause</v-icon>
        </v-btn>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text style="min-height: 430px; overflow: auto">
        <v-progress-linear
          indeterminate
          color="primary"
          v-if="play"
        ></v-progress-linear>
        <v-tabs vertical>
          <v-tab>
            <v-icon left>supervisor_account</v-icon>
            <v-badge
              color="green"
              :content="campaign.groups.length"
              left
            >
              Mục tiêu
            </v-badge>
          </v-tab>
          <v-tab>
            <v-icon left>art_track</v-icon>
            <v-badge
              color="green"
              :content="campaign.content.length"
              left
            >
              Nội dung
            </v-badge>
          </v-tab>
          <v-tab>
            <v-icon left>local_florist</v-icon>
            Kết quả
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-toolbar flat small>
                  <v-spacer></v-spacer>

                  <v-btn text color="primary" @click="openGroupDialog()">
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
                      <th class="text-left">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in campaign.groups" :key="item.name">
                      <td :title="item.text">{{ item.text | limit_str(40) }}</td>
                      <td>
                        <v-btn icon color="primary" small @click="openLink(item.href.replace('mbasic', 'www'))"><v-icon>link</v-icon></v-btn>
                        <span :class="item.state === 3 ? 'success--text' : 'primary--text'">
                          {{ item.href | www | limit_str(40) }}
                        </span>
                      </td>
                      <td>
                        <v-btn small text color="error" @click="removeFromList(item)">
                          Xoá
                        </v-btn>
                        <v-btn
                          v-if="item.state !== 1"
                          class="ma-2"
                          :loading="item.state === 2"
                          icon
                          small
                          :color="item.state === 3 ? 'success' : 'primary'"
                        >
                          <v-icon>{{ item.state === 3 ? 'done' : 'refresh'}}</v-icon>
                        </v-btn>
                      </td>
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
                  <v-toolbar-title>Chọn group mục tiêu (đang chọn <b>{{ counterList }}</b>)</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn dark text @click="closeGroupDialog()">Xác nhận</v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-container>
                  <v-row>
                    <v-col style="max-height: calc(100vh - 88px); overflow-y: auto;">
                      <div v-if="loading">
                        <v-progress-circular
                          :size="50"
                          color="primary"
                          indeterminate
                        ></v-progress-circular> Đang lấy dữ liệu...
                      </div>
                      <v-col cols="6" offset="3">
                        <v-text-field
                          v-model="searchGroupName"
                          label="Tìm kiếm group"
                          solo
                          clearable
                        ></v-text-field>
                      </v-col>
                      <div v-if="listGroups">
                        <v-checkbox v-for="item in filteredList" v-bind:key="item.href"
                                    v-model="item.value"
                                    :label="item.text"
                        >
                          <template v-slot:append>
                            <v-btn text color="primary" small @click="openLink(item.href.replace('mbasic', 'www'))">Link</v-btn>
                            <v-divider></v-divider>
                          </template>
                        </v-checkbox>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-dialog>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-textarea
                  rows="20"
                  clearable
                  auto-grow
                  outlined
                  name="input-7-4"
                  label="Nội dung bài viết"
                  v-model="campaign.content"
                  placeholder="Nội dung bài viết bạn muốn đăng..."
                ></v-textarea>

                <br>

                <v-file-input
                  prepend-icon="image"
                  show-size
                  type="file"
                  label="Ảnh"
                  placeholder="Ảnh của post"
                  refs="image"
                  @change="setImage"
                  v-model="image"
                  outlined
                  :messages="campaign.image == null ? 'Chưa chọn ảnh' : campaign.image"
                  @click:clear="campaign.image = null"
                  accept="image/png, image/jpeg, image/bmp"
                  :value="campaign.image"
                >
                  <template v-slot:message="message">
                    <div class="text-center">
                      <span
                        label
                        small
                      >
                        <v-btn text @click="campaign.image = null" color="error" small title="Xoá">
                          Xoá
                        </v-btn>{{ message.message }}</span>
                        <v-img width="400" :src="'file://' + message.message" v-if="campaign.image"
                             style="margin: 0 auto; border-radius: 5px; padding: 5px; border: 8px solid lightgray;"></v-img>
                    </div>
                  </template>
                </v-file-input>
              </v-card-text>
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
      play: false,
      image: null,
      loading: true,
      model: '',
      search: '',
      dialog: false,
      campaign: null,
      listGroups: [],
      searchGroupName: '',
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
  computed: {
    filteredList () {
      if (!this.searchGroupName) {
        return this.listGroups
      }
      return this.listGroups.filter(post => {
        return post.text.toLowerCase().includes(this.searchGroupName.toLowerCase())
      })
    },
    counterList () {
      return this.listGroups.filter(p => p.value).length
    }
  },
  methods: {
    removeFromList: function (item) {
      this.campaign.groups = this.campaign.groups.filter((i) => i.href !== item.href)
      this.updateItem()
    },
    updateItem: function () {
      this.campaign.updated_at = new Date()
      this.$database.getInstance()
        .update({ _id: this.campaign._id }, this.campaign)
    },
    run: async function () {
      if (!this.play) {
        this.updateItem()
        const thisInt = this
        this.$confirm('Bạn có muốn chạy auto post cho chiến dịch này?', { title: 'Xác nhận', color: 'info' }).then(async (res) => {
          if (res) {
            thisInt.play = true
            thisInt.campaign.groups = thisInt.campaign.groups.map((i) => {
              i.state = 1
              return i
            })
            const crawler = new Crawler(thisInt, false)
            await crawler.createBrowser()
            if (await crawler.checkLogin()) {
              for (const [i, v] of thisInt.campaign.groups.entries()) {
                v.state = 2
                thisInt.campaign.groups[i].state = await crawler.run(v, thisInt.campaign)
              }
            } else {
              thisInt.$notifier
                .showNotificationMessage({ message: 'Không thể đăng nhập! Vui lòng đăng nhập lại.', color: 'error' })
            }
            await crawler.browser.close()
            thisInt.play = false
            thisInt.$notifier.showNotificationMessage({ message: 'Đã chạy xong ' + thisInt.campaign.name })
            this.$notifier.showFooterMessage({ message: 'Hoàn tất' })
            this.updateItem()
          }
        })
      }
    },
    setData: function (campaign) {
      this.campaign = campaign
      this.items[1].text = campaign.name
    },
    openGroupDialog: async function () {
      this.dialog = true
      const crawler = new Crawler(this, false)
      if (this.loading) {
        this.listGroups = await crawler.runCrawlerGroups()
        for (const [i, v] of this.listGroups.entries()) {
          const result = this.campaign.groups.filter((t) => t.href === v.href)
          if (result.length > 0) {
            this.listGroups[i].value = true
          }
        }
        this.loading = false
      }
    },
    closeGroupDialog: function () {
      this.dialog = false
      this.campaign.groups = this.listGroups.filter((i) => i.value)
    },
    setImage: function () {
      if (this.image) {
        this.campaign.image = this.image.path
      }
    }
  },
  created () {
    const thisInt = this
    this.$database.getInstance().findOne({ type: 'campaign', _id: this.$route.params.id }, function (err, res) {
      if (!err) {
        thisInt.setData(res)
      }
    })
  },
  watch: {
    'campaign.image': function () {
      this.updateItem()
    },
    'campaign.content': function () {
      this.updateItem()
    },
    'campaign.groups': function () {
      this.updateItem()
    }
  }
}
</script>

<style>
</style>
