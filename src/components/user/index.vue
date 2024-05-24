<template>
    <div  v-if="user?.role !='admin'"
      style="
        background-image: url('https://res.cloudinary.com/dw4xpd646/image/upload/v1716350153/jnowfqcrvcqzrzh4w1hp.jpg'); 
      "
    >
      <nav-bar-user />
      <div class="user-wrapper " >
          <router-view></router-view>
      </div>
      <footer-user/>
  </div>
  </template>
  <script>
  import NavBarUser from "./nav-bar-user.vue";
  import MenuItem from "./partials/menu-item.vue";
  import Carousel from "./partials/carousel.vue";
  import ProductItem from './partials/product-item.vue';
  import FooterUser from './footer-user.vue';
  export default {
    name: "index",
    components: {
      NavBarUser,
      Carousel,
      MenuItem,
      ProductItem,
      FooterUser
    },
    data() {
      return {
        user: {},
      };
    },
    created() {
      const userLocal = JSON.parse(localStorage.getItem('user'))
      this.user = userLocal
      if(this.user?.role == 'admin' ){
        this.$router.push({name: 'admin.dashboard.home'})
      }
    },
  };
  </script>
  <style scoped>
  
  .user-wrapper {
    margin-top: 90px;
  }
  
  @media screen and (max-width: 767px) {
    .user-wrapper {
      margin-top: 70px;
    }
  }
  @media screen and (max-width: 576px) {
    .user-wrapper {
      margin-top: 50px;
    }
  }
  .page-home{
    cursor: pointer;
  }
  .page-home:hover{
    color: rgb(250, 181, 53);
  }
  </style>
  