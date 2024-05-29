<template>
  <div class="row">
    <div class="col-12 pt-3">
      <div class="row pl-3">
        <div class="col-lg-5 col-sm-6 col-12 d-flex">
          <div style="padding-right: 10px">
            <date-picker v-model="dateStart" :disabled-date="disabledStart" :clearable="false">
            </date-picker>
          </div>
          <div>
            <date-picker v-model="dateEnd" :disabled-date="disabledEnd" :clearable="false">
            </date-picker>
          </div>
        </div>
        <div class="col-12 mt-3">
          <span class="pt-3" style="font-weight: 600">
            Thống kê doanh thu từ ngày {{ dateStart |convertDate }} đến ngày {{dateEnd|convertDate}} : {{ total | formatNumberWithDotAndCurrency }}
          </span>
        </div>
      </div>
    </div>
    <div class="col-12">
      <apexchart
        height="300"
        type="line"
        :options="optionsRevenue"
        :series="seriesRevenue"
      ></apexchart>
    </div>
  </div>
</template>
<script>
import DatePicker from "vue2-datepicker";

import axios from "axios";
import "vue2-datepicker/index.css";

import { mapActions, mapGetters } from "vuex";
import { convertDateToString, formatDate } from "@/components/core/myFunction";
export default {
  name: "chart-revenue",
  components: {
    DatePicker,
  },
  data() {
    return {
      listUser: null,
      totalSpecialty: 0,
      dateStart: new Date(2024, 4, 20),
      dateEnd: new Date(),
      totalFood: 0,
      totalDrink: 0,
      total: 0,
      listDrink: {},
      listFood: {},
      listSpecialty: {},
      listProduct: [],
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
          y: {
            formatter: function (number) {
              if (number == 0) return 0 + " đ";
              let numStr = number.toString().replace(/^0+/, "");
              let formattedNum = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              return formattedNum + " đ";
            },
          },
        },
        legend: {
          show: true,
          position: "right",
        },
        xaxis: {
          categories: [],
        },
        colors: ["#007bff", "#fd7e14", "#28a745"],
        noData: {
  text: 'Không có dữ liệu',
  align: 'center',
  verticalAlign: 'middle',
  offsetX: 0,
  offsetY: 0,
  style: {
    color: undefined,
    fontSize: '14px',
    fontFamily: undefined
  }
}
      },
      seriesRevenue: [
        {
          name: "Đặc sản",
          data: [],
        },
        {
          name: "Đồ ăn",
          data: [],
        },
        {
          name: "Thức uống",
          data: [],
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  watch: {
    dateStart: {
      async handler() {
        this.dataChart(this.listProduct)
      },
      deep: true,
    },
    dateEnd: {
      async handler() {
        this.dataChart(this.listProduct)
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["ListUser", "ListBill"]),
    async getList() {
      this.loading = true;
      const responseBill = await this.ListBill();
      const totalDrinkByDay = {};
      const totalFoodByDay = {};
      const totalSpecialtyByDay = {};
      responseBill.forEach((e) => {
        if (e.status == "Đã hoàn thành") {
          this.total += e.totalProducts;
          e.products.forEach((i) => {
            const dateFormatted = formatDate(e.createdInProgress);
            if (i.product.type == "drink") {
              totalDrinkByDay[dateFormatted] =
                (totalDrinkByDay[dateFormatted] || 0) + i.totalProduct;
            }
            if (i.product.type == "specialty") {
              totalSpecialtyByDay[dateFormatted] =
                (totalSpecialtyByDay[dateFormatted] || 0) + i.totalProduct;
            }
            if (i.product.type == "food") {
              totalFoodByDay[dateFormatted] = (totalFoodByDay[dateFormatted] || 0) + i.totalProduct;
            }
          });
        }
      });
      this.totalDrink = Object.values(totalDrinkByDay).reduce((acc, val) => acc + val, 0);
      this.totalFood = Object.values(totalFoodByDay).reduce((acc, val) => acc + val, 0);
      this.totalSpecialty = Object.values(totalSpecialtyByDay).reduce((acc, val) => acc + val, 0);
      this.$emit("total", {
        totalDrink: this.totalDrink,
        totalFood: this.totalFood,
        totalSpecialty: this.totalSpecialty,
      });
      this.listDrink = totalFoodByDay;
      this.listFood = totalDrinkByDay;
      this.listSpecialty = totalSpecialtyByDay;
        const satisfyDay = [
        ...new Set([
          ...Object.keys(totalDrinkByDay),
          ...Object.keys(totalFoodByDay),
          ...Object.keys(totalSpecialtyByDay),
        ]),
      ];
      this.listProduct = satisfyDay;
      this.dataChart(satisfyDay)
      this.loading = false;
    },
    dataChart(data){
        const ONE_DAY = 1000 * 60 * 60 * 24;
      const differenceMs = Math.abs(this.dateStart - this.dateEnd);
      const sortSatisfyDay = data.map((e) => new Date(e)).sort((a, b) => a - b);
      const newSatisfyDay = sortSatisfyDay
        .filter((date) => date >= this.dateStart && date <= this.dateEnd)
        .map((date) => convertDateToString(new Date(date)));
      const satisfyDrink = newSatisfyDay.map((day) => [day, this.listDrink[day] || 0]);
      const satisfyFood = newSatisfyDay.map((day) => [day, this.listFood[day] || 0]);
      const satisfySpecialty = newSatisfyDay.map((day) => [day, this.listSpecialty[day] || 0]);
      let revenueDrink = [];
      let revenueFood = [];
      let revenueSpecialty = [];
      if (Math.round(differenceMs / ONE_DAY) < 30) {
        revenueDrink = satisfyDrink.map((e) => e[1]);
        revenueFood = satisfyFood.map((e) => e[1]);
        revenueSpecialty = satisfySpecialty.map((e) => e[1]);
        const day = [
          ...new Set(
            newSatisfyDay.map((e) =>
              (e).slice((e).indexOf("-")+1)
            )
          ),
        ];
        this.optionsRevenue = {
          ...this.optionsRevenue,
          xaxis: { ...this.optionsRevenue.xaxis, categories: day },
        };
      } else if (
        Math.round(differenceMs / ONE_DAY) >= 30 &&
        Math.round(differenceMs / ONE_DAY) < 365
      ) {
        const month = [
          ...new Set(
            newSatisfyDay.map((e) =>
              (e).slice(0, (e).lastIndexOf("-"))
            )
          ),
        ];
        let monthSatisfyDrink = [];
        let monthSatisfyFood = [];
        let monthSatisfySpecialty = [];
        month.forEach((element) => {
          let totalFood = 0;
          let totalDrink = 0;
          let totalSpecialty = 0;
          satisfyDrink.forEach((e) => {
            if (e[0].slice(0, e[0].lastIndexOf("-")) == element) {
              totalFood += e[1];
            }
          });
          satisfyFood.forEach((e) => {
            if (e[0].slice(0, e[0].lastIndexOf("-")) == element) {
              totalDrink += e[1];
            }
          });
          satisfySpecialty.forEach((e) => {
            if (e[0].slice(0, e[0].lastIndexOf("-")) == element) {
              totalSpecialty += e[1];
            }
          });
          monthSatisfyDrink.push([element, totalFood]);
          monthSatisfyFood.push([element, totalDrink]);
          monthSatisfySpecialty.push([element, totalSpecialty]);
        });
        revenueDrink = monthSatisfyDrink.map((e) => e[1]);
        revenueFood = monthSatisfyFood.map((e) => e[1]);
        revenueSpecialty = monthSatisfySpecialty.map((e) => e[1]);
        this.optionsRevenue = {
          ...this.optionsRevenue,
          xaxis: { ...this.optionsRevenue.xaxis, categories: month },
        };
      } else {
        const year = [
          ...new Set(
            newSatisfyDay.map((e) =>
              (e).slice(0, (e).indexOf("-"))
            )
          ),
        ];
        let yearSatisfyDrink = [];
        let yearSatisfyFood = [];
        let yearSatisfySpecialty = [];
        year.forEach((element) => {
          let totalFood = 0;
          let totalDrink = 0;
          let totalSpecialty = 0;
          satisfyDrink.forEach((e) => {
            if (e[0].slice(0, e[0].indexOf("-")) == element) {
              totalFood += e[1];
            }
          });
          satisfyFood.forEach((e) => {
            if (e[0].slice(0, e[0].indexOf("-")) == element) {
              totalDrink += e[1];
            }
          });
          satisfySpecialty.forEach((e) => {
            if (e[0].slice(0, e[0].indexOf("-")) == element) {
              totalSpecialty += e[1];
            }
          });
          yearSatisfyDrink.push([element, totalFood]);
          yearSatisfyFood.push([element, totalDrink]);
          yearSatisfySpecialty.push([element, totalSpecialty]);
        });
        revenueDrink = yearSatisfyDrink.map((e) => e[1]);
        revenueFood = yearSatisfyFood.map((e) => e[1]);
        revenueSpecialty = yearSatisfySpecialty.map((e) => e[1]);
        this.optionsRevenue = {
          ...this.optionsRevenue,
          xaxis: { ...this.optionsRevenue.xaxis, categories: year },
        };
      }
      this.total = [...revenueDrink, ...revenueFood, ...revenueSpecialty].reduce(
        (acc, val) => acc + val,
        0
      );
      this.seriesRevenue = [
        { data: revenueSpecialty },
        { data: revenueFood },
        { data: revenueDrink },
      ];
    },
    disabledStart: function (date) {
      return date > this.dateEnd || date > new Date();
    },
    disabledEnd: function (date) {
      return date < this.dateStart || date > new Date();
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
