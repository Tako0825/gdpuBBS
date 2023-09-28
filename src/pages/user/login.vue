<template>
  <view class="white-background">
    <view class="container">
      <view class="gradient-text">Welcome to GDPU BBS!</view>
      <input name="username" type="text" v-model="username">
      <input name="password" type="text" v-model="password">
      <button class="login cu-btn" type="button" @click="login">登 录</button>
    </view>

    <!-- 失败提示 -->
    <component 
      :is="'GdpuMessage'" 
      v-for="(item, index) in messageList" 
      :key="index"
      v-bind:content="item.content"
    ></component>
  </view>

  
</template>

<script>
import http from "@/utils/http"
import GdpuMessage from "@/components/gdpu-message"
import { mapMutations } from "vuex"

export default {
  components: {
    GdpuMessage
  },
  data() {
    return {
      username: "",
      password: "",
      messageList: []
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
        return this.messageList.push({
          content: "用户名和密码不匹配"
        })
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

<style scoped lang="less">
.white-background {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 50rpx;
  transform: translateY(-35%);
  width: 100vw;
  height: 200vh;
  
  input {
    position: relative;
    width: 600rpx;
    height: 120rpx;
    border: 2px solid #ccc;
    font-size: 20px;
    border-radius: 10rpx;
    padding: 0 20rpx;
  }

  input:hover {
    border: 2px solid #000;
    &::before {
      color: #3498db!important;
      font-weight: bold;
    }
  }

  input[name="username"]::before {
    position: absolute;
    top: 0;
    font-size: 12px;
    color: #ccc;
    content: "用户名"
  }

  input[name="password"]::before {
    position: absolute;
    top: 0;
    font-size: 10px;
    color: #ccc;
    content: "密码"
  }

  .login {
    width: 600rpx;
    height: 100rpx;
    background: linear-gradient(to right, #3498db, #18b3bd);
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    border-radius: 50rpx;
  }

  .gradient-text {
    font-size: 24px;
    font-weight: bold;
    background: linear-gradient(to right, #3498db, #18b3bd);
    -webkit-background-clip: text; /* 使用 WebKit 前缀以支持某些浏览器 */
    background-clip: text;
    color: transparent; /* 文本变为透明，以显示背景渐变 */
  }
}
</style>