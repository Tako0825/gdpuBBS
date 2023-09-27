<template>
  <view class="container">
    <text class="text slide-bottom-top">这是一条信息</text>
  </view>
</template>

<script>
import "@/animation/slide.css"
export default {

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

      width: 200rpx;
      height: 80rpx;
      border-radius: 10rpx;
      color: #fff;
      background-color: #4a4a4b;
      opacity: .9;
    }
  }
</style>