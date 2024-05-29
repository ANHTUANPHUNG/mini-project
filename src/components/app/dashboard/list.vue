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
    <div class="row mx-3 bg-white border-rounded mt-5 mb-4" >
      <chart-revenue
      @total="updateTotals"
      />
    </div>
  </div>
</template>
<script>
import DatePicker from "vue2-datepicker";

import ButtonCustom from "@/components/button-custom.vue";
import "vue2-datepicker/index.css";
import { mapActions, mapGetters } from "vuex";
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
      totalFood: 0,
      totalDrink: 0,
      total: 0,
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
