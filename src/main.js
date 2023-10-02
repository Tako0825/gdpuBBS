import Vue from 'vue'
import App from './App'
import store from './store/index'
import './uni.promisify.adaptor'

Vue.config.productionTip = false
Vue.prototype.towxml = require('./static/towxml/index.js')

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
