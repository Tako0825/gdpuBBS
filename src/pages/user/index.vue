<template>
  <view class="container">
    <!-- 用户信息 -->
    <UserInfo/>

    <!-- 选项卡列表 -->
    <OptionList/>
  </view>
</template>

<script>
import UserInfo from "@/views/user/user-info"
import OptionList from "@/views/user/option-list"

export default {
  components: {
    UserInfo, OptionList
  },
}
</script>

<style scoped lang="less">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 160rpx 0 40rpx;
    row-gap: 40rpx;
    background-color: #fff;
  }
</style>