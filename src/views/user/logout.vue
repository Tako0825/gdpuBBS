<template>
    <button @click="logout" class="logout cu-btn" type="button">退出登录</button>
</template>

<script>
import { mapMutations } from "vuex"
export default {
    methods: {
        ...mapMutations([
            "clearUserStatus"
        ]),
        async logout() {
            // 1.清除本地存储
            await wx.removeStorage({
                key: "user"
            })
            // 2.清除登录态
            this.clearUserStatus()
            // 3.重新渲染页面
            this.$emit("logout")
        }
    }
}
</script>

<style scoped lang="less">
.logout {
    width: 500rpx;
    height: 100rpx;
    background-color: #fff;
    color: #f53b57;
    border: 1px solid #ccc;
    font-weight: bold;
    font-size: 20px;
  }
</style>