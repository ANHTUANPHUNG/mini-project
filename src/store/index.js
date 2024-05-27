import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    name: 'a'
  },
  actions: {
    //food
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
        method: 'DELETE',
        url: "http://localhost:3300/food/" +id,
      });
      return response;
    },
        //drink

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
      return response;
    },
    //speacilty
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
      let response = await Vue.axios({
        method: 'PUT',
        url: "http://localhost:3300/specialty/" + id,
        data: entry
      });
      return response.data;
    },
    async DeleteSpecialty(_,id) {
      let response = await Vue.axios({
        method: 'DELETE',
        url: "http://localhost:3300/specialty/" + id,
      }); 
      return response;
    },
    //user
    async ListUser() {
      let response = await Vue.axios({
        method: 'GET',
        url: "http://localhost:3300/users",
      });
      return response.data;
    },
    async GetByIdUser(_,id) {
      let response = await Vue.axios({
        method: 'GET',
        url: "http://localhost:3300/users/" +id,
      });
      return response.data;
    },
    async CreateUser(_,entry) {
      let response = await Vue.axios({
        method: 'POST',
        url: "http://localhost:3300/users",
        data: entry
      });
      return response.data;
    },
    async PasswordUser(_,{id,entry}) {
      let response = await Vue.axios({
        method: 'PATCH',
        url: "http://localhost:3300/users/" + id,
        data: entry
      });
      return response.data;
    },
    //bill
    async ListBill() {
      let response = await Vue.axios({
        method: 'GET',
        url: "http://localhost:3300/bills",
      });
      return response.data;
    },
    async GetByIdBill(_,id) {
      let response = await Vue.axios({
        method: 'GET',
        url: "http://localhost:3300/bills/" +id,
      });
      return response.data;
    },
    async CreateBill(_,entry) {
      let response = await Vue.axios({
        method: 'POST',
        url: "http://localhost:3300/bills",
        data: entry
      });
      return response.data;
    },
    async UpdateBill(_,{id,entry}) {
      let response = await Vue.axios({
        method: 'PATCH',
        url: "http://localhost:3300/bills/" + id,
        data: entry
      });
      return response.data;
    },
    async StatusBill(_,{id,entry}) {
      let response = await Vue.axios({
        method: 'PATCH',
        url: "http://localhost:3300/bills/" + id,
        data: entry
      });
      return response.data;
    },
    async DeleteBill(_,id) {
      const status = 1
      let response = await Vue.axios({
        method: 'PATCH',
        url: "http://localhost:3300/bills/" + id,
        data: {delete:status}

      }); 
      return response;
    },
    //img
    async ListImg() {
      let response = await Vue.axios({
        method: 'GET',
        url: "http://localhost:3300/img",
      });
      return response.data;
    },
  }
});

Vue.prototype.$store = store;
export default store;
