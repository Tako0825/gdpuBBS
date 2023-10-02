<template>
    <view class="nav">
        <text 
            class="nav-item slide-left"
            v-for="(item) in getCategoryList"
            :key="item.id"
            @click="findArticleByCategory(item.id)"
        >
            <text class="title text-black">{{ item.category }} </text>
        </text>
    </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("category")
const { mapMutations: mapArticleMutations, mapActions: mapArticleActions } = createNamespacedHelpers("article")
export default {
    computed: {
      ...mapGetters([
        "getCategoryList"
      ])
    },
    async mounted() {
        await this.myCategoryList()
    },
    methods: {
        ...mapMutations([
            "setCategoryList"
        ]),
        ...mapActions([
            "fetchCategoryList"
        ]),
        ...mapArticleMutations([
            "setArticleList"
        ]),
        ...mapArticleActions([
            "fetchArticleList"
        ]),
        // 获取状态 - 所有文章
        async myCategoryList() {
            const categoryList = await this.fetchCategoryList()
            this.setCategoryList(categoryList)
        },

        // 获取状态 - 指定分类所有文章
        async findArticleByCategory(cid) {
            this.setArticleList([])
            const categoryList = await this.fetchArticleList({
                cid,
                pageNum: 1,
                pageSize: 10
            })
            this.setArticleList(categoryList)
        }
    }
}
</script>

<style scoped lang="less">
.nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 150rpx;
    min-height: 100vh;
    overflow-y: auto;
    background-color: #fff;
    .nav-item {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: relative;
        box-sizing: border-box;
        width: 130rpx;
        height: 130rpx;
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
        width: 80rpx;
        height: 80rpx;
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
</style>