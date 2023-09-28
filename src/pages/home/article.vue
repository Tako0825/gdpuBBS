<template>
  <view class="container">

    <!-- 文章详情 -->
    <view class="cu-card dynamic">
        <view class="cu-item shadow">
            <view class="cu-list menu-avatar">
                <view class="cu-item">
                    <view class="avatar cu-avatar round lg">
                        <img :src="avatar" alt="作者头像">
                    </view>
                    <view class="content flex-sub">
                        <view>{{ authorName }}</view>
                        <view class="text-gray text-sm flex justify-between">
                            {{ article.createtime }}
                        </view>
                    </view>
                </view>
            </view>
            <view class="text-content">
                {{ article.content }}
            </view>
            <view class="controls text-gray text-sm text-right padding">
                <view class="likeCount">
                    <like :status="like"/>
                    <text>{{ article.likeNumber }}</text>
                </view>
                <view class="starCount">
                    <star :status="article.star"/>
                    <text>{{ article.stars?article.stars:0 }}</text>
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
            <view class="avatar cu-avatar round">
                <img :src="item.authorPicture" alt="用户头像">
            </view>
            <view class="content">
                <view class="text-grey">{{ item.author }}</view>
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

    <view>
        <input type="text">
    </view>
</view>

</template>

<script>
import http from "@/utils/http"
import auth from "@/utils/auth"
import like from "@/components/like"
import star from "@/components/like"

export default {
    components: {
        like, star
    },
    data() {
        return {
            // 文章详情
            article: null,
            // 作者详情
            avatar: undefined,
            authorName: undefined,
            category: undefined,
            // 评论列表
            commentList: new Array()
        }
    },
    computed: {
        userId() {
            return this.$store.state.user?.id || null;
        }
    },
    async onLoad(params) {
        const { id: articleId } = params
        if(!auth()) {
            return uni.navigateTo({
                url: "./auth"
            })
        }
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
            this.article = {
                content,
                createtime,
                like,
                likeNumber,
                star,
                stars,
                authorId,
                articleCategory,
            }
        },

        // 获取作者详情 (头像、用户名)
        async getAuthor() {
            const { data: user } = await http(`/users/${this.article.authorId}`, {
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

<style scoped lang="less">
    .avatar {
        overflow: hidden;
        img {
            width: 100%!important;
            height: 100%!important;
        }
    }

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