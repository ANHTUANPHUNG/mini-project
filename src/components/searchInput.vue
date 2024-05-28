<template>
  <b-form-group>
        <label for="">Tìm kiếm theo tên món đặc sản</label>
        <b-input
          class="col-lg-3 col-sm-6 col-12"
          placeholder="Nhập tên món đặc sản"
          @input="searchInput($event)"
        ></b-input>
      </b-form-group>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: "search-input",
    props:{
        value:Object,
        api: String
    },
  data() {
    return {
      text: "",
      data:{
        entries: [],
      perPage: 5,
      currentPage: 1,
      listData: [],
      rows: 0,
      },
    };
  },
  methods: {
    ...mapActions(['ListSpecialty','ListFood','ListDrink']),
    async searchInput(value) {
      let arr = [];
      let response 
      if(this.api == 'food'){
        response = await this.ListFood()
      }
      if(this.api == 'drink'){
        response = await this.ListDrink()
      }
      if(this.api == 'specialty'){
        response = await this.ListSpecialty()
      }
      response.forEach((element) => {
        if (element.name.toLowerCase().includes(value.toLowerCase())) {
          arr.push(element);
        }
      });
      this.data.listData = arr.reverse();
      this.data.listData.map((element, index) => {
        element.index = index + 1;
      });
      this.data.rows = this.data.listData.length;
      let data = [];
      for (
        let index = this.data.perPage * (this.data.currentPage - 1);
        index < this.data.perPage * this.data.currentPage;
        index++
      ) {
        if (this.data.listData[index]) {
          data.push(this.data.listData[index]);
        }
      }
      this.data.entries = data;

    },
  },
  created() {
    this.data= this.value
  },
};
</script>
<style scoped>