<template>
	<view class="container">
		<!-- 分类列表 -->
		<CategoryList></CategoryList>
		
		<!-- 文章列表 -->
		<ArticleList></ArticleList>
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
		flex-direction: row;
		row-gap: 50rpx;
		width: 750rpx;
		min-height: 100vh;
		overflow-x: hidden;
		background-color: #ecf0f1;
		// 加载组件
		.loading {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-weight: bold;
		}
	}
</style>
