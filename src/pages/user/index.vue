<template>
  <view class="container">
    <!-- 用户信息 (包括登录、注册) -->
    <UserInfo v-bind:user="user"/>

    <!-- 选项卡列表 -->
    <OptionList/>

    <!-- 退出登录 -->
    <Logout v-if="getUserStatus" v-on:logout="user=null"/>

    <!-- 登录提示 -->
    <GdpuMessage
      v-for="(item, index) in messageList" 
      :key="index"
      v-bind:content="item.content"
    />
  </view>
</template>

<script>
import UserInfo from "@/views/user/user-info"
import OptionList from "@/views/user/option-list"
import Logout from "@/views/user/logout"
import { mapGetters } from "vuex"
import GdpuMessage from '@/components/gdpu-message.vue'

export default {
  components: {
    UserInfo, OptionList, Logout, GdpuMessage
  },
  data() {
    return {
      user: this.$store.state.user,
      messageList: new Array()
    }
  },
  computed: {
    ...mapGetters([
      "getUserStatus"
    ])
  },
  onShow() {
    if(this.$store.state.user && (this.user?.id !== this.$store.state.user.id)) {
      this.messageList.push({
        content: "登录成功"
      })
    }
    this.user = this.$store.state.user
  }
}
</script>

<style scoped lang="less">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 160rpx 0 80rpx;
    row-gap: 40rpx;
    background-color: #fff;
  }
</style>