<template>
    <view>
        <!-- 文章详情 -->
        <view v-if="getArticle" class="article cu-card dynamic">
            <view class="article-core cu-item shadow">
                <view class="cu-list menu-avatar">
                    <view class="cu-item">
                        <view class="avatar cu-avatar round lg">
                            <img :src="getAuthor.picture" alt="作者头像">
                        </view>
                        <view class="content flex-sub">
                            <view>{{ getAuthor.nickName }}</view>
                            <view class="text-gray text-sm flex justify-between">
                                {{ formatDate(getArticle.createtime) }}
                            </view>
                        </view>
                    </view>
                </view>
                <view class="text-content">
                    <towxml :nodes="content"/>
                </view>
            </view>
        </view>

        <!-- 控件 -->
        <view v-if="getArticle" class="controls">
            <view class="control">
                <view class="icon"><like :status="getArticle.like"/></view>
                <text class="count">{{ getArticle.likeNumber }}</text>
            </view>
            <view class="control">
                <view class="icon"><star :status="getArticle.star"/></view>
                <text class="count">{{ getArticle.stars?getArticle.stars:0 }}</text>
            </view>
        </view>

        <!-- 加载组件 -->
        <GdpuLoading v-if="!content"/>
    </view>
</template>

<script>
import towxml from '@/static/towxml/towxml'
import formatDate from "@/utils/formatDate"
import sleep from "@/utils/sleep"
import { createNamespacedHelpers } from "vuex"
import like from "@/components/like"
import star from "@/components/star"
import GdpuLoading from "@/components/gdpu-loading"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("article")
export default {
    components: {
        like, star, GdpuLoading, towxml
    },
    data() {
        return {
            content: ""
        }
    },
    computed: {
        ...mapGetters([
            "getArticle", "getArticleId", "getAuthor"
        ])
    },
    async mounted() {
        await sleep()
        await this.myArticleDetail()
        this.content = this.towxml(this.getArticle.content, "markdown")
    },
    methods: {
        formatDate,
        
        ...mapMutations([
            "setArticleId", "setArticle", "setAuthor"
        ]),
        ...mapActions([
            "fetchArticleDetail"
        ]),
        // 获取文章详情
        async myArticleDetail() {
            const article = await this.fetchArticleDetail(this.$store.state.user.id)
            this.setArticle(article)
        }
    }
}
</script>

<style scoped lang="less">
// 文章详情
.article {
    width: 750rpx;
    padding: 30rpx;
    .article-core {
        max-width: 100%;
        margin: 0;
    }
    .avatar {
        overflow: hidden;
        img {
            width: 100%!important;
            height: 100%!important;
        }
    }
    .content {
        display: flex;
        column-gap: 20rpx;
    }
    .text-content {
        width: 100%!important;
        height: auto;
        overflow: visible!important;
        max-height: none!important;
    }
}

// 控件
.controls {
    position: fixed;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 40rpx;
    width: 100rpx;
    height: 100vh;
    background-color: transparent;
    .control {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        row-gap: 10rpx;
        font-size: 16px;
        .icon {
            width: 70rpx;
            height: 70rpx;
        }
    }
}
</style>