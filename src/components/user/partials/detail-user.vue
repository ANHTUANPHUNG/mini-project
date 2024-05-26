<template>
  <div class="detail-wrapper">
    <div class="pb-4">
      <span class="page-home" @click="$router.push({ name: 'user.home' })"
        >Trang chủ</span
      >
      /
      <span style="font-weight: 600; text-transform: uppercase">Đồ ăn</span>
    </div>
    <div class="">
      <div class="row">
        <div class="col-md-3 menu-disabled">
          <div><menu-item /></div>
          <div>
            <span style="font-weight: 900; text-transform: uppercase"
              >Sản phẩm bán chạy</span
            >
            <div
              class="mt-3"
              style="border-radius: 9px; background-color: #cfc6a5"
            >
              <div class="border-bottom menu-item">Đặc sản</div>
              <div class="border-bottom menu-item">Đồ ăn</div>
              <div class="border-bottom menu-item">Thức uống</div>
            </div>
          </div>
        </div>
        <div class="col-md-9 col-12" v-if="!loading">
          <div
            style="background-color: #cfc6a5; border-radius: 5px"
            class="px-3"
          >
            <div class="row border-bottom" style="">
              <div class="col-lg-6 col-12 py-3">
                <img
                  class="w-100"
                  style="max-height: 350px"
                  :src="entry?.product.image.secure_url"
                  alt=""
                />
              </div>
              <div class="col-lg-6 col-12 py-3" style="">
                <div style="font-weight: 800; font-size: 40px">
                  {{ entry?.product.name }}
                </div>
                <div style="font-size: 20px" class="mb-2">
                  Giá tiền:
                  <span class="text-danger" style="font-weight: 800">
                    {{ entry?.product.price }}</span
                  >
                </div>
                <div class="my-2" style="font-size: 20px">
                  Thông tin món:<span> {{ entry?.product.description }}</span>
                </div>
                <div>
                  <div style="font-size: 20px" class="my-2">
                    Số lượng sản phẩm
                  </div>
                  <b-button-group class="my-2">
                    <b-button
                      :disabled="entry.quantity == 1"
                      @click="entry.quantity--"
                      variant=""
                      >-</b-button
                    >
                    <b-input
                      style="width: 40px"
                      type="number"
                      :value="entry?.quantity"
                    ></b-input>
                    <b-button @click="entry.quantity += 1" variant=""
                      >+</b-button
                    >
                  </b-button-group>
                  <div class="my-2" style="font-size: 20px">
                    Tổng tiền:<span>
                      {{ entry?.product.price * entry?.quantity }}</span
                    >
                  </div>
                </div>
                <div class="my-4">
                  <b-button class="w-100" variant="success" @click="addProduct">
                    Thêm vào giỏ hàng</b-button
                  >
                </div>
              </div>
            </div>
            <div>
              <div style="font-weight: 800; font-size: 30px">
                Sản phẩm tương tự
              </div>
              <div class="row">
                <div
                  v-for="item in entries"
                  :key="item.id"
                  class="text-center col-lg-2 col-sm-3 col-4 py-2 cursor-pointer"
                  @click="
                    $router.push({
                      name: 'user.detail',
                      params: { id: item.id, type: item.type },
                    })
                  "
                >
                  <img
                    class="w-100"
                    style="height: 150px"
                    :src="item?.image?.secure_url"
                    alt=""
                  />
                  <div style="font-weight: bold">{{ item.name }}</div>
                  <div style="font-weight: bold">{{ item.price }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-center col-lg-9 col-12 d-flex justify-content-center py-5"
        >
          <div>
            <div style="text-align: -webkit-center">
              <div class="loader"></div>
              <span>Đang tải dữ liệu</span>
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
    };
  },
  watch: {
    $route: {
      handler() {
        this.getList();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async getList() {
      this.loading = true;
      const res = await axios.get(
        "http://localhost:3300/" + this.$route.params.type
      );
      const data = res.data.filter((e) => e.status.id == 1);
      const index = data.findIndex(({ id }) => id == this.$route.params.id);
      const productLocal = JSON.parse(localStorage.getItem("products"));
      const newEntries = productLocal?.products.find(
        (e) =>
          e.product.id == data[index].id && e.product.name == data[index].name
      );

      if (newEntries) {
        this.entry = newEntries;
        console.log(newEntries);
      } else {
        this.entry = {
          product: data[index],
          quantity: 1,
          totalProduct: data[index]?.price,
        };
      }
      this.entries = [
        data[(index + 1) % data.length],
        data[(index + 2) % data.length],
        data[(index + 3) % data.length],
      ];
      this.loading = false;
    },
    addProduct() {
      let user;
      if (!localStorage.getItem("user")) {
        this.$toast.warning("Bạn chưa đăng nhập vào ứng dụng.", {
              position: "top-right",
              timeout: 3000,
            });
        return
      } else {
        user = JSON.parse(localStorage.getItem("user"));
      }
      let productLocal = JSON.parse(localStorage.getItem("products"));
      let index = productLocal?.products.findIndex(
        (e) =>
          e.product.id == this.entry.product.id &&
          e.product.name == this.entry.product.name
      );
      if (
        productLocal &&
        productLocal?.products[index]?.quantity == this.entry.quantity
      ) {
        this.$toast.warning("Số lượng sản phẩm đã có sẵn trong giỏ hàng.", {
              position: "top-right",
              timeout: 3000,
            });
        return;
      }
      this.$swal({
        title: "Thêm vào giỏ hàng?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        preConfirm: () => {
          if (index!= undefined && index != -1) {
            productLocal.products[index].quantity = this.entry.quantity;
            productLocal.products[index].totalProduct =
              this.entry.quantity * this.entry.product.price;
          } else {
            if (!productLocal) {
              productLocal = {
                products: [this.entry],
                totalProducts: 0,
                totalQuantity: 0,
                userId: user.id,
                userPhone: user.phone,
              };
            } else {
              productLocal?.products.push(this.entry);
            }
          }
          let total = 0;
          let quantity = 0;
          productLocal.products.forEach((e, index) => {
            productLocal.products[index].totalProduct =
              e.quantity * e.product.price;
            total += e.quantity * e.product.price;
            quantity += e.quantity;
          });
          productLocal.totalProducts = total;
          productLocal.totalQuantity = quantity;
          localStorage.setItem("products", JSON.stringify(productLocal));
          eventBus.$emit("entries", productLocal);
        },
      });
    },
  },
  created() {},
};
</script>
<style scoped>
.detail-wrapper {
  padding: 30px 70px;
}
@media screen and (max-width: 992px) {
  .detail-wrapper {
    padding: 30px 20px;
  }
}
@media screen and (max-width: 768px) {
  .menu-disabled {
    display: none;
  }
}
</style>
