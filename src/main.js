// 导入所需模块
// ajax
import axios from 'axios'
import VueAxios from 'vue-axios'
// import './mock/index'

// ui 框架
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import { CountDown } from 'vant'
Vue.use(CountDown)

// 页面框架
// import Header from './layout/header'
// import Footer from './layout/footer'

// 状态管理
import vuex from 'vuex'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 响应式
import 'amfe-flexible'
import setRem from './utils/setRem'

import BMap from 'vue-baidu-map'
import { saveUrlParams } from './utils/urlParser'
saveUrlParams(location.href)

Vue.use(BMap, {
  ak: 'cKmTBGIf5XjTkdqGrZoCIW311mNVyget'
})
Vue.config.productionTip = false

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(vuex)
Vue.use(Vant)

// 懒加载
Vue.use(Lazyload)
// 图片预览

// 设置rem
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
