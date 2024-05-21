<template>
  <div class="form-reset-password p-4 row">
    <div
      class="d-flex align-items-center text-login"
      @click="() => this.$emit('checkUpdate', 'login')"
    >
      <i class="bx bx-left-arrow-alt font-size-16"></i>
      <div>Trở về</div>
    </div>
    <div v-if="!email" class="col-12">
      <email :checkReset="true" v-model="entry" @update="(v) => (entry = v)" />
    </div>
    <div v-else class="col-12">
      <password
        :checkReset="true"
        v-model="entry"
        @update="(v) => (entry = v)"
      />
      <new-password v-model="entry" @update="(v) => (entry = v)" />
    </div>
    <div class="col-12">
      <div v-if="!email" class="d-flex justify-content-center">
        <b-button class="button-save" @click="checkEmail">Tìm kiếm</b-button>
      </div>
      <div v-else class="d-flex justify-content-center">
        <b-button class="button-save" @click="resetPassword">Cập nhật</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonCustomRefreshSave from "@/components/button-custom-refresh-save.vue";
import Username from "./partials/username.vue";
import Password from "./partials/password.vue";
import NewPassword from "./partials/new-password.vue";
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
    NewPassword,
  },
  data() {
    return {
      registerLogin: false,
      email: false,
      entries: [],
      entry: {},
      idUser: "",
    };
  },
  methods: {
    async getList() {
      this.loading = true;
      const response = await axios.get("http://localhost:3300/users");
      this.entries = response.data;
      this.loading = false;
    },
    async checkEmail() {
      const email = this.entries.find((e) => e.email == this.entry.email);
      if (!email) {
        this.email = false;
        await this.$swal({
          text: "Email không tồn tại.",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      }
      await this.$swal({
        text: "Nhập mật khẩu mới.",
        confirmButtonText: "Đồng ý",
        confirmButtonColor: "purple",
        icon: "success",
      });
      this.idUser = email.id;
      this.email = true;
    },
    async resetPassword() {
      if (this.entry.password != this.entry.newPassword) {
        await this.$swal({
          text: "Mật khẩu không trùng khớp",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      }
      if (!this.entry.password || this.entry.password.trim() === "") {
        await this.$swal({
          text: "Mật khẩu không được trống.",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      }
      await this.$swal({
        title: "Xác nhận cập nhật mật khẩu?",
        icon: "warning",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        confirmButtonColor: "purple",
        showCancelButton: true,
        preConfirm: async () => {
          const response = await axios.patch(
            "http://localhost:3300/users/" + this.idUser,
            {'password' : this.entry.password}
          );
          if (response) {
            this.$swal({
              title: "Cập nhật thành công",
              icon: "success",
              confirmButtonColor: "purple",
            });
            this.$emit("checkUpdate", "login");
          }
        },
      });
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
