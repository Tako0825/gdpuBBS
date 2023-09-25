<template>
  <view class="container">

    <!-- 用户头像、用户名 -->
    <view class="author">
        <view class="author-nickName">{{ authorName }}</view>
        <view class="author-avatar">
            <img :src="avatar" alt="用户头像">
        </view>
    </view>
    <!-- 文章详情 -->
    <view class="article">
        <view class="createtime">{{ createtime }}</view>
        <view class="content">{{ content }}</view>
        <view class="like">{{ like }}</view>
        <view class="likeNumber">{{ likeNumber }}</view>
        <view class="star">{{ star }}</view>
        <view class="stars">{{ stars?stars:0 }}</view>
    </view>

    <!-- 评论 -->
    <!-- author | authorPicture | content | createtime -->
    <view class="commentList" v-for="(item, index) in commentList" :key="index">
        <view class="user">
            <view class="user-avatar">
                <img :src="item.authorPicture" alt="">
            </view>
            <view class="user-nickName">{{ item.author }}</view>
        </view>
        <view class="comment-content">{{ item.content }}</view>
        <view class="comment-createtime">{{ item.createtime }}</view>
    </view>
  </view>
</template>

<script>
import http from "../../http/index"
export default {
    data() {
        return {
            userId: 1,
            // 文章详情
            content: undefined,
            createtime: undefined,
            like: undefined,
            likeNumber: undefined,
            star: undefined,
            stars: undefined,
            // 作者详情
            authorId: undefined,
            articleCategory: undefined,
            avatar: undefined,
            authorName: undefined,
            category: undefined,
            // 评论
            commentList: new Array()
        }
    },

    async onLoad(params) {
        const { id: articleId } = params
        await this.getArticle(articleId)
        await this.getAuthor()
        await this.getComment(articleId)
    },

    methods: {
        // 获取文章详情
        async getArticle(articleId) {
            const res = await http(`/articles/?articleId=${articleId}&userId=${this.userId}`, {
                method: "GET"
            })
            const { content, createtime, like, likeNumber, star, stars, authorId, articleCategory } = res.data.data
            this.content = content
            this.createtime = createtime
            this.like = like
            this.likeNumber = likeNumber
            this.star = star
            this.stars = stars
            this.authorId = authorId
            this.articleCategory = articleCategory
        },

        // 获取作者详情 (头像、用户名)
        async getAuthor() {
            const { data: user } = await http(`/users/${this.authorId}`, {
                method: "GET"
            })
            const { picture = "../../static/avatar.png", nickName } = user
            this.avatar = picture?picture:"../../static/avatar.png"
            this.authorName = nickName
        },

        // 获取评论详情
        async getComment(articleId) {
            const { data: commentList } = await http(`/comments/${articleId}`, {
                methods: "GET"
            })
            this.commentList = commentList
        }
    }
}
</script>

<style>
    .article {
        display: flex;
        flex-direction: column;
        row-gap: 40rpx;
    }
</style>