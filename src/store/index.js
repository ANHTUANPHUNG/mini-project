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
    async CreateFood(_,entry) {
      let response = await Vue.axios({
        method: 'POST',
        url: "http://localhost:3300/food",
        data:entry
      });
      return response.data;
    },
    async GetByIdFood(_,id) {
      let response = await Vue.axios({
        method: 'GET',
        url: "http://localhost:3300/food/" +id,
      });
      return response.data;
    },
    async UpdateFood(_,{id,entry}) {
      let response = await Vue.axios({
        method: 'PUT',
        url: "http://localhost:3300/food/" +id,
        data:entry
      });
      return response.data;
    },
    async DeleteFood(_,id) {
      let response = await Vue.axios({
        method: 'POST',
        url: "http://localhost:3300/food/" +id,
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
    async GetByIdDrink(_,id) {
      let response = await Vue.axios({
        method: 'GET',
        url: "http://localhost:3300/drink/" +id,
      });
      return response.data;
    },
    async CreateDrink(_,entry) {
      let response = await Vue.axios({
        method: 'POST',
        url: "http://localhost:3300/drink",
        data: entry
      });
      return response.data;
    },
    async UpdateDrink(_,{id,entry}) {
      console.log();
      let response = await Vue.axios({
        method: 'PUT',
        url: "http://localhost:3300/drink/" + id,
        data: entry
      });
      return response.data;
    },
    async DeleteDrink(_,id) {
      let response = await Vue.axios({
        method: 'DELETE',
        url: "http://localhost:3300/drink/" +id,
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
    async GetByIdSpecialty(_,id) {
      let response = await Vue.axios({
        method: 'GET',
        url: "http://localhost:3300/specialty/" +id,
      });
      return response.data;
    },
    async CreateSpecialty(_,entry) {
      let response = await Vue.axios({
        method: 'POST',
        url: "http://localhost:3300/specialty",
        data: entry
      });
      return response.data;
    },
    async UpdateSpecialty(_,{id,entry}) {
      console.log();
      let response = await Vue.axios({
        method: 'PUT',
        url: "http://localhost:3300/specialty/" + id,
        data: entry
      });
      return response.data;
    },
    async DeleteSpecialty(_,id) {
      console.log(id);
      let response = await Vue.axios({
        method: 'DELETE',
        url: "http://localhost:3300/specialty/" + id,
      }); 
      return response.data;
    },
  }
});

Vue.prototype.$store = store;
export default store;
