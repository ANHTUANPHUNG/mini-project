<template>
  <div style="position: relative">
    <img class="w-100" src="./../../assets/Untitled.png" alt="" />
    <div class="form-login p-4" v-if="registerLogin == 'login'">
      <username v-model="entry" @update="(v) => (entry = v)"/>
      <password v-model="entry" @update="(v) => (entry = v)"/>
      <div  class="text-right pb-3 font-size-14 text-purple cursor-pointer reset-password" @click="registerLogin = 'resetPassword'">
        Quên mật khẩu
      </div>
      <div class="d-flex justify-content-center">
        <button-custom-refresh-save :checkRefresh="false" :value="false" @save="login" />
      </div>
      <div class="text-center pt-2 font-size-14">
        Chưa có tài khoản?
        <span class="text-register" @click="registerLogin = 'register'">Tạo tài khoản</span>
      </div>
    </div>
    <div v-else-if="registerLogin== 'register'" style="max-width: 35%">
      <register :value="registerLogin" @checkUpdate="v=> registerLogin=v" />
    </div>
    <div v-else style="max-width: 35%">
      <reset-password :value="registerLogin" @checkUpdate="v=> registerLogin=v" />
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
import Register from "./register.vue";
import ResetPassword from './reset-password.vue';
export default {
  name: "login",
  components: {
    ButtonCustomRefreshSave,
    Username,
    Password,
    Dob,
    AddressUser,
    Sex,
    Register,
    ResetPassword
  },
  data() {
    return {
      registerLogin: 'login',
      entry:{}
    };
  },
  methods: {
    login() {
      console.log("------");
    },
  },
};
</script>
<style scoped>
.form-login {
  position: absolute;
  background-color: white;
  top: 140px;
  left: 41%;
  opacity: 0.9;
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
</style>
