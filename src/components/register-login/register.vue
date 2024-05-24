<template>
  <div  class="form-register py-4 row  rounded" >
    <div class="col-12">
      <email v-model="entry" @update="(v) => (entry = v)" />
    </div>
    <div class="col-12">
      <username v-model="entry" @update="(v) => (entry = v)" />
    </div>
    <div class="col-12">
      <password v-model="entry" @update="(v) => (entry = v)" />
    </div>
    <div class="col-12">
      <dob v-model="entry" @update="(v) => (entry = v)" />
    </div>
    <div class="col-12">
      <address-user v-model="entry" @update="(v) => (entry = v)" />
    </div>
    <div class="col-12">
      <sex v-model="entry" @update="(v) => (entry = v)" />
    </div>
    <div class="col-12">
      <div class="d-flex justify-content-between px-5">
        <b-button class="bg-white text-secondary button-save font-size-18" @click="registerUser"
          >Đăng kí</b-button
        >
        <span class="text-register" @click="() => this.$emit('checkUpdate', 'login')">
          Đăng nhập
        </span>
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
  name: "register",
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
      entry: {
        address: "",
        sex: "",
        username: "",
        password: "",
        dob: "",
      },
      entries: [],
    };
  },
  methods: {
    async getList() {
      this.loading = true;
      const response = await axios.get("http://localhost:3300/users");
      this.entries = response.data;
      this.loading = false;
    },
    async registerUser() {
      const errorUsername = this.entries.find((e) => e.username == this.entry.username);
      if (errorUsername) {
        await this.$swal({
          text: "Tên đăng nhập đã tồn tại.",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      }
      const errorEmail = this.entries.find((e) => e.email == this.entry.email);
      if (errorEmail) {
        await this.$swal({
          text: "Email đã tồn tại.",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      }
      const email =
        /^\w+(\.?\w+)*@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.entry.email || this.entry.email.trim() === "") {
        await this.$swal({
          text: "Email không được trống.",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      } else if (!email.test(this.entry.email)) {
        await this.$swal({
          text: "Email không hợp lệ.",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      }
      if (!this.entry.username || this.entry.username.trim() === "") {
        await this.$swal({
          text: "Tên đăng nhập không được trống.",
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
      const dobDate = new Date(this.entry.dob);
      const today = new Date();
      const age = Math.floor((today - dobDate) / (1000 * 60 * 60 * 24 * 365));
      if (!this.entry.dob || this.entry.dob.trim() === "" || age < 12) {
        await this.$swal({
          text: "Ngày sinh không được trống và bạn phải đủ 12 tuổi.",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      }
      if (!this.entry.address || this.entry.address.trim() === "") {
        await this.$swal({
          text: "Địa chỉ không được trống.",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      }
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      this.entry = {...this.entry, role:'client', created: date}
      await this.$swal({
        title: "Tạo tài khoản?",
        icon: "warning",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        confirmButtonColor: "purple",
        showCancelButton: true,
        preConfirm: async () => {
          const response = await axios.post("http://localhost:3300/users", this.entry);
          if (response) {
            this.$swal({
              title: "Tạo thành công",
              icon: "success",
              confirmButtonColor: "purple",
            });
            this.$emit('checkUpdate', 'login')
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
.form-register {
  background-color: white;

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

.text-register {
  text-decoration: underline;
  cursor: pointer;
}
.text-register:hover {
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
