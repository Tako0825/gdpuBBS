export default {
    //相当于同步的操作
    async setUserStatus(state, payload) {
        /**
         * | id | name | password | age | gender | email | picture |
         * | jwtToken | articleCount | followers | subscribes |
        */
        state.user = payload
    }
}