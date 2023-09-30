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

	export default {
		components: {
			GdpuMessage, GdpuLoading, CategoryList, ArticleList
		},
		computed: {
			userId() {
				return this.$store.state.user?.id || null;
			}
		},
		async onLoad() {
			await sleep(300)
		},
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
