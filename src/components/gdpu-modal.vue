<template>
    <view class="cu-modal" :class="show?'show':''">
        <view class="cu-dialog">
            <view class="bar cu-bar bg-white justify-end">
                <view class="content">{{ content }}</view>
            </view>
            <view class="confirm" @click="closeModal">确定</view>
        </view>
    </view>
</template>

<script>
export default {
    props: [
        "show", "content"
    ],
    methods: {
        closeModal() {
            this.$emit("authShow", false)
        }
    }
}
</script>

<style lang="less">
    .bar {
        padding: 100rpx 0;
    }
    .confirm {
        padding: 30rpx 0;
    }
</style>