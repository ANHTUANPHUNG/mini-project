<template>
  <div class="d-flex justify-content-between py-2 align-items-center nav-bar-user-wrapper">
    <div>
      <img class="logo-img" src="./../../assets/logobunbohue06082016100021.jpg" alt="" />
    </div>
    <div class="d-flex align-items-center">
      <div class="text-white">
        <ul>
          <li
            :class="menu == 'user.home' ? 'active' : ''"
            class="menu-item"
            @click="$router.push({ name: 'user.home' })"
          >
            Trang chủ
          </li>
          <li
            :class="menu == 'user.specialty' ? 'active' : ''"
            class="menu-item"
            @click="$router.push({ name: 'user.specialty' })"
          >
            Đặc sản
          </li>
          <li
            :class="menu == 'user.food' ? 'active' : ''"
            class="menu-item"
            @click="$router.push({ name: 'user.food' })"
          >
            Đồ ăn
          </li>
          <li
            :class="menu == 'user.drink' ? 'active' : ''"
            class="menu-item"
            @click="$router.push({ name: 'user.drink' })"
          >
            Thức uống
          </li>
          <li
            :class="menu == 'user.contact' ? 'active' : ''"
            class="menu-item"
            @click="$router.push({ name: 'user.contact' })"
          >
            Liên hệ
          </li>
        </ul>
      </div>
    </div>
    <div v-if="!user" class="">
      <b-button variant="light" @click="$router.push({ name: 'register-login' })"
        >Đăng nhập</b-button
      >
    </div>
    <div class="d-flex" v-else>
      <div class="cart">
        <i class="bx bxs-cart" style="position: relative">
          <b-badge variant="danger" class="badge">1</b-badge>
        </i>
      </div>
      <div
        class="cursor-pointer d-flex align-items-center"
        @click="dropdown = !dropdown"
        style="position: relative"
      >
        <span class="text-white font-size-18 px-2 display-none">Bà Tuyết</span>

        <i class="bx bx-chevron-down font-size-20 text-white"></i>
        <div class="pt-1 cursor-pointer dropdown-list" v-if="dropdown">
          <div class="pl-2 pb-2 dropdown-item"><i class="bx bx-user"></i> Thông tin</div>
          <div class="border-bottom pl-2 pb-2 dropdown-item">
            <i class="bx bx-key"></i> Đổi mật khẩu
          </div>
          <div class="pl-2 py-2 dropdown-item" @click="handleLogout">
            <i class="bx bx-power-off"></i> Thoát
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-bar-user",
  components: {},
  data() {
    return {
      user: null,
      dropdown: false,
      menu: "",
    };
  },
  watch: {
    $route: {
      handler() {
        this.menu = this.$route.name;
      },
      deep: true,
    },
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("user");
      this.$router.push({ name: "register-login" });
    },
  },
  created() {
    const user = localStorage.getItem("user");
    this.user = JSON.parse(user);
    this.menu = this.$route.name;
  },
};
</script>
<style scoped>
.dropdown-list {
  position: absolute;
  background-color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 13px 1px #aaa;
  top: 43px;
  right: 5px;
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
.cart {
  font-size: 34px;
  width: 51px;
  color: white;
  cursor: pointer;
}
.bxs-cart:hover {
  color: orange;
  font-size: 38px;
  position: relative;
}
.badge {
  position: absolute;
  width: 19px;
  font-size: small;
  border-radius: 10px;
  right: -6px;
}
.nav-bar-user-wrapper {
  position: fixed;
  top: 0;
  height: 90px;
  width: 100%;
  padding: 0 40px;
  z-index: 10000;
  background-color: #e300e3;
}
.menu-item {
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  padding: 0 20px;
}
.menu-item:hover {
  text-decoration: underline;
  color: orange;
}
.active {
  color: #000;
  text-decoration: underline;
}
.logo-img {
  height: 73px;
  border-radius: 40px;
}
@media screen and (max-width: 992px) and (min-width: 768px) {
  .nav-bar-user-wrapper {
    padding: 0 40px;
  }
  .menu-item {
    font-size: 18px;
  }
}
@media screen and (max-width: 767px) and (min-width: 576px) {
  .logo-img {
    height: 50px;
    border-radius: 40px;
  }
  .nav-bar-user-wrapper {
    padding: 0 20px;
  }
  .menu-item {
    padding: 0 5px;
    font-size: 16px;
  }
}
@media screen and (max-width: 576px) {
  .logo-img {
    height: 50px;
    border-radius: 40px;
  }
  .nav-bar-user-wrapper {
    padding: 0 20px;
  }
  .menu-item {
    padding: 0 5px;
    font-size: 16px;
  }
}
@media screen and (max-width: 767px) {
  .nav-bar-user-wrapper {
    height: 70px;
  }
}
</style>
