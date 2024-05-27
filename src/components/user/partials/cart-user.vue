<template>
  <div style="">
    <div class="cart-user-wrapper">
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
          <div
            class="w-100 h-100"
            style="background-color: white; border-radius: 10px"
          >
            <div class="row mx-3">
              <div class=" col-12">
                <div class="table-wrapper">
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
                    <tr v-for="item in entries?.products" :key="item.product.id">
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
                      <td class="text-center">{{ item.product.price | formatNumberWithDotAndCurrency}}</td>
                      <td class="text-center">
                        <b-button-group class="my-2">
                          <b-button
                            :disabled="item.quantity == 1"
                            @click="item.quantity--"
                            variant=""
                            >-</b-button
                          >
                          <b-input
                            style="width: 40px"
                            type="number"
                            :value="item.quantity"
                          ></b-input>
                          <b-button @click="item.quantity += 1" variant=""
                            >+</b-button
                          >
                        </b-button-group>
                      </td>
                      <td class="text-center">
                        {{ item.product.price * item.quantity | formatNumberWithDotAndCurrency}}
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
                
                <div class="border-top py-3">
                  <div
                    class="text-right border-bottom pb-2"
                  >
                    <span>Tổng: </span>
                    <span>{{ totalProducts |formatNumberWithDotAndCurrency}}</span>
                  </div>
                  <div class="d-flex justify-content-between py-3">
                    <b-button variant="outline-success">
                      <div
                        class="d-flex align-items-center"
                        @click="$router.push({ name: 'user.home' })"
                      >
                        <i class="bx bxs-left-arrow-alt"></i>Tiếp tục xem sản
                        phẩm
                      </div>
                    </b-button>
                    <b-button
                      :disabled="!entries.products?.length"
                      variant="outline-primary"
                      @click="modalPayment =!modalPayment"
                    >
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
    <modal-payment
      @update="(v) => (modalPayment = v)"
      :value="modalPayment"
      :user="user"
    />
    
  </div>
  
</template>
<script>
import { eventBus } from "@/main";
import MenuItem from "./menu-item.vue";
import ProductItem from "./product-item.vue";
import RequestDescription from './request-description.vue';
import AddressUser from './address-user.vue';
import ModalPayment from './modal-payment.vue'
export default {
  name: "list",
  components: {
    MenuItem,
    ProductItem,
    RequestDescription,
    AddressUser,
    ModalPayment
  },
  data() {
    return {
      user: null,
      entry: null,
      count: 1,
      entries: [],
      loading: false,
      totalProducts: 0,
      modalPayment:false,
    };
  },
  watch: {
    entries: {
      handler() {
        let total = 0;
        this.entries?.products.forEach((e, index) => {
          this.entries.products[index].totalProduct =
            e.quantity * e.product.price;
          total += e.quantity * e.product.price;
        });
        this.totalProducts = total;
        this.entries.totalProducts = this.totalProducts;
        localStorage.setItem("products", JSON.stringify(this.entries));
        eventBus.$emit("entries", this.entries);
      },
      deep: true,
    },
    modalPayment: {
      handler() {
        eventBus.$emit("checkModal", [this.modalPayment ]);
      },
      deep: true,
    },
  },
  methods: {
    deleteItem(value) {
      this.$swal({
        title: "Xoá món hàng này?",
        icon: "warning",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        showCancelButton: true,
        preConfirm: () => {
          const newEntries = this.entries?.products.filter(
            (e) =>
              e.product.id != value.product.id &&
              e.product.name != value.product.name
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
    this.totalProducts = JSON.parse(
      localStorage.getItem("products")
    ).totalProducts;
    eventBus.$on(
      "entries-nav",
      (value) => (
        (this.entries = value), (this.totalProducts = value.totalProducts)
      )
    );
  },
};
</script>
<style scoped>
.table-wrapper {
  overflow-x: auto;
}
.table {
  min-width: 600px; 
}

.table td {
  vertical-align: middle;
}
.cart-user-wrapper {
  padding: 40px 80px;
}
@media screen and (max-width: 768px) {
  .cart-user-wrapper {
    padding: 20px 30px;
  }
}
</style>
