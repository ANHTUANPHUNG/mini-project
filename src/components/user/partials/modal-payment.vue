<template>
  <b-modal hide-footer hide-header v-model="entry">
    <div class="text-center font-size-26 pb-3">Xác nhận mua hàng</div>
    <div>
      <address-user v-model="information" @update="(v) => (information = v)" />
    </div>
    <div>
      <request-description
        v-model="information"
        @update="(v) => (information = v)"
      />
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
import { mapActions } from 'vuex'
import { dateTimeNow } from './../../core/myFunction'
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
      information: {
        address:'',
        description:''
      },
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
    ...mapActions(['CreateBill']),

    async createBill() {
      if (!this.information.address || this.information.address.trim() === "") {
        this.$toast.warning("Địa chỉ không được trống.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      let data = JSON.parse(localStorage.getItem("products"));
      let date = dateTimeNow()
      data = {
        ...data,
        address: this.information.address,
        "request-description": this.information.description,
        status: "Chờ xác nhận",
        created: date,
        delete: 0
      };
      await this.$swal({
        title: "Xác nhận đơn hàng?",
        icon: "warning",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        confirmButtonColor: "purple",
        showCancelButton: true,
        preConfirm: async () => {
          this.entry = false;
          const response = await this.CreateBill(data)
          if (response) {
            this.$toast.success("Tạo đơn thành công.", {
              position: "top-right",
              timeout: 3000,
            });
            localStorage.removeItem("products");
            eventBus.$emit("entries", []);

            this.$router.push({
              name: "user.order",
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
