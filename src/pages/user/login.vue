<template>
  <view>
    <input type="text" v-model="username">
    <input type="text" v-model="password">
    <button type="button" @click="login">Login</button>
  </view>
</template>

<script>
import http from "@/utils/http"
import { mapMutations } from "vuex"

export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },

  methods: {
    ...mapMutations([
      "setUserStatus"
    ]),

    // 登录
    async login() {
      const { data: res } = await http("/users/login", {
        method: 'POST',
        data: {
          name: this.username,
          password: this.password
        }
      })
      if(res.status === 500) {
        console.log("登录失败")
        return uni.navigateBack(1)
      }
      // 保存全局登录态
      this.setUserStatus(res.data)
      console.log("登录成功")
      // 返回我的页面
      uni.navigateBack(1)
    }

  }
}
</script>

<style>
  input {
    width: 600rpx;
    height: 100rpx;
    border: 1px solid #000;
    border-radius: 20rpx;
    margin: 20rpx auto;
  }
</style>