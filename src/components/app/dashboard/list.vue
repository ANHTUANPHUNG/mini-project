<template>
  <div>
    <div class="my-4 row w-100" style="margin-left: 0">
      <div class="col-lg-3 col-sm-6 col-12 mb-2" style="padding: 0 15px">
        <div class="bg-white p-2 border-rounded" style="height: 150px">Tổng số tài khoản</div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12 mb-2" style="padding: 0 15px">
        <div class="bg-white p-2 border-rounded" style="height: 150px">Tổng doanh thu thức ăn</div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12 mb-2" style="padding: 0 15px">
        <div class="bg-white p-2 border-rounded" style="height: 150px">Tổng doanh thu đồ uống</div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12 mb-2" style="padding: 0 15px">
        <div class="bg-white p-2 border-rounded" style="height: 150px">Tổng doanh thu đặc sản</div>
      </div>
    </div>
    <div class="row mx-3 bg-white border-rounded" >
      <h3 class="pl-3 pt-3">
        Thống kê người dùng
      </h3>
      <div class="col-12 " >
        <apexchart height="300" type="bar" :options="options" :series="series"></apexchart>
      </div>
    </div>
    <div class="row mx-3 bg-white border-rounded mt-5" >
      <h3 class="pl-3 pt-3">
        Thống kê tổng doanh thu
      </h3>
      <div class="col-12 " >
        <apexchart height="300" type="bar" :options="options" :series="series"></apexchart>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonCustom from "@/components/button-custom.vue";
import axios from "axios";
export default {
  name: "list",
  components: {
    ButtonCustom,
  },
  data() {
    return {
      age: 0,
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
        colors:['#a709a7']
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
};
</script>
<style scoped>
.border-rounded{
  border-radius: 5px;
}
</style>
