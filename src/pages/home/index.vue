<template>
	<view class="container">
		<!-- 分类列表 -->
		<view class="nav">
			<text class="nav-item"
				v-for="(item) in categoryList" 
				:key="item.id"
				@click="findCategory(item.id)"
			>{{ item.category }}</text>
		</view>

		<!-- 加载组件 -->
		<view v-if="sleepStatus" class="loading">loading...</view>

		<!-- 文章列表 -->
		<view class="article">
			<!-- 展示 - articleBrief | authorName | creatTime | imgURL | likeCount | starCount -->
			<!--  查询 - articleCategory => category -->
			<view 
				class="card"
				v-for="(item) in articleList"
				:key="item.articleId"
				@click="findArticle(item.articleId)"
			>
				<view class="user">
					<view class="avatar">
						<img :src="item.imgURL" alt="用户头像">
					</view>
					<view class="authorName">{{ item.authorName }}</view>
				</view>
				<text class="articleBrief">{{ item.articleBrief }}</text>
				<text class="creatTime">{{ formatCreateTime(item.creatTime) }}</text>
				<view class="controls">
					<text class="starCount">{{ item.starCount }}</text>
					<text class="likeCount">{{ item.likeCount }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from "@/http/index"

	export default {
		data() {
			return {
				sleepStatus: false,
				pageNum: 1,
				pageSize: 10,
				categoryList: new Array(),
				articleList: new Array()
			}
		},
		async onLoad() {
			await this.getCategoryList()
			await this.getArticleList()	
		},
		methods: {
			// 时间格式化
			formatCreateTime(createTime) {
				const date = new Date(createTime)
				return `${date.toLocaleDateString()} ${date.toLocaleTimeString("it-IT")}`
			},

			// 获取分类列表
			async getCategoryList() {
				const res = await http("/articles/category/all", {
					method: "GET",
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
				})
				this.categoryList = res.data
			},

			// 获取文章列表
			async getArticleList() {
				await this.sleep()
				const res = await http("/articles/wx/articleInfo", {
					method: "GET",
					data: {
						cid: -1,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
				})
				await this.wakeup()
				this.articleList = res.data
			},

			// 分类查询文章
			async findCategory(id) {
				this.articleList = []
				await this.sleep()
				const res = await http("/articles/wx/articleInfo", {
					method: "GET",
					data: {
						cid: id,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
				})
				await this.wakeup()
				this.articleList = res.data
			},

			// 查询指定文章
			findArticle(id) {
				uni.navigateTo({
					 url: `./article?id=${id}`,
				});
			},

			// 睡觉函数
			async sleep(duration = 500) {
				return new Promise(resolve => {
					this.sleepStatus = true
					setTimeout(() => {
						resolve()
					}, duration)
				})
			},

			// 唤醒函数
			async wakeup() {
				this.sleepStatus = false
			},
		}
	}
</script>

<style lang="less">
	.container {
		display: flex;
		flex-direction: column;
		row-gap: 50rpx;
		width: 750rpx;
		min-height: 100vh;
		overflow-x: hidden;
		background-color: #ecf0f1;
		// 分类导航
		.nav {
			width: 100%;
			background-color: #fff;
			.nav-item {
				box-sizing: border-box;
				display: inline-block;
				width: 150rpx;
				height: 150rpx;
				padding: 10rpx;
			}
		}

		// 文章列表
		.article {
			.card {
				position: relative;
				padding: 20rpx;
				margin-bottom: 20rpx;
				background-color: #fff;
				border-bottom: 2px solid #3498db;
				border-radius: 20rpx;

				.user {
					display: flex;
					align-items: center;
					column-gap: 30rpx;
					.avatar {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						overflow: hidden;
						background-color: #bdc3c7;
						img {
							width: 100%;
							height: 100%;
						}
					}
				}

				// 文章内容
				.articleBrief {
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
					margin: 30rpx 0;
				}
				
				// 文章创建时间
				.createTime {
					display: inline-block;
					height: 50rpx;
				}

				.controls {
					display: flex;
					column-gap: 20rpx;
					position: absolute;
					right: 20rpx;
					bottom: 20rpx;

					.category {
						background-color: #2ecc71;
					}

					// 文章点赞数
					.likeCount {
						width: 50rpx;
						height: 50rpx;
						background-color: #c0392b;
					}

					// 文章收藏数
					.starCount {
						width: 50rpx;
						height: 50rpx;
						background-color: #f1c40f;
					}
				}
			}
		}

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
