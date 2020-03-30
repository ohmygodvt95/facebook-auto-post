<template>
  <div id="home">
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <v-banner sticky>
      Danh sách chiến dịch mà bạn đã tạo.
      Tạo mới chiến dịch bằng cách bấm vào nút "Thêm mới" ở đây.
      <template v-slot:actions>
        <v-btn color="primary" @click="dialog = true"><v-icon>add</v-icon> Thêm mới</v-btn>
      </template>
    </v-banner>
    <v-container fluid>
      <v-row>
        <v-col cols="4" v-for="item in list" v-bind:key="item._id">
          <v-card
            class="mx-auto"
          >
            <v-card-text>
              <h3>{{  item.name }}</h3>
            </v-card-text>

            <v-card-actions>
              <v-btn small text :to="`/pages/campaign/${item._id}`" color="primary">Chi tiết</v-btn>
              <v-btn small text color="error" @click="deleteCampaign(item)">Xoá</v-btn>
              <v-spacer></v-spacer>
              <small>
                <v-icon small>timer</v-icon>
                <timeago :datetime="item.created_at" :auto-update="60" locale="vi"></timeago>
              </small>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">Tạo mới chiến dịch</v-card-title>
          <v-card-text>
            <v-text-field label="Tên chiến dịch" hint="Chọn một tên dễ hình dung về nội dung" v-model="name"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">Đóng</v-btn>
            <v-btn color="green darken-1" text @click="createCampaign()" :disabled="name.length === 0">Lưu</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      dialog: false,
      name: '',
      list: [],
      items: [
        {
          text: 'Dashboard',
          disabled: true,
          to: '/pages/home'
        }
      ]
    }
  },
  methods: {
    createCampaign: function () {
      const doc = {
        type: 'campaign',
        name: this.name,
        groups: [],
        content: '',
        image: null,
        created_at: new Date(),
        updated_at: new Date(),
        executed_at: null,
        result: []
      }
      this.$database.getInstance().insert(doc, (err, res) => {
        if (!err) {
          this.$notifier.showMessage({ content: 'Chiến dịch đã được thêm' })
          this.dialog = false
          this.getListCampaign(this)
        } else {
          this.$notifier.showMessage({ content: 'Không thể tạo mới chiến dịch', color: 'error' })
        }
      })
    },
    getListCampaign: function (context) {
      this.$database.getInstance()
        .find({ type: 'campaign' }, { created_at: 1, name: 1, _id: 1 })
        .sort({ created_at: -1 })
        .exec(function (err, docs) {
          if (!err) {
            context.list = docs
          }
        })
    },
    deleteCampaign: function (item) {
      const thisInt = this
      this.$confirm(`Bạn có chắc chắn muốn xoá <b>${item.name}</b>`, { title: 'Xác nhận', color: 'primary' })
        .then(res => {
          if (res) {
            thisInt.$database.getInstance().remove({ _id: item._id }, {}, function (err, numRemoved) {
              if (!err) {
                thisInt.$notifier.showMessage({ content: `Đã xoá: ${item.name}` })
                thisInt.getListCampaign(thisInt)
              }
            })
          }
        })
    }
  },
  mounted () {
    this.getListCampaign(this)
  }
}
</script>

<style>
#home {
  height: calc(100vh - 132px);
  overflow-y: auto;
}
</style>
