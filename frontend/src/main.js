import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './plugins/i18n'
import VTooltip from 'v-tooltip'

Vue.config.productionTip = false
Vue.use(VueClipboard)
Vue.use(VTooltip)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
