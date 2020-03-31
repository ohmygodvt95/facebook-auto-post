<template>
  <div>
    <v-carousel v-model="model">
      <v-carousel-item>
        <v-sheet
          color="primary"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-1">
              Đăng nhập <br>
              bằng tài khoản facebook</div>
            <div class="image">
              <img src="../assets/guideline/1.png" alt="" width="512px">
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet
          color="blue-grey lighten-2"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-1">
              Tạo mới chiến dịch <br>
            </div>
            <div class="image">
              <img src="../assets/guideline/2.png" alt="" width="512px">
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet
          color="primary"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-1">Thêm sửa xoá <br>
              nội dung</div>
            <div class="image">
              <img src="../assets/guideline/4.png" alt="" width="512px">
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet
          color="light-blue accent-3"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-1">
              Chọn group mục tiêu
            </div>
            <div class="image">
              <img src="../assets/guideline/3.png" alt="" width="512px">
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet
          color="primary"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-1">Thêm nội dung
              <br>và hình ảnh</div>
            <div class="image">
              <img src="../assets/guideline/5.png" alt="" width="512px">
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet
          color="red darken-1"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-1">Chạy</div>
            <div class="image">
              <img src="../assets/guideline/6.png" alt="" width="512px">
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet
          color="green darken-1"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-1">Tận hưởng thành qủa</div>
            <div class="image">
              <img src="../assets/guideline/7.png" alt="" width="512px">
            </div>
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

<style>
.display-1 {
  padding: 25px;
}
</style>
