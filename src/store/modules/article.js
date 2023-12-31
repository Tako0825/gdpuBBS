import http from "@/utils/http"
export default {
    namespaced: true,
    state() {
        return {
            id: null, // 当前文章id
            article: null, // 当前文章详情
            author: null, // 当前文章作者
            commentList: new Array(), // 当前评论列表
            articleList: new Array(), // 当前首页文章列表
            categoryId: null, // 当前首页分类id
            pageNum: 1, // 当前显示页数
            pageSize: 10 // 每页文章个数
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
        },
        getCommentList(state) {
            return state.commentList
        },
        getCategoryId(state) {
            return state.categoryId
        },
        getPageNum(state) {
            return state.pageNum
        },
    },
    mutations: {
        setArticleList(state, payload) {
            state.articleList = payload
        },
        appendArticleList(state, payload) {
            state.articleList = Array.prototype.concat(state.articleList, payload)
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
        },
        setCommentList(state, payload) {
            state.commentList = payload
        },
        setCategoryId(state, payload) {
            state.categoryId = payload
        },
        setPageNum(state, payload) {
            state.pageNum = payload
        },
    },
    actions: {
        // 请求 - 根据分类id获取文章列表 (默认传入分类id为-1, 即获取全部文章)
        async fetchArticleList({ state, commit }, payload = {
            cid: -1,
            pageNum: 1,
            pageSize: 10
        }) {
            commit("setCategoryId", payload.cid)
            const { cid, pageNum, pageSize } = payload
            const { data } = await http("/articles/wx/articleInfo", {
                method: "GET",
                data: {
                    cid,
                    pageNum,
                    pageSize
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
            const commentList = await dispatch("fetchCommentList", state.id)
            commit("setCommentList", commentList)
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
        },

        // 请求 - 该文章对应评论列表
        async fetchCommentList({ state }, payload) {
            const { data } = await http(`/comments/${payload}`, {
                methods: "GET"
            })
            return data
        },

        // 请求 - 发送评论
        async sendComment({ state, commit, dispatch }, payload) {
            const res = await http("/comments/sendComment", {
                method: "POST",
                header: {
                    Authorization: `Bearer ${payload.user.jwtToken}`
                },
                data: {
                    content: payload.content,
                    commenterId: payload.user.id,
                    attachArticle: payload.articleId,
                    createtime: new Date(),
                    id: 0
                }
            })
            // 发送评论后 - 刷新评论列表
            const commentList = await dispatch("fetchCommentList", payload.articleId)
            commit("setCommentList", commentList)
            return res
        }
    }
}