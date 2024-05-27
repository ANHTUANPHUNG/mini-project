<template>
  <div class="form-reset-password p-4 row rounded">
    <div
      class="d-flex align-items-center text-login"
      @click="() => this.$emit('checkUpdate', 'login')"
    >
      <i class="bx bx-left-arrow-alt font-size-16"></i>
      <div>Trở về</div>
    </div>
    <div v-if="!email" class="col-12">
      <email-user
        :checkReset="true"
        v-model="entry"
        @enter="checkEnter"
        @update="(v) => (entry = v)"
      />
    </div>
    <div v-else class="col-12">
      <password-user
        :checkReset="true"
        v-model="entry"
        @update="(v) => (entry = v)"
        @enter="checkEnter"
      />
      <new-password
        v-model="entry"
        @enter="checkEnter"
        @update="(v) => (entry = v)"
      />
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
import PasswordUser from "./partials/password-user.vue";
import NewPassword from "./partials/new-password.vue";
import EmailUser from "./partials/email-user.vue";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "reset-password",
  props: {
    value: String,
  },
  components: {
    ButtonCustomRefreshSave,
    PasswordUser,
    EmailUser,
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
    ...mapActions(["ListUser", "PasswordUser"]),

    async getList() {
      this.loading = true;
      const response = await this.ListUser();
      this.entries = response;
      this.loading = false;
    },
    async checkEmail() {
      const email = this.entries.find((e) => e.email == this.entry.email);
      if (!email) {
        this.email = false;
        this.$toast.error("Email đã tồn tại.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      this.$toast.success("Nhập mật khẩu mới.", {
        position: "top-right",
        timeout: 3000,
      });
      this.idUser = email.id;
      this.email = true;
    },
    async resetPassword() {
      if (!this.entry.password || this.entry.password.trim() === "") {
        this.$toast.error("Mật khẩu không được trống.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      if (this.entry.password != this.entry.newPassword) {
        this.$toast.error("Mật khẩu không trùng khớp.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      const user = this.entries.find((e) => e.email == this.entry.email);

      await this.$swal({
        title: "Xác nhận cập nhật mật khẩu?",
        icon: "warning",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        confirmButtonColor: "purple",
        showCancelButton: true,
        preConfirm: async () => {
          const response = await this.PasswordUser({
            id: this.idUser,
            entry: {
              password: this.entry.password,
            },
          });

          if (response) {
            this.$toast.success("Cập nhật thành công.", {
              position: "top-right",
              timeout: 3000,
            });
            this.$emit("checkUpdate", "login");
          }
        },
      });
    },
    checkEnter(event) {
      if (Object.keys(this.entry) == "email") {
        if (event.keyCode === 13) {
          this.checkEmail();
        }
      } else {
        if (event.keyCode === 13) {
          this.resetPassword();
        }
      }
    },
  },

  created() {
    this.getList();
  },
};
</script>
<style scoped>
.form-reset-password {
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
