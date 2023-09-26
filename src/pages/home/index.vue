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
				v-for="(item) in articleList"
				:key="item.articleId"
				@click="pageToArticle(item.articleId)"
				class="card cu-list menu-avatar comment solids-top"
			>
				<view class="cu-item">
					<view class="cu-avatar round" :style="{ 'background-image': `url(${item.imgURL})` }"></view>
					<view class="content">
						<view class="text-grey">{{ item.authorName }}</view>
						<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
							<view class="flex">
								<view class="flex-sub">{{ item.articleBrief }}</view>
							</view>
						</view>
						<view class="margin-top-sm flex justify-between">
							<view class="text-gray text-df">{{ formatDate(item.creatTime) }}</view>
						</view>
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
				sleepStatus: false,
				pageNum: 1,
				pageSize: 10,
				categoryList: new Array(),
				articleList: new Array(),
			}
		},
		computed: {
			userId() {
				return this.$store.state.user?.id || null;
			}
		},
		watch: {
			// 监控登录态的变化, 刷新点赞收藏状态
			async userId() {
				this.refreshLikeStar(this.articleList)
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

			// 查询文章列表
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
				await this.refreshLikeStar(data)
				await this.wakeup()
				this.articleList = data
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
				await this.refreshLikeStar(data)
				await this.wakeup()
				this.articleList = data
			},

			// 判断当前用户是否对点赞相应文章
			async isLike(articleId) {
				if(!this.userId)
					return false
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
				if(!this.userId)
					return false
				const res = await http("/star/info", {
					method: "GET",
					data: {
						articleId,
						userId: this.userId
					}
				})
				return res.data
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

			// 刷新当前登录态对应的点赞收藏状态
			async refreshLikeStar(articleList) {
				for(let item of articleList) {
					item.isLike = await this.isLike(item.articleId)
				}
				for(let item of articleList) {
					let res = await this.isStar(item.articleId)
					item.isStar = res.star
				}
			}
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
			overflow: hidden;
			flex: 1;
			.card {
				position: relative;
				padding: 20rpx;
				margin-bottom: 20rpx;
				.controls {
					display: flex;
					column-gap: 15rpx;
					position: absolute;
					right: 0rpx;
					bottom: 0rpx;
					// 文章点赞数
					// 文章收藏数
					.likeCount,
					.starCount {
						display: flex;
						justify-content: space-between;
						align-items: center;
						column-gap: 5rpx;
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
