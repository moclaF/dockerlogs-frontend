import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
// import socketio from 'socket.io-client';
// import VueSocketio from 'vue-socket.io';

Vue.config.productionTip = false
// Vue.use(VueSocketio, socketio('http://172.16.20.148:3000/'));
new Vue({
  render: h => h(App),
}).$mount('#app')
