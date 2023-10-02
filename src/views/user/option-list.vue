<template>
<view class="cardList">
    <view class="card  slide-bottom" @click="pageToPublish">
        <img src="../../static/broadcast.png" alt="我要发帖">
        <text>我要发帖</text>
        <img src="../../static/right.png" alt="右箭头">
    </view>
    <view class="card slide-bottom" @click="pageToPersonal">
        <img src="../../static/permissions.png" alt="个人信息">
        <text>个人信息</text>
        <img src="../../static/right.png" alt="右箭头">
    </view>
    <view class="card  slide-bottom" @click="pageToMyLike">
        <img src="../../static//like.png" alt="我的点赞">
        <text>我的点赞</text>
        <img src="../../static/right.png" alt="右箭头">
    </view>
    <view class="card  slide-bottom" @click="pageToMyStar">
        <img src="../../static//star.png" alt="我的收藏">
        <text>我的收藏</text>
        <img src="../../static/right.png" alt="右箭头">
    </view>

    <!-- 消息提示 -->
    <GdpuMessage 
      v-for="(item, index) in messageList" 
      :key="index"
      v-bind:content="item.content"
    />
</view>
</template>

<script>
import GdpuMessage from "@/components/gdpu-message"
export default {
    components: {
        GdpuMessage
    },
    data() {
        return {
            messageList: new Array()
        }
    },
    methods: {
        // 跳转 - 我要发贴
        pageToPublish() {
            uni.navigateTo({
                 url: 'editor'
            })
        },

        // 跳转 - 个人信息
        pageToPersonal() {
            uni.navigateTo({
                 url: 'profile-form'
            })
        },
        
        // 跳转 - 我的点赞
        pageToMyLike() {
            uni.navigateTo({
                 url: 'my-like'
            })
        },

        // 跳转 - 我的收藏
        pageToMyStar() {
            uni.navigateTo({
                 url: 'my-star'
            })
        }
    }
}
</script>

<style scoped lang="less">
// 选项卡列表
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
</style>