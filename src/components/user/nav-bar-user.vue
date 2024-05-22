<template>
  <div class="d-flex justify-content-between py-2 align-items-center nav-bar-user-wrapper">
    <div>
      <img class="logo-img" src="./../../assets/logobunbohue06082016100021.jpg" alt="" />
    </div>
    <div class="d-flex align-items-center">
      <div class="text-white">
        <ul>
          <li class="menu-item" @click="$router.push({ name: 'user.home' })">Trang chủ</li>
          <li class="menu-item" @click="$router.push({ name: 'user.specialty' })">Đặc sản</li>
          <li class="menu-item" @click="$router.push({ name: 'user.food' })">Đồ ăn</li>
          <li class="menu-item" @click="$router.push({ name: 'user.drink' })">Thức uống</li>
          <li class="menu-item" @click="$router.push({ name: 'user.contact' })">Liên hệ</li>
        </ul>
      </div>
    </div>
    <div class="">
      <b-button variant="light" @click="$router.push({ name: 'register-login' })"
        >Đăng nhập</b-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-bar-user",
  components: {},
};
</script>
<style scoped>
.nav-bar-user-wrapper {
  position: fixed;
  top: 0;
  height: 90px;
  width: 100%;
  padding: 0 80px;
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
