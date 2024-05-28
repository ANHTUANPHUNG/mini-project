<template>
  <div id="app" style="position: absolute;width: 100%">
    <div style="">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
  components: {
  },
  data() {
    return {
    };
  },
  created() {
  },
};
</script>
<style>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
.swal2-shown .swal2-height-auto{
  padding-right: 0px!important;
}
.slide-fade-enter-active {
  /* transition: all .9s ease-in-out; */
  animation: side-fade 0.9s ease-out;
}
@keyframes side-fade {
  from {
    transform: translateX(-30px);
    opacity: 0.1;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
/* .slide-fade-leave-active {
  transition: all .0s cubic-bezier(1.0, 0.5, 0.8, 1.0);
} */
.slide-fade-leave-to {
  opacity: 0;
}
.form-control:focus {
  /* box-shadow: 0 0 0 0.2rem #f3cbf3!important; */
  border-color: #f3cbf3 !important;
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
.font-size-14 {
  font-size: 14px;
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
.loader {
  width: 25px;
  height: 25px;
  --b: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 1px;
  background: conic-gradient(#0000 10%, #a709a7) content-box;
  -webkit-mask: repeating-conic-gradient(
      #0000 0deg,
      #000 1deg 20deg,
      #0000 21deg 36deg
    ),
    radial-gradient(
      farthest-side,
      #0000 calc(100% - var(--b) - 1px),
      #000 calc(100% - var(--b))
    );
  -webkit-mask-composite: destination-in;
  mask-composite: intersect;
  animation: l4 1s infinite steps(10);
}
@keyframes l4 {
  to {
    transform: rotate(1turn);
  }
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
@media screen and (max-width: 992px) {
  .content-container {
    width: 100% !important;
  }
  /* .sidebar {
    display: none; 
  } */
}
.modal-backdrop{
  background-color: transparent!important;
}
.Vue-Toastification__container{
  z-index: 1000000!important;
}
</style>
