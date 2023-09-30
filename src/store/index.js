import Vue from 'vue'
import Vuex from 'vuex'
import state from "@/store/state"
import getters from "@/store/getters"
import mutations from "@/store/mutations"
import actions from "@/store/actions"
import category from "@/store/modules/category"
import article from "@/store/modules/article"

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        category,
        article
    }
})
export default store