<template>
  <view class="container">
    <view class="avatar">
      <img :src="avatar" alt="我的头像">
    </view>
    <view class="nickName">
      {{ nickName }}
    </view>
    <view class="panel">
      <view class="articleTotal"><text class="data">{{ articleTotal }}</text><text>文章</text></view>
      <view class="following"><text class="data">{{ following }}</text><text>订阅</text></view>
      <view class="follower"><text class="data">{{ follower }}</text><text>粉丝</text></view>
    </view>
    <view class="cardList">
      <view type="button" class="card" @click="pageToLogin">
        <img src="../../static/permissions.png" alt="">
        <text>登录</text>
      </view>
      <view type="button" class="card" @click="pageToLogin">
        <img src="../../static/broadcast.png" alt="">
        <text>我要发帖</text>
      </view>
      <view type="button" class="card" @click="pageToLogin">
        <img src="../../static//star.png" alt="">
        <text>我的收藏</text>
      </view>
      <view type="button" class="card" @click="pageToLogin">
        <img src="../../static//like.png" alt="">
        <text>我的点赞</text>
      </view>
    </view>
  </view>
</template>

<script>
import avatar from "@/static/avatar.png"

export default {
  data() {
    return {
      avatar,
      nickName: null,
      articleTotal: 0,
      following: 0,
      follower: 0
    }
  },
  methods: {
    pageToLogin() {
      uni.navigateTo({
        url: "./login"
      })
    }
  }
}
</script>

<style lang="less">
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
      img {
        width: 100%;
        height: 100%;
      }
    }

    // 我的面板
    .panel {
      display: flex;
      justify-content: center;
      column-gap: 40rpx;
      width: 650rpx;
      padding: 80rpx 0;
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

    // 选项列表
    .cardList {
      display: flex;
      flex-direction: column;
      .card {
        width: 750rpx;
        padding: 40rpx 80rpx;
      }
    }
  }
</style>