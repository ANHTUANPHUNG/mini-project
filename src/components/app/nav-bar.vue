<template>
  <div class="d-flex justify-content-between align-items-center px-3 w-100 nav-bar-wrapper">
    <div class="text-white d-flex align-items-center">
      <i class="bx bx-menu mr-3 font-size-26 cursor-pointer" @click="menu = !menu"></i>
      <div class="font-size-20 display-none">Ẩm thực xứ Huế</div>
    </div>
    <div
      class="cursor-pointer d-flex align-items-center"
      @click="dropdown = !dropdown"
      style="position: relative"
    >
      <img src="./../../assets/logo.png" class="avatar bg-white" />
      <span class="text-white font-size-18 px-2 display-none">Bà Tuyết</span>

      <i class="bx bx-chevron-down font-size-20 text-white"></i>
      <div class="pt-1 cursor-pointer dropdown-list" v-if="dropdown">
        <div class="pl-2 pb-2 dropdown-item" @click="modalInformation = !modalInformation"><i class="bx bx-user"></i> Thông tin</div>
        <div class="border-bottom pl-2 pb-2 dropdown-item" @click="modalResetPassword = !modalResetPassword">
          <i class="bx bx-key"></i> Đổi mật khẩu
        </div>
        <div class="pl-2 py-2 dropdown-item" @click="handleLogout"><i class="bx bx-power-off"></i> Thoát</div>
      </div>
      
    </div>
    <modal-information
      @update="(v) => (modalInformation = v)"
      :value="modalInformation"
      :user="user"
    />
    <modal-reset-password
      @update="(v) => (modalResetPassword = v)"
      :value="modalResetPassword"
      :user="user"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ModalInformation from '../user/partials/modal-information.vue';
import ModalResetPassword from '../user/partials/modal-reset-password.vue';

export default {
  name: "nav-bar",
  props:{
    value: Boolean
  },
  components: { ModalInformation, ModalResetPassword },
  data() {
    return {
      dropdown: false,
      menu: true,
      modalInformation: false,
      modalResetPassword: false,
      resetPassword: {},
      user: null,

    };
  },
  watch:{
    menu:{
        handler(){
            this.$emit('update', this.menu)
        },
        deep:true
    },
    value:{
      handler(){
        this.menu = this.value
      },
      deep:true
    },
    modalInformation: {
      handler() {
        this.updateModal([this.modalInformation, this.modalResetPassword])
      },
      deep: true,
    },
    modalResetPassword: {
      handler() {
        this.updateModal([this.modalResetPassword, this.modalInformation])
      },
      deep: true,
    },
  },

  methods: {
    ...mapActions(['updateModal']),

    handleLogout() {
      localStorage.removeItem('user');
      this.$router.push({name:'register-login'}); 
    }
  },
  created(){
    this.menu = this.value
    this.user = JSON.parse(localStorage.getItem("user"));
  }
};
</script>
<style scoped>
.nav-bar-wrapper {
  background-color: #a709a7;
  height: 50px;
  position: fixed;
  top: 0;
  z-index: 1000;
}
img {
  width: 35px;
  border-radius: 50px;
}
.dropdown-list {
  position: absolute;
  background-color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 13px 1px #aaa;
  top: 43px;
  width: 140px;
  animation: down 0.1s ease-in;
}
@keyframes down {
  from {
    top: 40px;
  }
  to {
    top: 43px;
  }
}
.dropdown-item:hover {
  background-color: rgb(248, 242, 242);
}
@media screen and (max-width : 576px) {
  .display-none {
    display: none;
  }
}
</style>
