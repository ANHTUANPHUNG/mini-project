<template>
  <div
    v-if="loading"
    class="text-center w-100 d-flex justify-content-center py-5"
  >
    <div>
      <div style="text-align: -webkit-center">
        <div class="loader"></div>
        <span>Đang tải dữ liệu</span>
      </div>
    </div>
  </div>
  <div v-else>
    <div v-if="!checkForm" class="row mb-3">
      <div class="col-12">
        <span
          class="font-size-20"
          style="font-weight: 900; text-transform: uppercase"
        >
          {{ title }}
        </span>
      </div>
      <div class="col-12 mt-2" style="">
        <div
          class="carousel-container"
          style="
            background-color: #cfc6a5;
            position: relative;
            border-radius: 5px;
          "
        >
          <div class="chevron-left cursor-pointer">
            <i
              @click="prev"
              class="bx bx-chevron-left font-size-24 text-white"
            ></i>
          </div>
          <div class="carousel">
            <div
              class="item m-2 pb-2"
              style="background-color: rgb(255 171 229); cursor: pointer"
              v-for="(item, index) in displayItems"
              :key="index"
              @click="productDetail(item)"
            >
              <div
                class="w-100 image-container"
                style="display: grid; position: relative"
              >
                <img
                  class="image"
                  style="width: 100%; height: 300px"
                  :src="item.image?.secure_url"
                  alt=""
                />
                <span
                  style="font-weight: 800; z-index: 20"
                  class="text-center pt-2 font-size-18 text-img"
                >
                  {{ item.name }}
                </span>
                <div class="text-center pt-3">
                  <span style="font-weight: 600; z-index: 20" class=" ">{{
                   item.price|  formatNumberWithDotAndCurrency
                  }}</span>
                </div>
                <div style="position: absolute; bottom: 0; right: 10px">
                  <i
                    class="bx bxs-cart-add font-size-26"
                    @click.stop="addProduct(item)"
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <div class="chevron-right cursor-pointer">
            <i
              @click="next"
              class="bx bx-chevron-right font-size-24 text-white"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="col-12" style="background-color: #cfc6a5; border-radius: 5px">
        <div style="position: relative">
          <div class="row p-2 mb-4">
            <div
              class="col-lg-3 col-md-4 col-sm-4 col-6 py-2 item-render"
              style="cursor: pointer; border: 1px solid gainsboro"
              v-for="(item, index) in items"
              :key="index"
              @click="productDetail(item)"
            >
              <div class="w-100" style="display: grid; position: relative">
                <img
                  style="width: 100%; height: 200px"
                  :src="item.image?.secure_url"
                  alt=""
                />
                <span
                  style="font-weight: 800"
                  class="text-center pt-2 font-size-18"
                >
                  {{ item.name }}
                </span>
                <div class="text-center pt-3">
                  <span style="color: #cb102c">{{
                    item.price | formatNumberWithDotAndCurrency
                  }}</span>
                </div>
                <div style="position: absolute; bottom: 0; right: 10px">
                  <i
                    class="bx bxs-cart-add font-size-26"
                    @click.stop="addProduct(item)"
                  ></i>
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
import axios from "axios";
import { eventBus } from "@/main";
import { mapActions } from "vuex";

export default {
  name: "product-item",
  props: {
    title: String,
    api: String,
    checkForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [],
      currentIndex: 0,
      window: {
        width: 0,
        height: 0,
      },
      user: null,
      entries: null,
      loading: false,
    };
  },
  computed: {
    displayItems() {
      const start = this.currentIndex;
      let end = 0;
      if (this.window.width >= 768) {
        end = start + 3;
      } else {
        end = start + 2;
      }
      return this.items
        .slice(start, end)
        .concat(this.items.slice(0, Math.max(0, end - this.items.length)));
    },
  },
  watch: {
    entries: {
      handler() {
        eventBus.$emit("entries", this.entries);
      },
      deep: true,
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    ...mapActions(['ListDrink','ListFood','ListSpecialty','CreateFood']),

    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    async getList() {
      this.loading = true;
      let response;
      if(this.api == 'food'){
        response = await this.ListFood()
      }
      if(this.api == 'drink'){
        response = await this.ListDrink()
      }
      if(this.api == 'specialty'){
        response = await this.ListSpecialty()
      }
      this.items = response.filter(({ status }) => status.id == 1);
      this.loading = false;
    },
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    },
    prev() {
      this.currentIndex =
        (this.currentIndex - 1 + this.items.length) % this.items.length;
    },
    async addProduct(value) {
      if (!this.user) {
        this.$toast.error("Bạn chưa đăng nhập vào ứng dụng", {
          position: "top-right",
          timeout: 4000,
        });
        return;
      }
      this.$swal({
        title: "Thêm sản phẩm vào giỏ hàng?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        preConfirm: () => {
          const resLocal = JSON.parse(localStorage.getItem("products"));
          let data = {};
          if (!resLocal) {
            data.userId = this.user.id;
            data.phone = this.user.phone;
            data.products = [
              { product: value, quantity: 1, totalProduct: value.price },
            ];
            data.totalProducts = value.price;
            data.totalQuantity = 1;
            const products = JSON.stringify(data);
            localStorage.setItem("products", products);
          } else {
            const checkProduct = resLocal.products.find(
              (e) => e.product.id == value.id && e.product.name == value.name
            );
            if (!checkProduct) {
              let data = {
                ...resLocal,
                products: [
                  ...resLocal.products,
                  { product: value, quantity: 1, totalProduct: value.price },
                ],
                totalProducts: resLocal.totalProducts + value.price,
                totalQuantity: resLocal.totalQuantity + 1,
              };
              localStorage.setItem("products", JSON.stringify(data));
            } else {
              const checkIndexProduct = resLocal.products.findIndex(
                (e) => e.product.id == value.id && e.product.name == value.name
              );
              let quantity = resLocal.products[checkIndexProduct].quantity + 1;
              resLocal.products[checkIndexProduct].quantity = quantity;
              resLocal.products[checkIndexProduct].totalProduct += value.price;
              resLocal.totalProducts = resLocal.totalProducts + value.price;
              resLocal.totalQuantity = resLocal.totalQuantity + 1;
              localStorage.setItem("products", JSON.stringify(resLocal));
            }
          }
          this.entries = JSON.parse(localStorage.getItem("products"));
        },
      });
    },
    productDetail(value) {
      this.$router.push({
        name: "user.detail",
        params: { id: value.id, type: value.type },
      });
    },
  },
  created() {
    this.getList();
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  },
};
</script>

<style scoped>
#slider {
  overflow: hidden;
}

.slide-leave-active,
.slide-enter-active {
  transition: 0.5s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.chevron-left,
.chevron-right {
  position: absolute;
  top: 40%;
  z-index: 100;
}
.chevron-left {
  left: 2px;
}
.chevron-right {
  right: 2px;
}
.chevron-left:hover,
.chevron-right:hover {
  border-radius: 50px;
  width: 24px;
  height: 24px;
  border: 1px solid gainsboro;
  background-color: rgb(255, 171, 229);
}
.bxs-cart-add {
  color: white;
}
.bxs-cart-add:hover {
  color: orange;
}
.carousel-container {
  display: flex;
  align-items: center;
}
.carousel {
  display: flex;
  overflow: hidden;
  width: 100%;
}
.item {
  width: 33.333333333333333%;
}

.image-container {
  overflow: hidden;
  will-change: transform;
}
.image-container:hover .image {
  animation: img 1s forwards;
}
.image-container,
.image-container:hover {
  backface-visibility: visible;
}

@keyframes img {
  0% {
    transform: scale(1, 1);
    opacity: 1;
  }
  100% {
    transform: scale(1.6, 1.6);
    opacity: 0.3;
  }
}
@media screen and (max-width: 768px) {
  .item {
    width: 50%;
  }
}
</style>
