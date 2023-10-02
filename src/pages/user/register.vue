<template>
    <view class="white-background">
      <view class="container">
        <view class="gradient-text">Welcome to join us!</view>
        <input :class="username?'inputing':''" name="username" type="text" v-model="username">
        <input :class="password?'inputing':''" name="password" type="text" v-model="password">
        <input :class="confirmed?'inputing':''" name="confirmed" type="text" v-model="confirmed">
        <button class="register cu-btn" type="button" @click="register">注 册</button>
      </view>
  
      <!-- 失败提示 -->
      <GdpuMessage 
        v-for="(item, index) in messageList" 
        :key="index"
        v-bind:content="item.content"
      />
    </view>
  
    
  </template>
  
  <script>
  import http from "@/utils/http"
  import GdpuMessage from "@/components/gdpu-message"
  
  export default {
    components: {
      GdpuMessage
    },
    data() {
      return {
        username: "",
        password: "",
        confirmed: "",
        messageList: [],
      }
    },
    methods: {
      // 注册
      async register() {
        const { data: res } = await http("/users/register", {
          method: 'POST',
          data: {
            name: this.username,
            password: this.password
          }
        })
        // todo - 异常处理
        this.username = ""
        this.password = ""
        this.confirmed = ""
        this.messageList.push({
          content: "注册成功"
        })
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
  
    .inputing {
      border: 2px solid #000!important;
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

    input[name="confirmed"]::before {
      position: absolute;
      top: 0;
      font-size: 10px;
      color: #ccc;
      content: "确认密码"
    }
  
    .register {
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