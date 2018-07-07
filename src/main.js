// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import 'vuetify/dist/vuetify.min.css'
import store from './store/index'

window.Bus=new Vue;
window.axios=axios

window.token= localStorage.getItem('token');
window.user= localStorage.getItem('user');

axios.defaults.baseURL = 'http://passport.test/api';
axios.defaults.headers.common['Authorization'] = "Bearer " + window.token;

axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
