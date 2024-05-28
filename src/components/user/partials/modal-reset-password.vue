<template>
  <b-modal hide-footer hide-header v-model="entry">
    <div class="text-center font-size-20" style="font-weight: 600">
      Thay đổi mật khẩu
    </div>
    <div class="py-4">
      <password
        :checkReset="true"
        v-model="resetPassword"
        @update="(v) => (resetPassword = v)"
        @enter="checkEnter"
      />
      <new-password
        v-model="resetPassword"
        @enter="checkEnter"
        @update="(v) => (resetPassword = v)"
      />
    </div>
    <div class="d-flex justify-content-end">
      <div class="pr-3">
        <b-button @click="entry = false"> Hủy </b-button>
      </div>
      <div>
        <b-button variant="primary" class="button-save" @click="update"
          >Cập nhật</b-button
        >
      </div>
    </div>
  </b-modal>
</template>
<script>
import axios from "axios";
import NewPassword from "./new-password.vue";
import Password from "./password.vue";
import { mapActions } from "vuex";

export default {
  name: "modal-reset-password",
  props: {
    value: Boolean,
    user: Object,
  },
  components: { Password, NewPassword },
  data() {
    return {
      resetPassword: {},
      entry: false,
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
    ...mapActions(['GetByIdUser','PasswordUser']),

    checkEnter(event) {
      if (event.keyCode === 13) {
        this.update();
      }
    },
    async resetLocalStorage() {
      const response = await this.GetByIdUser(this.user.id)
      localStorage.setItem("user", JSON.stringify(response));
    },
    async update() {
      if (
        !this.resetPassword.password ||
        this.resetPassword.password.trim() === ""
      ) {
        this.$toast.error("Mật khẩu không được trống.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      if (this.resetPassword.password != this.resetPassword.newPassword) {
        this.$toast.error("Mật khẩu không trùng khớp.", {
          position: "top-right",
          timeout: 3000,
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
          const response = await this.PasswordUser({
            id: this.user.id,
            entry: {
              password: this.resetPassword.password,
            },
          });
          if (response) {
            this.$toast.success("Cập nhật thành công.", {
              position: "top-right",
              timeout: 3000,
            });
            this.resetPassword.password =''
            this.resetPassword.newPassword =''
            this.entry = false;
            this.resetLocalStorage();
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
