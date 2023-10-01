<template>
<view>
    <view 
        v-for="(item, index) in getCommentList"
        :key="index"
        class="commentList cu-list menu-avatar comment solids-top"
    >
        <view class="comment cu-item">
            <view class="avatar cu-avatar round">
                <img :src="item.authorPicture" alt="用户头像">
            </view>
            <view class="content">
                <view class="text-grey">{{ item.author }}</view>
                <view class="padding-sm radius margin-top-sm text-sm light">
                    <view class="flex">
                        <view class="flex-sub text-grey">{{ item.content }}</view>
                    </view>
                </view>
                <view class="margin-top-sm flex justify-between">
                    <view class="text-gray text-df">{{ formatDate(item.createtime) }}</view>
                </view>
            </view>
        </view>
    </view>
</view>
</template>

<script>
import formatDate from "@/utils/formatDate"
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers("article")
export default {
    computed: {
        ...mapGetters([
            "getCommentList"
        ])
    },
    methods: {
        formatDate
    }
}
</script>

<style scoped lang="less">
    // 评论列表
    .commentList {
        .comment {
            width: 570rpx;
            margin-left: 30rpx;
            border-radius: 10rpx;
            .avatar {
            overflow: hidden;
                img {
                    width: 100%!important;
                    height: 100%!important;
                }
            }
        }
    }
</style>