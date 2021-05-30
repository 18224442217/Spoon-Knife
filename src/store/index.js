import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

// 引入store对象
import user from './Core_store/user'
import order from './Core_store/order'

export default new vuex.Store({
  modules: {
    user,
    order
  }
})
