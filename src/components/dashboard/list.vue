<template>
  <div class="w-100 mx-3">
    <div class="row my-4  d-flex" >
      <div  class="col-lg-3 col-sm-6 col-12 mb-2">
        <div class="bg-white p-2" style="height: 150px;">
          Tổng số tài khoản
        </div>
      </div>
      <div  class="col-lg-3 col-sm-6 col-12 mb-2">
        <div class="bg-white p-2" style="height: 150px;">
          Tổng doan thu thức ăn
        </div>
      </div>
      <div  class="col-lg-3 col-sm-6 col-12 mb-2">
        <div class="bg-white p-2" style="height: 150px;">
          Tổng doanh thu đồ uống  
        </div>
      </div>
      <div  class="col-lg-3 col-sm-6 col-12 mb-2">
        <div class="bg-white p-2" style="height: 150px;">
          Tổng doanh thu đặc sản
        </div>
      </div>
    </div>
    <div>
      <!-- <apexchart width="500" type="bar" :options="options" :series="series"></apexchart> -->
    </div>
  </div>
</template>
<script>
import { eventBus } from '@/main';
export default {
  name: "list",
  data(){
    return{
      age:0,
      // options: {
      //   chart: {
      //     id: 'vuechart-example'
      //   },
      //   xaxis: {
      //     categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      //   }
      // },
      // series: [{
      //   name: 'series-1',
      //   data: [30, 40, 45, 50, 49, 60, 70, 91]
      // }]
    }
  },
  methods:{
    setAge(){
      this.age=30
      eventBus.$emit('handleAge', this.age)
    }
  }
};
</script>
<style scoped></style>
