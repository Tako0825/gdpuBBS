<template>
	<view class="container">

		<!-- 分类导航 -->
		<view class="nav-container">
			<view class="nav">
				<text class="nav-item"
					v-for="(item) in categoryList"
					:key="item.id"
					@click="findCategory(item.id)"
				>
					<text class="title">{{ item.category }} </text>
				</text>
			</view>
		</view>

		<!-- 加载组件 -->
		<view v-if="sleepStatus" class="loading">loading...</view>

		<!-- 文章列表 -->
		<view class="article">
			<view 
				class="card"
				v-for="(item) in articleList"
				:key="item.articleId"
				@click="pageToArticle(item.articleId)"
			>
				<view class="user">
					<view class="avatar">
						<img :src="item.imgURL" alt="用户头像">
					</view>
					<view class="authorName">{{ item.authorName }}</view>
				</view>
				<text class="articleBrief">{{ item.articleBrief }}</text>
				<text class="creatTime">{{ formatDate(item.creatTime) }}</text>
				<view class="controls">
					<view class="likeCount">
						<like :status="item.isLike"/>
						<text>{{ item.likeCount }}</text>
					</view>
					<view class="starCount">
						<star :status="item.isStar"/>
						<text>{{ item.starCount }}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import http from "@/utils/http"
	import formatDate from "@/utils/formatDate"
	import like from "@/components/like"
	import star from "@/components/star"

	export default {
		components: {
			like, star
		},
		data() {
			return {
				userId: 9,
				sleepStatus: false,
				pageNum: 1,
				pageSize: 10,
				categoryList: new Array(),
				articleList: new Array(),
			}
		},
		async onLoad() {
			await this.getCategoryList()
			await this.getArticleList()	
		},
		methods: {
			formatDate,

			// 获取分类列表
			async getCategoryList() {
				const { data } = await http("/articles/category/all", {
					method: "GET",
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
				})
				this.categoryList = data
			},

			// 获取文章列表
			async getArticleList() {
				await this.sleep()
				const { data } = await http("/articles/wx/articleInfo", {
					method: "GET",
					data: {
						cid: -1,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
				})
				for (let item of data) {
					item.isLike = await this.isLike(item.articleId)
				}
				for (let item of data) {
					let res = await this.isStar(item.articleId)
					item.isStar = res.star
				}
				await this.wakeup()
				this.articleList = data
			},

			// 判断当前用户是否对点赞相应文章
			async isLike(articleId) {
				const res = await http("/like/islike", {
					method: "GET",
					data: {
						articleId,
						userId: this.userId
					}
				})
				return res.data
			},

			// 判断当前用户是否收藏相应文章
			async isStar(articleId) {
				const res = await http("/star/info", {
					method: "GET",
					data: {
						articleId,
						userId: this.userId
					}
				})
				return res.data
			},

			// 分类查询文章
			async findCategory(id) {
				this.articleList = []
				await this.sleep()
				const { data } = await http("/articles/wx/articleInfo", {
					method: "GET",
					data: {
						cid: id,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
				})
				for (let item of data) {
					item.isLike = await this.isLike(item.articleId)
				}
				for (let item of data) {
					let res = await this.isStar(item.articleId)
					item.isStar = res.star
				}
				await this.wakeup()
				this.articleList = data
			},

			// 跳转至指定文章
			pageToArticle(id) {
				uni.navigateTo({
					 url: `./article?id=${id}`,
				});
			},

			// 睡觉函数
			async sleep(duration = 250) {
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
		flex-direction: row;
		row-gap: 50rpx;
		width: 750rpx;
		min-height: 100vh;
		overflow-x: hidden;
		background-color: #ecf0f1;

		.nav-container {
			width: 150rpx;
			height: 100vh;
		}

		// 分类导航
		.nav {
			position: fixed;
			top: 0;
			left: 0;
			width: 150rpx;
			height: 100vh;
			overflow-y: auto;
			background-color: #fff;
			.nav-item {
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				position: relative;
				box-sizing: border-box;
				width: 150rpx;
				height: 150rpx;
				margin: 20rpx 0;
				padding: 10rpx;
			}
			
			.nav-item:nth-of-type(n)::after {
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
				content: "";
				display: block;
				width: 100rpx;
				height: 100rpx;
				background-size: contain;
				background-repeat: no-repeat;
			}

			.nav-item:nth-of-type(1)::after {
				background-image: url("../../static/degree-hat.png");
			}
			.nav-item:nth-of-type(2)::after {
				background-image: url("../../static/landscape.png");
			}
			.nav-item:nth-of-type(3)::after {
				background-image: url("../../static/laptop.png");
			}
			.nav-item:nth-of-type(4)::after {
				background-image: url("../../static/resting.png");
			}
			.nav-item:nth-of-type(5)::after {
				background-image: url("../../static/triangle.png");
			}
			.nav-item:nth-of-type(6)::after {
				background-image: url("../../static/finance.png");
			}
		}

		// 文章列表
		.article {
			flex: 1;
			.card {
				position: relative;
				padding: 20rpx;
				margin-bottom: 20rpx;
				background-color: #fff;
				border-bottom: 2px solid #3498db;
				border-radius: 0 0 20rpx 20rpx;

				.user {
					display: flex;
					align-items: center;
					column-gap: 30rpx;
					// 用户头像
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

					// 文章点赞数
					// 文章收藏数
					.likeCount,
					.starCount {
						display: flex;
						justify-content: space-between;
						align-items: center;
						column-gap: 10rpx;
						height: 50rpx;
						img {
							width: 50rpx;
							height: 50rpx;
						}
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
