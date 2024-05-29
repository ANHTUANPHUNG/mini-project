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
          <span class="pt-3" >
            Thống kê tài khoản được tạo từ ngày {{ dateStart | convertDate }} đến ngày
            {{ dateEnd | convertDate }} : <span style="font-weight: 600"> {{ total }}</span> tài khoản. 
          </span>
        </div>
      </div>
    </div>
    <div class="col-12">
      <apexchart  height="300" type="line" :options="optionsUser" :series="seriesUser"></apexchart>
    </div>
  </div>
</template>
<script>
import DatePicker from "vue2-datepicker";
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
      countUser: 0,
      dateStart: new Date(2024, 4, 20),
      dateEnd: new Date(),
      total: 0,
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
      seriesUser: [
        {
          name: "Tài khoản",
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
        this.chartData(this.listUser)
      },
      deep: true,
    },
    dateEnd: {
      async handler() {
        this.chartData(this.listUser)
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["ListUser", "ListBill"]),
    async getList() {
      this.loading = true;
      const responseUser = await this.ListUser();
      this.listUser = responseUser;
      this.$emit("total", this.listUser);
      this.chartData(responseUser)
      this.loading = false;
    },
    chartData(data){
        let listDate = data.map((e) => formatDate(e.created));
      const sortListDate = listDate.map((e) => new Date(e)).sort((a, b) => a - b);
      const newListDate = sortListDate
        .filter((date) => date >= this.dateStart && date <= this.dateEnd)
        .map((date) => convertDateToString(new Date(date)));
      const ONE_DAY = 1000 * 60 * 60 * 24;
      const differenceMs = Math.abs(this.dateStart - this.dateEnd);
      if (Math.round(differenceMs / ONE_DAY) < 30) {
        const day = [
          ...new Set(
            Object.keys(this.countDate(newListDate)).map((e) =>
              (e).slice((e).indexOf("-")+1)
            )
          ),
        ];
        this.optionsUser = {
          ...this.optionsUser,
          xaxis: {
            ...this.optionsUser.xaxis,
            categories: day,
          },
        };
        this.seriesUser[0].data = Object.values(this.countDate(newListDate));
        this.total = Object.values(this.countDate(newListDate)).reduce((acc, cur) => acc + cur, 0);
      } else if (
        Math.round(differenceMs / ONE_DAY) >= 30 &&
        Math.round(differenceMs / ONE_DAY) < 365
      ) {
        let month = newListDate.map((e) => e.slice(0, e.lastIndexOf("-")));
        this.optionsUser = {
          ...this.optionsUser,
          xaxis: { ...this.optionsUser.xaxis, categories: Object.keys(this.countDate(month)) },
        };
        this.seriesUser[0].data = Object.values(this.countDate(month));
        this.total = Object.values(this.countDate(month)).reduce((acc, cur) => acc + cur, 0);
      } else {
        let year = newListDate.map((e) => e.slice(0, e.indexOf("-")));
        this.optionsUser = {
          ...this.optionsUser,
          xaxis: { ...this.optionsUser.xaxis, categories: Object.keys(this.countDate(year)) },
        };
        this.seriesUser[0].data = Object.values(this.countDate(year));
        this.total = Object.values(this.countDate(year)).reduce((acc, cur) => acc + cur, 0);
      }
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
