<template>
  <b-modal hide-footer hide-header v-model="entry">
    <div class="text-center font-size-26 pb-3">Xác nhận mua hàng</div>
    <div>
      <address-user v-model="information" @update="(v) => (information = v)" />
    </div>
    <div>
      <request-description v-model="information" @update="(v) => (information = v)" />
    </div>
    <div class="d-flex justify-content-end">
      <div class="pr-3">
        <b-button @click="entry = false"> Hủy </b-button>
      </div>
      <div>
        <b-button @click="createBill" variant="primary"> Xác nhận </b-button>
      </div>
    </div>
  </b-modal>
</template>
<script>
import axios from "axios";
import { eventBus } from "@/main";
import RequestDescription from "./request-description.vue";
import AddressUser from "./address-user.vue";
export default {
  name: "modal-payment",
  props: {
    value: Boolean,
    user: Object,
  },
  components: {
    RequestDescription,
    AddressUser,
  },
  data() {
    return {
      entry: false,
      information: {},
    };
  },
  watch: {
    value: {
      handler() {
        this.entry = this.value;
      },
    },
    entry: {
      handler() {
        this.$emit("update", this.entry);
      },
    },
  },
  methods: {
    async createBill() {
      if (!this.information.address || this.information.address.trim() === "") {
        await this.$swal({
          text: "Địa chỉ không được trống.",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      }
      let data = JSON.parse(localStorage.getItem("products"));
      const today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      data = {
        ...data,
        address: this.information.address,
        "request-description": this.information.description,
        "status": "Chờ xác nhận",
        created: date
      };
      await this.$swal({
        title: "Xác nhận đơn hàng?",
        icon: "warning",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        confirmButtonColor: "purple",
        showCancelButton: true,
        preConfirm: async () => {
          this.entry=false
          const response = await axios.post("http://localhost:3300/bills", data);
          if (response) {

            this.$swal({
              title: "Tạo đơn thành công",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });
            localStorage.removeItem('products')
            eventBus.$emit("entries", []);

            this.$router.push({
                name: "user.home",
              });
          }
        },
      });
    },
  },
  created() {
    this.entry = this.value;
  },
};
</script>
