import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import 'boxicons/css/boxicons.min.css';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue'
// import apexCharts from "vue-apexcharts";
export const eventBus = new Vue()
Vue.use(Bootstrap)
// Vue.use(ApexCharts)
// Vue.use(apexCharts);
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
