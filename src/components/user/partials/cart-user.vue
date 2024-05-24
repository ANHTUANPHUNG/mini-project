<template>
  <div style="">
    <div class="" style="padding: 40px 80px">
      <div class="row">
        <div
          class="col-lg-12 col-12"
          style="
            background-color: #cfc6a5;
            padding: 50px 10px;
            border-radius: 5px;
            min-height: 300px;
          "
        >
          <div class="w-100 h-100" style="background-color: white; border-radius: 10px">
            <div class="row mx-3">
              <div class="col-8">
                <table class="table table-sm">
                  <thead>
                    <tr class="text-center">
                      <th scope="col">Sản phẩm</th>
                      <th scope="col">Giá món</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in entries.products" :key="item.product.id">
                      <td>
                        <div class="d-flex align-items-center">
                          <i
                            @click="deleteItem(item)"
                            class="bx bx-x-circle cursor-pointer font-size-26 text-secondary mr-2"
                          ></i>
                          <img
                            class="mr-2"
                            style="width: 70px; height: 70px"
                            :src="item.product.image.secure_url"
                            alt=""
                          />
                          <span>{{ item.product.name }}</span>
                        </div>
                      </td>
                      <td class="text-center">{{ item.product.price }}</td>
                      <td class="text-center">
                        <b-button-group class="my-2">
                          <b-button
                            :disabled="item.quantity == 1"
                            @click="item.quantity--"
                            variant=""
                            >-</b-button
                          >
                          <b-input
                            style="width: 60px"
                            type="number"
                            :value="item.quantity"
                          ></b-input>
                          <b-button @click="item.quantity += 1" variant="">+</b-button>
                        </b-button-group>
                      </td>
                      <td class="text-center">
                        {{ item.product.price * item.quantity }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="pl-5 border-top py-3">
                  <b-button variant="outline-success"
                    ><div class="d-flex align-items-center"  @click="$router.push({ name: 'user.home' })">
                      <i class="bx bxs-left-arrow-alt"></i>Tiếp tục xem sản phẩm
                    </div></b-button
                  >
                </div>
              </div>
              <div class="col-4">
                <table class="table table-sm">
                  <thead>
                    <tr class="text-center">
                      <th scope="col">Cộng giỏ hàng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div class="d-flex justify-content-between">
                          <span>Tổng</span>
                          <span>{{ totalProducts }}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="border-top pt-3">
                  <b-button :disabled="!entries.products.length" style="height: 50px; width: 100%" variant="outline-primary">
                    Thanh toán
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { eventBus } from "@/main";

import axios from "axios";
import MenuItem from "./menu-item.vue";
import ProductItem from "./product-item.vue";
export default {
  name: "list",
  components: {
    MenuItem,
    ProductItem,
  },
  data() {
    return {
      user: null,
      entry: null,
      count: 1,
      entries: [],
      loading: false,
      totalProducts: 0,
    };
  },
  watch: {
    entries: {
      handler() {
        let total = 0;
        this.entries.products.forEach((e, index) => {
          this.entries.products[index].totalProduct = e.quantity * e.product.price;
          total += e.quantity * e.product.price;
        });
        this.totalProducts = total;
        this.entries.totalProducts = this.totalProducts;
        localStorage.setItem("products", JSON.stringify(this.entries));
        eventBus.$emit("entries", this.entries);
      },
      deep: true,
    },
  },
  methods: {
    deleteItem(value) {
      this.$swal({
        title: "Xoá món hàng này?",
        icon: "warning",
        showCancelButton: true,
        preConfirm: () => {
          const newEntries = this.entries.products.filter(
            (e) => e.product.id != value.product.id && e.product.name != value.product.name
          );
          this.entries.totalQuantity -= value.quantity;
          this.entries.totalProducts -= value.totalProduct;
          this.entries.products = newEntries;
          this.quantity = this.entries.totalQuantity;
          localStorage.setItem("products", JSON.stringify(this.entries));
        },
      });
    },
  },
  created() {
    this.entries = JSON.parse(localStorage.getItem("products"));
    this.totalProducts = JSON.parse(localStorage.getItem("products")).totalProducts;
    eventBus.$on(
      "entries-nav",
      (value) => ((this.entries = value), (this.totalProducts = value.totalProducts))
    );
  },
};
</script>
<style scoped>
.table td {
  vertical-align: middle;
}
</style>
