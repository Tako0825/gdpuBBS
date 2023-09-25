<template>
  <view class="container">

    <!-- 展示: content | createtime | like | likeNumber | star | stars -->
    <!-- 查询: authorId -> 作者头像和用户名 | articleCategory -> 当前文章所属分类 -->
    <view class="article">
        <view class="content">{{ content }}</view>
        <view class="createtime">{{ createtime }}</view>
        <view class="like">{{ like }}</view>
        <view class="likeNumber">{{ likeNumber }}</view>
        <view class="star">{{ star }}</view>
        <view class="stars">{{ stars }}</view>
    </view>
  </view>
</template>

<script>
import http from "../../http/index"
export default {
    data() {
        return {
            userId: 1,
            content: undefined,
            createtime: undefined,
            like: undefined,
            likeNumber: undefined,
            star: undefined,
            stars: undefined,

            category: undefined,
            avator: undefined,
            authorName: undefined
        }
    },

    async onLoad(params) {
        const { id: articleId } = params
        await this.getArticle(articleId)
    },

    methods: {
        // 获取文章详情
        async getArticle(articleId) {
            const res = await http(`/articles/?articleId=${articleId}&userId=${this.userId}`, {
                method: "GET"
            })
            this.article = res.data
            console.log(this.article);
        }
    }
}
</script>

<style>

</style>