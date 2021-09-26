import Vue from 'vue'
import App from './App.vue'
import VueResource from "vue-resource"
Vue.use(VueResource);
Vue.http.options.root = 'https://192.168.10.185/api/v1/';
new Vue({
  el: '#app',
  render: h => h(App)
})
