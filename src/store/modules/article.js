import http from "@/utils/http"
export default {
    namespaced: true,
    state() {
        return {
            articleList: new Array(),
            pageNum: 1,
            pageSize: 10,
        }
    },
    getters: {
        getArticleList(state) {
            return state.articleList
        }
    },
    mutations: {
        setArticleList(state, payload) {
            state.articleList = payload
        }
    },
    actions: {
        // 请求 - 根据分类id获取文章列表 (默认传入分类id为-1, 即获取全部文章)
        async fetchArticleList({ state }, payload = -1) {
            const { data } = await http("/articles/wx/articleInfo", {
                method: "GET",
                data: {
                    cid: payload,
                    pageNum: state.pageNum,
                    pageSize: state.pageSize
                }
            })
            return data
        }
    }
}