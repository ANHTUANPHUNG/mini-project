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
            {{ formatNumberWithDotAndCurrency(totalFood) }}
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
            {{ formatNumberWithDotAndCurrency(totalDrink) }}
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
            {{ formatNumberWithDotAndCurrency(totalSpecialty) }}
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-3 bg-white border-rounded">
      <h3 class="pl-3 pt-3">Thống kê người dùng</h3>
      <div class="col-12">
        <apexchart
          height="300"
          type="bar"
          :options="options"
          :series="series"
        ></apexchart>
      </div>
    </div>
    <div class="row mx-3 bg-white border-rounded mt-5">
      <h3 class="pl-3 pt-3">Thống kê tổng doanh thu</h3>
      <div class="col-12">
        <apexchart
          height="300"
          type="bar"
          :options="options"
          :series="series"
        ></apexchart>
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
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
        colors: ["#a709a7"],
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
  methods: {
    formatNumberWithDotAndCurrency(number) {
      let numStr = number.toString().replace(/^0+/, "");
      let formattedNum = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return formattedNum + " đ";
    },
    formatDate(date) {
      const [a, b, c] = date.split("-");
      return [a, b, c];
    },
    async getList() {
      this.loading = true;
      const responseUser = await axios.get("http://localhost:3300/users");
      this.listUser = responseUser.data;
      let listDate = [];
      listDate = responseUser.data.map((e) => e.created);

      const dateCount = {};
      listDate.forEach((date) => {
        dateCount[date] = (dateCount[date] || 0) + 1;
      });
      console.log(dateCount);

      const responseBill = await axios.get("http://localhost:3300/bills");
      let newProducts = [];
      responseBill.data.forEach(({ products }) =>
        products.forEach((e) => (newProducts = [...newProducts, e]))
      );
      this.listDrink = newProducts.filter(
        ({ product }) => product.type == "drink"
      );
      this.listFood = newProducts.filter(
        ({ product }) => product.type == "food"
      );
      this.listSpecialty = newProducts.filter(
        ({ product }) => product.type == "specialty"
      );
      console.log(this.listDrink);
      this.listSpecialty.forEach((e) => console.log(e.totalProduct));
      this.listSpecialty.forEach((e) => (this.quantityDrink += e.quantity));
      this.listFood.forEach((e) => (this.totalFood += e.totalProduct));
      this.listFood.forEach((e) => (this.quantityFood += e.quantity));
      this.listDrink.forEach((e) => (this.totalDrink += e.totalProduct));
      this.listDrink.forEach((e) => (this.quantityDrink += e.quantity));
      this.loading = false;
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
