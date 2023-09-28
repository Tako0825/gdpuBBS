<template>
  <view class="container">
    <text class="text slide-bottom-top">{{ content }}</text>
  </view>
</template>

<script>
import "@/animation/slide.css"
export default {
  props: [
    "content"
  ]
}
</script>

<style scoped lang="less">
  .container {
    position: fixed;
    z-index: 100;
    top: 50rpx;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    row-gap: 30rpx;
    .text {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80rpx;
      padding: 0 40rpx;
      border-radius: 10rpx;
      color: #fff;
      background-color: #4a4a4b;
      opacity: .9;
    }
  }
</style>