<template>
  <div >
    <span style="font-weight: 900; text-transform: uppercase">Sản phẩm bán chạy</span>
    <div         v-if="!loading"
 class="mt-3" style="border-radius: 9px; background-color: #cfc6a5">
      <div
        style="padding: 10px"
        class="border-bottom sell-fast-list cursor-pointer"
        v-for="item in sortable"
        :key="item[0]"
        @click="productDetail(item)"

      >
        <div class="text-center">
          <img :src="item[2].product.image.secure_url" style="width: 70px; height: 70px" />
        </div>
        <div class="pl-2">
          <div style="font-weight: 600">{{ item[2].product.name }}</div>
          <div>
            Giá tiền: <span style="color: #cb102c">{{ item[2].product.price | formatNumberWithDotAndCurrency}}</span>
          </div>
          <div>Số lượng bán: {{ item[1] }}</div>
        </div>
      </div>
      
    </div>
    <div v-else class="text-center w-100 d-flex justify-content-center py-5">
        <div style="text-align: -webkit-center">
          <div class="loader"></div>
          <span>Đang tải dữ liệu</span>
        </div>
      </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "menu-item",
  data() {
    return {
      user: null,
      sortable: [],
      loading: false
    };
  },
  methods: {
    async getList() {
        this.loading =true
      const responseBill = await axios.get("http://localhost:3300/bills");
      let newProducts = [];
      responseBill.data.forEach((element) => {
        if (element.status == "Đã hoàn thành") {
          this.total += element.totalProducts;
          element.products.forEach((e) => (newProducts = [...newProducts, e]));
        }
      });
      let quantity = {};
      newProducts.forEach((e) => {
        if (e.product && !quantity[e.product.name]) {
          quantity[e.product.name] = [Number(e.quantity), e];
        } else if (quantity[e.product.name]) {
          quantity[e.product.name][0] += Number(e.quantity);
        }
      });
      let sortable = [];
      for (var vehicle in quantity) {
        sortable.push([vehicle, quantity[vehicle][0], quantity[vehicle][1]]);
      }
      sortable.sort(function (a, b) {
        return b[1] - a[1];
      });
      this.sortable = sortable.slice(0, 5);
      this.loading =false
    },
    productDetail(value) {
      this.$router.push({
        name: "user.detail",
        params: { id: value[2].product.id, type: value[2].product.type },
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style scoped>
.sell-fast-list{
    display: flex;
}
@media screen and (min-width: 768px) and (max-width: 1050px) {
    .sell-fast-list {
        display: grid;
    }
}

</style>
