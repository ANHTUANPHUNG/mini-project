<template>
  <div>
    <div class="my-4 row w-100" style="margin-left: 0">
      <div class="col-lg-3 col-sm-6 col-12 mb-2" style="padding: 0 15px">
        <div class="bg-white p-2 border-rounded" style="height: 150px">
          <span>Tổng số tài khoản</span>
          <div
            class="w-100 text-center"
            style="line-height: 90px; font-size: 30px; font-weight: 800"
          >
            {{ listUser?.length - 1 }}
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12 mb-2" style="padding: 0 15px">
        <div class="bg-white p-2 border-rounded" style="height: 150px">
          Tổng doanh thu thức ăn
          <div
            class="w-100 text-center"
            style="line-height: 90px; font-size: 30px; font-weight: 800"
          >
            {{ totalFood | formatNumberWithDotAndCurrency }}
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12 mb-2" style="padding: 0 15px">
        <div class="bg-white p-2 border-rounded" style="height: 150px">
          Tổng doanh thu đồ uống
          <div
            class="w-100 text-center"
            style="line-height: 90px; font-size: 30px; font-weight: 800"
          >
            {{ totalDrink | formatNumberWithDotAndCurrency }}
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12 mb-2" style="padding: 0 15px">
        <div class="bg-white p-2 border-rounded" style="height: 150px">
          Tổng doanh thu đặc sản
          <div
            class="w-100 text-center"
            style="line-height: 90px; font-size: 30px; font-weight: 800"
          >
            {{ totalSpecialty | formatNumberWithDotAndCurrency }}
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-3 bg-white border-rounded">
      <chart-user @total="v => listUser=v" />
    </div>
    <div class="row mx-3 bg-white border-rounded mt-5">
      <chart-revenue
      @total="updateTotals"
      />
    </div>
  </div>
</template>
<script>
import DatePicker from "vue2-datepicker";

import ButtonCustom from "@/components/button-custom.vue";
import axios from "axios";
import "vue2-datepicker/index.css";
import { mapActions, mapGetters } from "vuex";
import { convertDateToString, formatDate } from "@/components/core/myFunction";
import ChartUser from "./chart-user.vue";
import ChartRevenue from "./chart-revenue.vue";
export default {
  name: "list",
  components: {
    ButtonCustom,
    DatePicker,
    ChartRevenue,ChartUser
  },
  data() {
    return {
      listUser: null,
      totalSpecialty: 0,
      dateStart: new Date(2024, 4, 16),
      dateEnd: new Date(),
      totalFood: 0,
      totalDrink: 0,
      total: 0,
      // optionsUser: {
      //   chart: {
      //     type: "line",
      //     zoom: {
      //       enabled: false,
      //     },
      //     toolbar: { show: true },
      //   },
      //   tooltip: {
      //     shared: true,
      //     intersect: false,
      //   },
      //   legend: {
      //     show: true,
      //     position: "right",
      //   },
      //   xaxis: {
      //     categories: [],
      //   },
      //   colors: ["#a709a7"],
      // },
      // seriesUser: [
      //   {
      //     name: "Tài khoản",
      //     data: [],
      //   },
      // ],
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  watch: {},
  methods: {
    ...mapActions(["ListUser", "ListBill"]),
    updateTotals(v) {
      this.totalDrink = v.totalDrink;
      this.totalFood = v.totalFood;
      this.totalSpecialty = v.totalSpecialty;
    },
    // async getList() {
    //   this.loading = true;
    //   const responseUser = await this.ListUser();
    //   this.listUser = responseUser;
    //   let listDate = [];
    //   listDate = responseUser.map((e) => formatDate(e.created));
    //   this.optionsUser = {
    //     ...this.optionsUser,
    //     xaxis: { ...this.optionsUser.xaxis, categories: Object.keys(this.countDate(listDate)) },
    //   };
    //   this.seriesUser[0].data = Object.values(this.countDate(listDate));

    //   this.loading = false;
    // },
    disabledStart: function (date) {
      return date < new Date(2024, 4, 16) || date > new Date();
    },
    disabledEnd: function (date) {
      return date < this.dateStart || date > new Date() || date < new Date(2024, 4, 16);
    },
    countDate(listDate) {
      const dateCount = {};
      listDate.forEach((date) => {
        if (date) {
          dateCount[date] = (dateCount[date] || 0) + 1;
        }
      });
      return dateCount;
    },
  },
  created() {
    // this.getList();
  },
};
</script>
<style scoped>
.border-rounded {
  border-radius: 5px;
}
</style>
