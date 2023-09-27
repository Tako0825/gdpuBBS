<template>
  <view class="container">
    <view class="avatar">
      <img :src="user.picture?user.picture:avatar" alt="我的头像">
    </view>
    <view v-if="user.name" class="nickName">
      {{ user.name }}
    </view>
    <view v-else class="auth">
      <button type="button" @click="pageToLogin" class="login cu-btn lg">登录</button>
      <button type="button" @click="pageToRegister" class="register cu-btn lg">注册</button>
    </view>
    <view class="panel">
      <view class="articleTotal"><text class="data">{{ user.articleCount || "0" }}</text><text>文章</text></view>
      <view class="following"><text class="data">{{ user.subscribes || "0" }}</text><text>订阅</text></view>
      <view class="follower"><text class="data">{{ user.followers || "0" }}</text><text>粉丝</text></view>
    </view>
    <view class="cardList">
      <view class="card slide-bottom" @click="pageToPersonal">
        <img src="../../static/permissions.png" alt="登录">
        <text>个人信息</text>
        <img src="../../static/right.png" alt="右箭头">
      </view>
      <view class="card  slide-bottom" @click="pageToPublish">
        <img src="../../static/broadcast.png" alt="我要发帖">
        <text>我要发帖</text>
        <img src="../../static/right.png" alt="右箭头">
      </view>
      <view class="card  slide-bottom" @click="pageToMyStar">
        <img src="../../static//star.png" alt="我的收藏">
        <text>我的收藏</text>
        <img src="../../static/right.png" alt="右箭头">
      </view>
      <view class="card  slide-bottom" @click="pageToMyLike">
        <img src="../../static//like.png" alt="我的点赞">
        <text>我的点赞</text>
        <img src="../../static/right.png" alt="右箭头">
      </view>
    </view>
  </view>
</template>

<script>
import avatar from "@/static/user.png"
import "@/animation/slide.css"

export default {
  data() {
    return {
      // | age | email | articleCount | followers | subscribes | gender |
      // | id | jwtToken | name | password | picture |
      user: this.$store.state.user,
      avatar
    }
  },
  methods: {
    // 跳转 - 登录
    pageToLogin() {
      uni.navigateTo({
        url: "./login"
      })
    },

    // 跳转 - 注册
    pageToRegister() {
      // ...todo
    },
    
    // 跳转 - 个人信息
    pageToPersonal() {
      // ...todo
    },

    // 跳转 - 我要发贴
    pageToPublish() {
      // ...todo
    },

    // 跳转 - 我的收藏
    pageToMyStar() {
      // ...todo
    },

    // 跳转 - 我的点赞
    pageToMyLike() {
      // ...todo
    }
  },
  onShow() {
    if(!(this.user?.id == this.$store.state.user?.id)) {
      this.user = this.$store.state.user
    }
  }
}
</script>

<style scoped lang="less">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40rpx 0;
    row-gap: 40rpx;
    background-color: #fff;

    // 我的头像
    .avatar {
      width: 200rpx;
      height: 200rpx;
      border-radius: 20rpx;
      overflow: hidden;
      background-color: #ecf0f1;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .auth {
      display: flex;
      column-gap: 40rpx;
        // 登录按钮
        .login {
          background-color: #3498db;
          color: #fff;
        }

        // 注册按钮
        .register {
          color: #000;
        }
    }

    // 我的面板
    .panel {
      display: flex;
      justify-content: center;
      column-gap: 40rpx;
      width: 650rpx;
      padding: 40rpx 0;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      >view {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 10rpx;
        width: 120rpx;
        height: 120rpx;
        .data {
          font-weight: bold;
        }
      }
    }

    // 操作选项
    .cardList {
      display: flex;
      flex-direction: column;
      .card {
        position: relative;
        display: flex;
        column-gap: 20rpx;
        width: 750rpx;
        padding: 40rpx 80rpx;
        img {
          width: 50rpx;
          height: 50rpx;
          vertical-align: middle;
          &:last-of-type {
            position: absolute;
            right: 80rpx;
          }
        }
      }
    }
  }
</style>