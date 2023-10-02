<template>
	<view class="container">
		<!-- 分类列表 -->
		<view class="category-list">
			<CategoryList></CategoryList>
		</view>
		
		<!-- 文章列表 -->
		<view class="article-list">
			<ArticleList></ArticleList>
		</view>
	</view>
</template>

<script>
	import sleep from "@/utils/sleep"
	import GdpuMessage from "@/components/gdpu-message"
	import GdpuLoading from "@/components/gdpu-loading"
	import CategoryList from "@/views/home/category-list.vue"
	import ArticleList from "@/views/home/article-list.vue"
	import { createNamespacedHelpers } from "vuex"
import article from "../../store/modules/article"
	const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("article")

	export default {
		components: {
			GdpuMessage, GdpuLoading, CategoryList, ArticleList
		},
		computed: {
			...mapGetters([
				"getCategoryId", "getPageNum"
			]),
			userId() {
				return this.$store.state.user?.id || null;
			}
		},
		methods: {
			...mapMutations([
				"setPageNum", "appendArticleList"
			]),
			...mapActions([
				"fetchArticleList"
			]),
		},
		async onLoad() {
			await sleep(300)
		},
		// 触底 - 查询下一页文章并追加至文章列表
		async onReachBottom() {
			const articles = await this.fetchArticleList({
				cid: this.getCategoryId,
				pageNum: this.getPageNum + 1,
				pageSize: 10
			})
			if(articles.length) {
				this.setPageNum(this.getPageNum + 1)
				this.appendArticleList(articles)
			}
		}
	}
</script>

<style scoped lang="less">
	.container {
		display: flex;
		.category-list {
			width: 150rpx;
			min-height: 100vh;
		}

		.article-list {
			width: 600rpx;
			min-height: 100vh;
		}
	}
</style>
