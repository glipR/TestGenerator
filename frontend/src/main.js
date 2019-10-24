import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueMathjax from 'vue-mathjax'

Vue.use(VueMathjax)
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
