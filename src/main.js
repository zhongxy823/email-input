// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import './style/static.scss'
import './style/style.scss'
import * as _utils from '@/utils/index'
import * as _global from '@/utils/global'
import * as filters from '@/filters/index'
import 'babel-polyfill'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype._utils = _utils
Vue.prototype._global = _global

// 添加过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
