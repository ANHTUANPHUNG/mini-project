<template>
  <div>
    <div class="px-5 py-5">
      <span class="page-home" @click="$router.push({ name: 'user.home' })">Trang chủ</span>
      /
      <span style="font-weight: 600; text-transform: uppercase">Đồ ăn</span>
    </div>
    <div class="px-5">
      <div class="row">
        <div class="col-md-3 menu-disabled">
          <div><menu-item /></div>
          <div><sell-fast /></div>
        </div>
        <div class="col-md-9 col-12">
          <div class="row">
            <product-item :checkForm="true" title="Đồ ăn" api="food" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import SellFast from "./sell-fast.vue"
import MenuItem from "./menu-item.vue";
import ProductItem from "./product-item.vue";
export default {
  name: "food-user",
  components: {
    MenuItem,
    ProductItem,SellFast
  },
  data() {
    return {
      user: null,
      sortable: [],
    };
  },
  // methods: {
  //   async getList() {
  //     const responseBill = await axios.get("http://localhost:3300/bills");
  //     let newProducts = [];
  //     responseBill.data.forEach((element) => {
  //       if (element.status == "Đã hoàn thành") {
  //         this.total += element.totalProducts;
  //         element.products.forEach((e) => (newProducts = [...newProducts, e]));
  //       }
  //     });
  //     let quantity = {};
  //     newProducts.forEach((e) => {
  //       if (e.product && !quantity[e.product.name]) {
  //         quantity[e.product.name] = [Number(e.quantity), e];
  //       } else if (quantity[e.product.name]) {
  //         quantity[e.product.name][0] += Number(e.quantity);
  //       }
  //     });
  //     let sortable = [];
  //     for (var vehicle in quantity) {
  //       sortable.push([vehicle, quantity[vehicle][0], quantity[vehicle][1]]);
  //     }
  //     sortable.sort(function (a, b) {
  //       return b[1] - a[1];
  //     });
  //     this.sortable = sortable.slice(0, 5);
  //     console.log(this.sortable);
  //   },
  // },
  // created() {
  //   this.getList();
  // },
};
</script>

<style scoped>
.page-home {
  cursor: pointer;
}
.page-home:hover {
  color: orange;
}
@media screen and (max-width: 768px) {
  .menu-disabled {
    display: none;
  }
}
</style>
