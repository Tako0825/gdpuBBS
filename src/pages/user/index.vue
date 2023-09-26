<template>
  <view>
    <button type="button" @click="pageToLogin">登录</button>
  </view>
</template>

<script>
export default {
  methods: {
    pageToLogin() {
      uni.navigateTo({
        url: "./login"
      })
    }
  }
}
</script>

<style>

</style>