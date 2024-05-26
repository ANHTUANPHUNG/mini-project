<template>
  <div class="my-4 w-100 px-3" style="margin-left: 0">
    <div class="bg-white" style="border-radius: 5px">
      <div class="d-flex justify-content-between p-3 border-bottom">
        <div
          class="cursor-pointer text-purple"
          @click="$router.push({ name: 'admin.order.waiting.list' })"
        >
          <i
            class="bx bx-left-arrow-alt font-size-20 align-text-bottom pr-2"
          ></i>
          <span>Cập nhật đơn hàng</span>
        </div>
        <div>
          <button-custom-refresh-save
            :disabledButton="disabledButton"
            @refresh="refresh"
            @save="update"
          />
        </div>
      </div>
      <div class="row py-3" v-if="!loading">
        <div class="col-lg-12" style="padding: 0 32px">
          <order-phone v-model="entry" @update="(v) => (entry = v)" />
        </div>
        <div class="col-lg-12" style="padding: 0 32px">
          <order-address v-model="entry" @update="(v) => (entry = v)" />
        </div>
        <div class="col-lg-12" style="padding: 0 32px">
          <order-request v-model="entry" @update="(v) => (entry = v)" />
        </div>
        <div class="col-lg-12" style="padding: 0 32px">
          <order-multiselect v-model="entry" @update="(v) => (entry = v)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonCustom from "@/components/button-custom.vue";
import ButtonCustomRefreshSave from "@/components/button-custom-refresh-save.vue";
import OrderMultiselect from "./partials/order-multiselect.vue";
import OrderAddress from "./partials/order-address.vue";
import OrderRequest from "./partials/order-request.vue";
import axios from "axios";
import OrderPhone from "./partials/order-phone.vue";
export default {
  name: "update",
  components: {
    ButtonCustom,
    ButtonCustomRefreshSave,
    OrderMultiselect,
    OrderAddress,
    OrderRequest,
    OrderPhone,
  },
  data() {
    return {
      entry: { name: "", image: null, price: 0, description: "", status: null },
      loading: false,
      disabledButton: false,
      entry: {
      },
    };
  },
  methods: {
    async getItemById() {
      this.loading = true;
      const res = await axios.get(
        "http://localhost:3300/bills/" + this.$route.params.id
      );
      this.entry = res.data;
      this.loading = false;
    },
    async update() {
      const regexPhone = /^(\+84|0)[3|5|7|8|9]{1}\d{8}$/;
      if (!regexPhone.test(this.entry.phone)) {
        this.$toast.error("Số điện thoại không hợp lệ hoặc đang trống.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      if (!this.entry.address || this.entry.address.trim() === "") {
        this.$toast.error("Địa chỉ không được trống.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      if (!this.entry.products.length) {
        this.$toast.error("Sản phẩm không được trống.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      const today = new Date();
      let date =
        `${today.getFullYear()}-` +
        `${today.getMonth() + 1}-` +
        `${today.getDate()} ` +
        `${today.getHours()}:` +
        `${today.getMinutes()}:` +
        `${today.getSeconds()}`;
      let totalProducts =0
      this.entry.products.forEach(
        (e) => (totalProducts += e.totalProduct)
      );
      let totalQuantity = 0
      this.entry.products.forEach(
        (e) => (totalQuantity += Number(e.quantity))
      );
      const data = {
        userId: null,
        status: "Chờ xác nhận",
        totalProducts: totalProducts,
        totalQuantity: totalQuantity,
        created: date,
        "request-description": this.entry.request,
        address: this.entry.address,
        phone: this.entry.phone,
        products: this.entry.products,
      };
      console.log(data);
      await this.$swal({
        title: "Tạo đơn hàng?",
        icon: "warning",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        confirmButtonColor: "purple",
        showCancelButton: true,
        preConfirm: async () => {
          const response = await axios.post(
            "http://localhost:3300/bills/" + this.$route.params.id,
            data
          );
          if (response) {
            this.$toast.success("Tạo đơn thành công.", {
              position: "top-right",
              timeout: 3000,
            });
            this.$router.push({
              name: "admin.order.waiting.list",
            });
          }
        },
      });
    },

    async refresh() {
      await this.$swal({
        title: "Khôi phục dữ liệu ban đầu?",
        confirmButtonColor: "purple",
        cancelButtonText: "Không đồng ý",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        preConfirm: async () => {
          this.getItemById();
        },
      });
    },
  },
  created() {
     this.getItemById();
  },
};
</script>
<style scoped></style>
