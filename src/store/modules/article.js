import http from "@/utils/http"
export default {
    namespaced: true,
    state() {
        return {
            id: null, // 当前文章id
            article: null, // 当前文章详情
            author: null, // 当前文章作者
            articleList: new Array(), // 首页文章列表
            pageNum: 1,
            pageSize: 10
        }
    },
    getters: {
        getArticleList(state) {
            return state.articleList
        },
        getArticleId(state) {
            return state.id
        },
        getArticle(state) {
            return state.article
        },
        getAuthor(state) {
            return state.author
        }
    },
    mutations: {
        setArticleList(state, payload) {
            state.articleList = payload
        },
        setArticleId(state, payload) {
            this.commit("article/setArticle", null)
            this.commit("article/setAuthor", null)
            state.id = payload
        },
        setArticle(state, payload) {
            state.article = payload
        },
        setAuthor(state, payload) {
            state.author = payload
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
        },

        // 请求 - 指定文章
        async fetchArticleDetail({ state, commit, dispatch }, payload) {
            const { data: res } = await http(`/articles/?articleId=${state.id}&userId=${payload}`, {
                method: "GET"
            })
            const author = await dispatch("fetchAuthor", res.data.authorId)
            commit("setAuthor", author)
            return res.data
        },

        // 请求 - 该文章对应作者信息
        async fetchAuthor({ state }, payload) {
            const { data: author } = await http(`/users/${payload}`, {
                method: "GET"
            })
            const { picture, nickName } = author
            return {
                picture,
                nickName
            }
        }
    }
}