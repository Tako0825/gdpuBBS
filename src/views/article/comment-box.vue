<template>
<view>
    <!-- 评论框 -->
    <view class="comment-box">
        <input class="box" v-model="myInput" type="text">
        <button :disabled="!myInput" class="confirm cu-btn" type="button" @click="sendMyInput">发送</button>
    </view>

    <!-- 消息提示 -->
    <GdpuMessage v-for="(item, index) in messageList" :key="index" v-bind:content="item.content"/>
</view>
</template>

<script>
import GdpuMessage from "@/components/gdpu-message"
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("article")
export default {
    components: {
        GdpuMessage
    },
    data() {
        return {
            // 当前输入内容
            myInput: "",
            // 消息提示列表
            messageList: new Array()
        }
    },
    computed: {
        ...mapGetters([
            'getArticleId'
        ])
    },
    methods: {
        ...mapMutations([
            "setCommentList"
        ]),
        ...mapActions([
            "fetchCommentList", "sendComment"
        ]),
        // 发送评论
        async sendMyInput() {
            const res = await this.sendComment({
                content: this.myInput,
                user: this.$store.state.user,
                articleId: this.getArticleId
            })
            // 隐藏键盘并取消聚焦
            wx.hideKeyboard();
            // 清空输入框内容
            this.myInput = ""
            // 消息提示 - 评论成功
            if(res.data.success) {
                this.messageList.push({
                    content: "评论成功"
                })
            }
        }
    }
}
</script>

<style scoped lang="less">
// 评论框
.comment-box {
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    display: flex;
    column-gap: 20rpx;
    width: 750rpx;
    padding: 0 30rpx;
    background-color: #fff;
    .box {
        flex: 1;
        border-radius: 20rpx;
        min-height: 80rpx;
        border: 2px solid #ccc;
        padding: 0 20rpx;
        margin: 20rpx 0 40rpx;
        transition: all .5s ease 0s;
        &:hover {
            border: 2px solid #3498db;
        }
    }
    .confirm {
        width: 120rpx;
        height: 80rpx;
        align-self: flex-end;
        margin-bottom: 40rpx;
        background-color: #3498db!important;
        color: #fff;
        font-weight: bold;
    }
}
</style>