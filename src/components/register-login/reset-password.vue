<template>
  <div class="form-reset-password p-4 row">
    <div
      class="d-flex align-items-center text-login"
      @click="() => this.$emit('checkUpdate', 'login')"
    >
      <i class="bx bx-left-arrow-alt font-size-16"></i>
      <div>Trở về</div>
    </div>
    <div v-if="email" class="col-12">
      <email :checkReset="true" v-model="entry" @update="(v) => (entry = v)" />
    </div>
    <div v-else-if="!email" class="col-12">
      <password v-model="entry" @update="(v) => (entry = v)" />
      <password v-model="entry" @update="(v) => (entry = v)" />

    </div>
  
    <!-- <div class="col-12">
        <username v-model="entry" @update="(v) => (entry = v)" />
      </div>
      
      <div class="col-12">
        <dob v-model="entry" @update="(v) => (entry = v)" />
      </div>
      <div class="col-12">
        <address-user v-model="entry" @update="(v) => (entry = v)" />
      </div>
      <div class="col-12">
        <sex v-model="entry" @update="(v) => (entry = v)" />
      </div> -->
    <div class="col-12">
      <div class="d-flex justify-content-between px-5">
        <b-button class="bg-white text-secondary button-save font-size-18" @click="resetPassword"
          >Tìm kiếm</b-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import ButtonCustomRefreshSave from "@/components/button-custom-refresh-save.vue";
import Username from "./partials/username.vue";
import Password from "./partials/password.vue";
import Dob from "./partials/dob.vue";
import AddressUser from "./partials/address-user.vue";
import Sex from "./partials/sex.vue";
import Email from "./partials/email.vue";
import axios from "axios";
export default {
  name: "reset-password",
  props: {
    value: String,
  },
  components: {
    ButtonCustomRefreshSave,
    Username,
    Password,
    Dob,
    AddressUser,
    Sex,
    Email,
  },
  data() {
    return {
      registerLogin: false,
      email: true,
      entries: [],
      entry: {},
    };
  },
  methods: {
    async getList() {
      this.loading = true;
      const response = await axios.get("http://localhost:3300/users");
      this.entries = response.data;
      this.loading = false;
    },
    async resetPassword() {
      const email = this.entries.some((e) => e.email == this.entry.email);
      if (!email) {
        await this.$swal({
          text: "Email không đúng.",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      }
      this.email = email
     
      //   await this.$swal({
      //     title: "Tạo tài khoản?",
      //     icon: "warning",
      //     confirmButtonText: "Đồng ý",
      //     cancelButtonText: "Không đồng ý",
      //     confirmButtonColor: "purple",
      //     showCancelButton: true,
      //     preConfirm: async () => {
      //       const response = await axios.post("http://localhost:3300/users", this.entry);
      //       if (response) {
      //         this.$swal({
      //           title: "Tạo thành công",
      //           icon: "success",
      //           confirmButtonColor: "purple",
      //         });
      //         this.$emit("checkUpdate", "login");
      //       }
      //     },
      //   });
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style scoped>
.form-reset-password {
  position: absolute;
  background-color: white;
  top: 70px;
  left: 36%;
  opacity: 0.9;
  animation: register 1s ease-in-out;
}
@keyframes register {
  from {
    transform: translateY(-100px);
    opacity: 0.1;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.text-login {
  cursor: pointer;
}
.text-login:hover {
  color: #a709a7;
}
.button-save {
  border: 1px solid #a709a7;
  padding: 3px 12px !important;
  background-color: #a709a7 !important;
  color: white !important;
}
.button-save:hover {
  background-color: #8d008d !important;
  color: white !important;
}
.button-save:focus {
  box-shadow: 0 0 0 0.2rem #f3cbf3 !important;
}
</style>
