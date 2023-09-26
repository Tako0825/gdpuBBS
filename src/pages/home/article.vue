<template>
  <view class="container">

    <!-- 文章详情 -->
    <view class="cu-card dynamic">
        <view class="cu-item shadow">
            <view class="cu-list menu-avatar">
                <view class="cu-item">
                    <view class="cu-avatar round lg" :style="{ 'background-image' : `url(${avatar})` }"></view>
                    <view class="content flex-sub">
                        <view>{{ authorName }}</view>
                        <view class="text-gray text-sm flex justify-between">
                            {{ createtime }}
                        </view>
                    </view>
                </view>
            </view>
            <view class="text-content">
                {{ content }}
            </view>
            <view class="controls text-gray text-sm text-right padding">
                <view class="likeCount">
                    <like :status="like"/>
                    <text>{{ likeNumber }}</text>
                </view>
                <view class="starCount">
                    <star :status="star"/>
                    <text>{{ stars?stars:0 }}</text>
                </view>
            </view>
        </view>
    </view>

    <!-- 评论列表 -->
    <view 
        v-for="(item, index) in commentList"
        :key="index"
        class="cu-list menu-avatar comment solids-top"
    >
        <view class="cu-item">
            <view class="cu-avatar round" :style="{ 'background-image' : `url(${avatar})` }">
                <view>{{ item.author }}</view>
            </view>
            <view class="content">
                <view class="padding-sm radius margin-top-sm text-sm light bg-blue">
                    <view class="flex">
                        <view class="flex-sub text-grey">{{ item.content }}</view>
                    </view>
                </view>
                <view class="margin-top-sm flex justify-between">
                    <view class="text-gray text-df">{{ item.createtime }}</view>
                </view>
            </view>
        </view>
    </view>
</view>

</template>

<script>
import http from "@/utils/http"
import like from "@/components/like"
import star from "@/components/like"

export default {
    components: {
        like, star
    },
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
        }
    }
}
</script>

<style lang="less">
    .controls {
        display: flex;
        column-gap: 15rpx;
        position: absolute;
        right: 0rpx;
        bottom: 0rpx;
        transform: scale(0.8);
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
</style>