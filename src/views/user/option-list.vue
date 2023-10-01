<template>
<view class="cardList">
    <view class="card slide-bottom" @click="pageToPersonal">
        <img src="../../static/permissions.png" alt="登录">
        <text>个人信息</text>
        <img src="../../static/right.png" alt="右箭头">
    </view>
    <view class="card  slide-bottom" @click="pageToPublish">
        <img src="../../static/broadcast.png" alt="我要发帖">
        <text>我要发帖</text>
        <img src="../../static/right.png" alt="右箭头">
    </view>
    <view class="card  slide-bottom" @click="pageToMyStar">
        <img src="../../static//star.png" alt="我的收藏">
        <text>我的收藏</text>
        <img src="../../static/right.png" alt="右箭头">
    </view>
    <view class="card  slide-bottom" @click="pageToMyLike">
        <img src="../../static//like.png" alt="我的点赞">
        <text>我的点赞</text>
        <img src="../../static/right.png" alt="右箭头">
    </view>
</view>
</template>

<script>
export default {
    methods: {
        // 跳转 - 个人信息
        pageToPersonal() {
        // ...todo
        },

        // 跳转 - 我要发贴
        pageToPublish() {
        // ...todo
        },

        // 跳转 - 我的收藏
        pageToMyStar() {
        // ...todo
        },

        // 跳转 - 我的点赞
        pageToMyLike() {
        // ...todo
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