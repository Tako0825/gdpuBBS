<template>
  <view class="container">

    <GdpuLoading v-if="!article"/>

    <!-- 文章详情 -->
    <view v-if="article" class="article cu-card dynamic">
        <view class="cu-item shadow">
            <view class="cu-list menu-avatar">
                <view class="cu-item">
                    <view class="avatar cu-avatar round lg">
                        <img :src="avatar" alt="作者头像">
                    </view>
                    <view class="content flex-sub">
                        <view>{{ authorName }}</view>
                        <view class="text-gray text-sm flex justify-between">
                            {{ formatDate(article.createtime) }}
                        </view>
                    </view>
                </view>
            </view>
            <view class="text-content">
                {{ article.content }}
            </view>
        </view>
    </view>

    <!-- 评论列表 -->
    <view 
        v-for="(item, index) in commentList"
        :key="index"
        class="commentList cu-list menu-avatar comment solids-top"
    >
        <view class="comment cu-item">
            <view class="avatar cu-avatar round">
                <img :src="item.authorPicture" alt="用户头像">
            </view>
            <view class="content">
                <view class="text-grey">{{ item.author }}</view>
                <view class="padding-sm radius margin-top-sm text-sm light">
                    <view class="flex">
                        <view class="flex-sub text-grey">{{ item.content }}</view>
                    </view>
                </view>
                <view class="margin-top-sm flex justify-between">
                    <view class="text-gray text-df">{{ formatDate(item.createtime) }}</view>
                </view>
            </view>
        </view>
    </view>

    <!-- 控件 -->
    <view v-if="article" class="controls">
        <view class="control">
            <view class="icon"><like :status="article.like"/></view>
            <text class="count">{{ article.likeNumber }}</text>
        </view>
        <view class="control">
            <view class="icon"><star :status="article.star"/></view>
            <text class="count">{{ article.stars?article.stars:0 }}</text>
        </view>
    </view>

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
import http from "@/utils/http"
import auth from "@/utils/auth"
import sleep from "@/utils/sleep"
import formatDate from "@/utils/formatDate"
import like from "@/components/like"
import star from "@/components/star"
import GdpuLoading from "@/components/gdpu-loading.vue"
import GdpuMessage from '@/components/gdpu-message.vue'

export default {
    components: {
        like, star, GdpuLoading, GdpuMessage
    },
    data() {
        return {
            // 文章详情
            article: null,
            // 作者详情
            avatar: undefined,
            authorName: undefined,
            // 评论列表
            commentList: new Array(),
            // todo - 所属分类
            category: undefined,
            // 当前输入内容
            myInput: "",
            // 消息提示列表
            messageList: new Array()
        }
    },
    computed: {
        userId() {
            return this.$store.state.user?.id || null;
        }
    },
    async onLoad(params) {
        const { id: articleId } = params
        if(!auth()) {
            return uni.navigateTo({
                url: "./auth"
            })
        }
        // 监听评论框聚焦事件 - 评论框的高度由键盘高度决定
        wx.onKeyboardHeightChange(res => {
        })
        await sleep()
        await this.getArticle(articleId)
        await this.getAuthor()
        await this.getComment(articleId)
    },

    methods: {
        formatDate,
        sleep,

        // 获取文章详情
        async getArticle(articleId) {
            const res = await http(`/articles/?articleId=${articleId}&userId=${this.userId}`, {
                method: "GET"
            })
            const { content, createtime, like, likeNumber, star, stars, authorId, articleCategory } = res.data.data
            this.article = {
                articleId,
                content,
                createtime,
                like,
                likeNumber,
                star,
                stars,
                authorId,
                articleCategory,
            }
        },

        // 获取作者详情 (头像、用户名)
        async getAuthor() {
            const { data: user } = await http(`/users/${this.article.authorId}`, {
                method: "GET"
            })
            const { picture, nickName } = user
            this.avatar = picture
            this.authorName = nickName
        },

        // 获取评论详情
        async getComment(articleId) {
            const { data: commentList } = await http(`/comments/${articleId}`, {
                methods: "GET"
            })
            this.commentList = commentList
        },

        // 发送评论
        async sendMyInput() {
            const content = this.myInput
            const res = await http("/comments/sendComment", {
                method: "POST",
                header: {
                    Authorization: `Bearer ${this.$store.state.user.jwtToken}`
                },
                data: {
                    content,
                    commenterId: this.$store.state.user.id,
                    attachArticle: +this.article.articleId,
                    createtime: new Date(),
                    id: 0
                }
            })
            await this.getComment(this.article.articleId)
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
    .container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .avatar {
            overflow: hidden;
            img {
                width: 100%!important;
                height: 100%!important;
            }
        }

        // 文章详情
        .article {
            width: 100%;
            .content {
                display: flex;
                column-gap: 20rpx;
            }
        }

        // 评论列表
        .commentList {
            .comment {
                width: 570rpx;
                margin-left: 30rpx;
                border-radius: 10rpx;
            }
        }

        // 控件
        .controls {
            position: fixed;
            right: 0;
            top: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            row-gap: 40rpx;
            width: 150rpx;
            height: 100vh;
            background-color: transparent;
            .control {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                row-gap: 10rpx;
                font-size: 16px;
                .icon {
                    width: 70rpx;
                    height: 70rpx;
                }
            }
        }

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
    }


</style>