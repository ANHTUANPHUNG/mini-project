import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import 'boxicons/css/boxicons.min.css';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from "vue-apexcharts";
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { filters } from './components/core/filters'
import store from '@/store/index'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import Vuex from 'vuex'
export const eventBus = new Vue()

Vue.use(Bootstrap)
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2);
Vue.use(filters)

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});
Vue.use(BootstrapVue)
Vue.component("apexchart", VueApexCharts);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),     store,

}).$mount('#app')
