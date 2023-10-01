<template>
  <view class="container">
    <!-- 头像 -->
    <view class="avatar">
      <img :src="user.picture?user.picture:defaultAvatar" alt="我的头像">
    </view>
    <!-- 昵称 -->
    <view v-if="user.name" class="nickName">
      {{ user.name }}
    </view>
    <!-- 登录、注册 -->
    <view v-else class="auth">
      <button type="button" @click="pageToLogin" class="login cu-btn lg">登录</button>
      <button type="button" @click="pageToRegister" class="register cu-btn lg">注册</button>
    </view>
    <!-- 文章、订阅、粉丝 -->
    <view class="panel">
      <view class="articleTotal"><text class="data">{{ user.articleCount || "0" }}</text><text>文章</text></view>
      <view class="following"><text class="data">{{ user.subscribes || "0" }}</text><text>订阅</text></view>
      <view class="follower"><text class="data">{{ user.followers || "0" }}</text><text>粉丝</text></view>
    </view>

    <!-- 登录提示 -->
    <GdpuMessage 
      v-for="(item, index) in messageList" 
      :key="index"
      v-bind:content="item.content"
    />
  </view>
</template>

<script>
import defaultAvatar from "@/static/user.png"
import GdpuMessage from "@/components/gdpu-message"
export default {
  components: {
    GdpuMessage
  },
  data() {
      return {
          // | age | email | articleCount | followers | subscribes | gender |
          // | id | jwtToken | name | password | picture |
          user: this.$store.state.user,
          defaultAvatar,
          messageList: new Array()
      }
  },
  methods: {
      // 跳转 - 登录
      pageToLogin() {
        // 登录 - 成功提示
        this.messageList.push({
          content: "登录成功"
        })
        uni.navigateTo({
            url: "./login"
        })
      },

      // 跳转 - 注册
      pageToRegister() {
      // ...todo
      },
  }
}
</script>

<style scoped lang="less">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 40rpx;
}

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
</style>