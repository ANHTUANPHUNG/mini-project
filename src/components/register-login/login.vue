<template>
  <div v-if="loading" style="position: relative; height: 100vh;">
    <img
      class="w-100"
      style="height: 100%"
      src="./../../assets/Untitled.png"
      alt=""
    />
    <div class="form-container">
      <div class="form-login p-4 rounded" v-if="registerLogin == 'login'">
        <username-user
          v-model="entry"
          @update="(v) => (entry = v)"
          @enter="checkEnter"
        />
        <password-user
          v-model="entry"
          @update="(v) => (entry = v)"
          @enter="checkEnter"
        />
        <div class="text-right pb-3 font-size-14 text-purple">
          <span
            class="reset-password cursor-pointer"
            @click="registerLogin = 'resetPassword'"
            >Quên mật khẩu</span
          >
        </div>
        <div class="d-flex justify-content-center">
          <button-custom-refresh-save
            :checkRefresh="false"
            :value="false"
            @save="login"
          />
        </div>
        <div class="text-center pt-2 font-size-14">
          Chưa có tài khoản?
          <span class="text-register" @click="registerLogin = 'register'"
            >Tạo tài khoản</span
          >
        </div>
      </div>
      <div v-else-if="registerLogin == 'register'" class="register">
        <register
          :value="registerLogin"
          @checkUpdate="(v) => (registerLogin = v)"
        />
      </div>
      <div v-else class="reset">
        <reset-password
          :value="registerLogin"
          @checkUpdate="(v) => (registerLogin = v)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ButtonCustomRefreshSave from "@/components/button-custom-refresh-save.vue";
import UsernameUser from "./partials/username-user.vue";
import PasswordUser from "./partials/password-user.vue";
import Register from "./register.vue";
import ResetPassword from "./reset-password.vue";
import axios from "axios";
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: "login",
  components: {
    ButtonCustomRefreshSave,
    UsernameUser,
    PasswordUser,
    ResetPassword,Register
  },
  data() {
    return {
      registerLogin: "login",
      entry: {},
      check: null,
      loading: false,
    };
  },
  computed:{
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['ListUser']),
    ...mapMutations(['setUser']),
    async login() {
      const response = await this.ListUser();
      const checkAccount = response.find(
        (e) =>
          e.username == this.entry.username && e.password == this.entry.password
      );
      if (!checkAccount) {
        this.$toast.error("Tài khoản hoặc mật khẩu không đúng.", {
              position: "top-right",
              timeout: 3000,
            });
        return;
      }
      if (checkAccount.role == "admin") {
        const user = JSON.stringify(checkAccount);
        localStorage.setItem("user", user);
        this.$router.push({ name: "admin.dashboard" });
      } else {
        const user = JSON.stringify(checkAccount);
        localStorage.setItem("user", user);
        this.$router.push({ name: "user.home" });
      }
      // this.setUser(localStorage.getItem('user'))
      // console.log(this.user);
    },
    checkEnter(event) {
      if (event.keyCode === 13) {
        this.login();
      }
    },
  },
  async created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role == "admin") {
      await this.$router.push({ name: "admin.dashboard" });
    } else if (user?.role == "client") {
      await this.$router.push({ name: "user.home" });
    }
    this.loading = true;
  },
};
</script>
<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.form-login {
  background-color: white;
  animation: login 1s ease-in-out;
}

@keyframes login {
  from {
    transform: translateY(-100px);
    opacity: 0.1;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.reset-password:hover {
  color: red;
}
.reset-password {
  text-decoration: underline;
}
.text-register {
  text-decoration: underline;
  cursor: pointer;
}
.text-register:hover {
  color: #a709a7;
}
@media screen and (min-width: 992px) {
  .register {
    width: 50%;
  }
  .reset{
    width: 30%;

  }
}
@media screen and (min-width: 576px) and (max-width: 991px){
  .register {
    width: 70%;
  }
  .reset{
    width: 50%;

  }
}
</style>
