<template>
  <view class="container">

    <!-- 文章详情 -->
    <ArticleDetail/>

    <!-- 评论列表 -->
    <CommentList/>

    <!-- 评论框 -->
    <CommentBox/>
</view>

</template>

<script>
import ArticleDetail from "@/views/article/article-detail.vue"
import CommentList from "@/views/article/comment-list.vue"
import CommentBox from "@/views/article/comment-box.vue"
import { createNamespacedHelpers } from "vuex"
const { mapMutations } = createNamespacedHelpers("article")
export default {
    components: {
        ArticleDetail, CommentList, CommentBox
    },
    computed: {
        userId() {
            return this.$store.state.user?.id || null;
        }
    },
    async onLoad(params) {
        const { id: articleId } = params
        this.setArticleId(articleId)
    },

    methods: {
        ...mapMutations([
            "setArticleId"
        ]),
    }
}
</script>

<style scoped lang="less">
    .container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
</style>