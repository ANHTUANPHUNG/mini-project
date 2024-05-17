<template>
  <div id="app">
    <nav-bar v-model="menu" @update="(v) => (menu = v)" />
    <div class="d-flex w-100 h-100" style="margin-top: 50px;background-color: #eeeef4; min-height: 100vh;">
      <side-bar v-model="menu" @update="(v) => (menu = v)" />
      <div :style="{ width: menu ? 'calc(100% - 250px)' : 'calc(100% - 70px)' }">
        <transition name="slide-fade">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "./nav-bar.vue";
import SideBar from "./side-bar.vue";
export default {
  name: "app",
  components: {
    NavBar,
    SideBar,
  },
  data() {
    return {
      menu: true,
    };
  },
  created() {},
};
</script>
<style>
/* .slide-fade-enter-active {
  transform: translateX(20px);
  opacity: 0;
} */

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

/* .slide-fade-enter-from{
  transform: translateX(100px);
  opacity: 0;
} */
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.form-control:focus {
  box-shadow: 0 0 0 0.2rem #f3cbf3!important;
  border-color:#f3cbf3!important
}
.text-white {
  color: white;
}
.bg-white {
  background-color: white;
}
.cursor-pointer {
  cursor: pointer;
}
.font-size-16 {
  font-size: 16px;
}
.font-size-18 {
  font-size: 18px;
}
.font-size-20 {
  font-size: 20px;
}
.font-size-22 {
  font-size: 22px;
}
.font-size-24 {
  font-size: 24px;
}
.font-size-26 {
  font-size: 26px;
}
.font-size-28 {
  font-size: 28px;
}
.font-weight-100 {
  font-weight: 100;
}
.font-weight-200 {
  font-weight: 200;
}
.font-weight-300 {
  font-weight: 300;
}
.font-weight-400 {
  font-weight: 400;
}
.font-weight-500 {
  font-weight: 500;
}
.font-weight-600 {
  font-weight: 600;
}
.font-weight-100 {
  font-weight: 100;
}
.font-weight-700 {
  font-weight: 700;
}
.font-weight-800 {
  font-weight: 800;
}
.font-weight-900 {
  font-weight: 900;
}
ul {
  margin-bottom: 0 !important;
  padding: 0;
}
li {
  margin: 0;
  padding: 0;
}
.text-purple {
  color: #a709a7;
}
.bg-purple {
  background-color: #a709a7;
}
.text-light-ray {
  color: rgb(228, 219, 219);
}
.bg-light-ray {
  background-color: rgb(228, 219, 219);
}
#app {
  font-family: "Times New Roman", Times, serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
}
/* 
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
