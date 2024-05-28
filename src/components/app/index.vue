<template>
  <div v-if="localUser?.role == 'admin'">
    <nav-bar v-model="menu" @update="(v) => (menu = v)" />
    <div
      class="d-flex w-100 h-100"
      style="margin-top: 50px; background-color: #eeeef4; min-height: 100vh"
    >
      <side-bar class="sidebar" v-model="menu" @update="(v) => (menu = v)" />
      <div
        class="content-container"
        :style="{ width: menu ? 'calc(100% - 250px)' : 'calc(100% - 70px)' }"
      >
        <transition name="slide-fade">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
  <div v-else>
    <error/>
  </div>
</template>
<script>
import NavBar from "../nav-bar.vue";
import SideBar from "../side-bar.vue";
import Error from "./../error.vue"
import { mapGetters } from 'vuex';

export default {
  name: "index",
  components: {
    NavBar,
    SideBar,
    Error
  },
  data() {
    return {
      menu: true,
      user: null,
    };
  },
  computed:{
    ...mapGetters(['localUser'])
  },
  // created() {
  //   const user = localStorage.getItem("user");
  //   this.user = JSON.parse(user)
  // },
};
</script>
