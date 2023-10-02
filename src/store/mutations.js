export default {
    // 设置用户登录态
    async setUserStatus(state, payload) {
        /**
         * | id | name | password | age | gender | email | picture |
         * | jwtToken | articleCount | followers | subscribes |
        */
        state.user = payload
    },
    // 清除用户登录态
    async clearUserStatus(state) {
        state.user = null
    }
}