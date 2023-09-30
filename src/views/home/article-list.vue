<template>
<view>
    <view class="article">
        <view
            v-for="(item) in getArticleList"
            :key="item.articleId"
            @click="pageToArticle(item.articleId)"
            class="card cu-list menu-avatar comment solids-top shadow slide-bottom"
        >
            <view class="card-item cu-item flex">
                <view class="user flex align-center">
                    <view class="cu-avatar round fl" :style="{ 'background-image': `url(${item.imgURL})` }"></view>
                    <view class="text-grey ">{{ item.authorName }}</view>
                </view>
                <view class="content">
                    <view class="text-black padding-sm margin-top-sm margin-bottom-sm radius text-sm">
                        <view class="flex">
                            <view class="card-content">{{ item.articleBrief }}</view>
                        </view>
                    </view>
                    <view class="flex justify-between">
                        <view class="text-gray text-df">{{ formatDate(item.creatTime) }}</view>
                    </view>
                    <view class="controls">
                        <view class="likeCount">
                            <div class="icon"><like :status="item.isLike"/></div>
                            <text>{{ item.likeCount }}</text>
                        </view>
                        <view class="starCount">
                            <div class="icon"><star :status="item.isStar"/></div>
                            <text>{{ item.starCount }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>

    <!-- 弹窗 - 登录提示 -->
    <GdpuModal
        v-bind:show="authShow"
        v-on:authShow="authShow=$event"
        v-bind:content="'请先进行登录'"
    ></GdpuModal>

    <!-- 加载组件 -->
    <GdpuLoading v-if="!getArticleList.length"/>
</view>
</template>

<script>
import formatDate from "@/utils/formatDate"
import sleep from "@/utils/sleep"
import like from "@/components/like.vue"
import star from "@/components/star.vue"
import GdpuModal from "@/components/gdpu-modal.vue"
import GdpuLoading from "@/components/gdpu-loading.vue"
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("article")
export default {
    components: {
        GdpuLoading, GdpuModal, like, star
    },
    data() {
        return {
            authShow: false
        }
    },
    computed: {
      ...mapGetters([
        "getArticleList"
      ])  
    },
    async mounted() {
        await this.myArticleList()
    },
    methods: {
        formatDate,

        ...mapMutations([
            "setArticleList"
        ]),
        ...mapActions([
            "fetchArticleList"
        ]),

        // 获取状态 - 文章列表
        async myArticleList() {
            await sleep()
            const articleList = await this.fetchArticleList()
            this.setArticleList(articleList)
        },

        // 跳转至指定文章
        pageToArticle(id) {
            if(!this.$store.state.user) {
                return this.authShow = true
            }
            uni.navigateTo({
                url: `./article?id=${id}`,
            });
        }
    }
}
</script>

<style scoped lang="less">
// 文章列表
.article {
    overflow: hidden;
    flex: 1;
    .card {
        padding: 0 20rpx;
        position: relative;
        margin-bottom: 20rpx;
        .card-item {
            display: flex;
            flex-direction: column;
            padding: 20rpx;
            border-radius: 20rpx;
            .user {
                width: 100%;
                justify-content: flex-start;
                column-gap: 20rpx;
                font-weight: bold;
            }
            .content {
                width: 100%;
                .card-content {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
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
                .icon {
                    width: 50rpx;
                    height: 50rpx;
                }
            }
        }
    }
}
</style>