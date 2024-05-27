import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    name: 'a'
  },
  actions: {
    async ListFood() {
      let response = await Vue.axios({
        method: 'GET',
        url: "http://localhost:3300/food",
      });
      return response.data;
    },
    async ListDrink() {
      let response = await Vue.axios({
        method: 'GET',
        url: "http://localhost:3300/drink",
      });
      return response.data;
    },
    async ListSpecialty() {
      let response = await Vue.axios({
        method: 'GET',
        url: "http://localhost:3300/specialty",
      });
      return response.data;
    },
  }
});

Vue.prototype.$store = store;
export default store;
