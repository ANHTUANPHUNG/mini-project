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
      <h3 class="pl-3 pt-3">Thống kê người dùng theo ngày</h3>
      <div class="col-12">
        <apexchart height="300" type="line" :options="optionsUser" :series="seriesUser"></apexchart>
      </div>
    </div>
    <div class="row mx-3 bg-white border-rounded mt-5">
      <h3 class="pl-3 pt-3">Thống kê doanh thu theo ngày : {{ total | formatNumberWithDotAndCurrency }}</h3>
      <div class="col-12">
        <apexchart
          height="300"
          type="line"
          :options="optionsRevenue"
          :series="seriesRevenue"
        ></apexchart>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonCustom from "@/components/button-custom.vue";
import axios from "axios";
import { mapActions,mapGetters } from 'vuex'

export default {
  name: "list",
  components: {
    ButtonCustom,
  },
  data() {
    return {
      listUser: null,
      listFood: null,
      listDrink: null,
      listSpecialty: null,
      totalSpecialty: 0,
      quantitySpecialty: 0,
      totalFood: 0,
      quantityFood: 0,
      totalDrink: 0,
      quantityDrink: 0,
      total:0,
      optionsUser: {
        chart: {
          type: "line",
          zoom: {
            enabled: false,
          },
          toolbar: { show: true },
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        legend: {
          show: true,
          position: "right",
        },
        xaxis: {
          categories: [],
        },
        colors: ["#a709a7"],
      },
      seriesUser: [
        {
          name: "Tài khoản",
          data: [],
        },
      ],
      optionsRevenue: {
        chart: {
          type: "line",
          zoom: {
            enabled: false,
          },
          toolbar: { show: true },
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        legend: {
          show: true,
          position: "right",
        },
        xaxis: {
          categories: [],
        },
        colors: ["#a709a7"],
      },
      seriesRevenue: [
        {
          name: "Doanh thu",
          data: [],
        },
      ],
    };
  },
      computed:{
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['ListUser','ListBill']),

    formatDate(date) {
      const [year, month, day] = date.split("-");
      return [year, month, day];
    },
    formatDateTime(datetime) {
      const [date, time] = datetime.split(" ");
      return date;
    },
    
    async getList() {
      this.loading = true;
      const responseUser = await this.ListUser()
      this.listUser = responseUser;
      let listDate = [];
      listDate = responseUser.map((e) => e.created);
      this.countDate(listDate);
      this.optionsUser = {
        ...this.optionsUser,
        xaxis: { ...this.optionsUser.xaxis, categories: Object.keys(this.countDate(listDate)) },
      };
      this.seriesUser[0].data = Object.values(this.countDate(listDate));

      const responseBill = await this.ListBill()
      let newProducts = [];
      responseBill.forEach((element) => {
        if (element.status == "Đã hoàn thành") {
          this.total += element.totalProducts
          element.products.forEach((e) => (newProducts = [...newProducts, e]));
        }
      });
      this.listDrink = newProducts.filter(({ product }) => product.type == "drink");
      this.listFood = newProducts.filter(({ product }) => product.type == "food");
      this.listSpecialty = newProducts.filter(({ product }) => product.type == "specialty");
      this.listSpecialty.forEach(
        (e) => ((this.totalSpecialty += e.totalProduct), (this.quantitySpecialty += Number(e.quantity)))
      );
      this.listFood.forEach(
        (e) => ((this.totalFood += e.totalProduct), (this.quantityFood += Number(e.quantity)))
      );
      this.listDrink.forEach(
        (e) => ((this.totalDrink += e.totalProduct), (this.quantityDrink += Number(e.quantity)))
      );
      const dateCount = {};

      responseBill.forEach((e) => {
        if (e.status == "Đã hoàn thành") {
          if(this.formatDateTime(e.createdInProgress))
              dateCount[this.formatDateTime(e.createdInProgress)] = (dateCount[this.formatDateTime(e.createdInProgress)] || 0) + e.totalProducts;
            
        }
      });
      this.seriesRevenue[0].data = Object.values(dateCount);
      this.optionsRevenue = {
        ...this.optionsRevenue,
        xaxis: { ...this.optionsRevenue.xaxis, categories:Object.keys(dateCount) },
      };

      this.loading = false;
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
    this.getList();
  },
};
</script>
<style scoped>
.border-rounded {
  border-radius: 5px;
}
</style>
