<template>
  <view class="container">
    <img class="rotate-infinite" :src="LoadingFour" alt="加载中图标">
  </view>
</template>

<script>
import LoadingFour from "@/static/loading-four.png"
import "@/animation/rotate.css"
export default {
  data() {
    return {
      LoadingFour
    }
  }
}
</script>

<style scoped lang="less">
    .container {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 750rpx;
      height: 100vh;
      overflow: hidden;
      img {
        position: relative;
        width: 50rpx;
        height: 50rpx;
      }
    }
</style>