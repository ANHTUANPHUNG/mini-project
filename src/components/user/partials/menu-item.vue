<template>
  <div class="pb-4">
    <span style="font-weight: 900; text-transform: uppercase">Danh mục sản phẩm</span>
    <div class="mt-3" style="border-radius: 9px; background-color: #cfc6a5">
      <div
        :class="menu == 'user.specialty' ? 'active' : ''"
        class="border-bottom menu-item"
        @click="$router.push({ name: 'user.specialty' })"
      >
        Đặc sản
      </div>
      <div
        :class="menu == 'user.food' ? 'active' : ''"
        class="border-bottom menu-item"
        @click="$router.push({ name: 'user.food' })"
      >
        Đồ ăn
      </div>
      <div
        :class="menu == 'user.drink' ? 'active' : ''"
        class="border-bottom menu-item"
        @click="$router.push({ name: 'user.drink' })"
      >
        Đồ uống
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "menu-item",
  data() {
    return {
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
  created() {
    this.menu = this.$route.name;
  },
};
</script>
<style scoped>
.menu-item {
  line-height: 35px;
  padding-left: 20px;
  color: #000000;
  cursor: pointer;
}
.active {
  background-color: rgb(229 200 92);
}
</style>
