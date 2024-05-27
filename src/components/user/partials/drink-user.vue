<template>
  <div>
    <div class="px-5 py-5">
      <span class="page-home" @click="$router.push({ name: 'user.home' })"
        >Trang chủ</span
      >
      /
      <span style="font-weight: 600; text-transform: uppercase">Đồ uống</span>
    </div>
    <div class="px-5">
      <div class="row">
        <div class="col-md-3 menu-disabled">
          <div><menu-item /></div>
          <div><sell-fast /></div>
        </div>
        <div class="col-md-9 col-12">
          <div class="row">
            <product-item :checkForm="true" title="Đồ uống" api="drink" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SellFast from "./sell-fast.vue"

import MenuItem from "./menu-item.vue";
import ProductItem from "./product-item.vue";
export default {
  name: "drink-user",
  components: {
    MenuItem,
    ProductItem,SellFast
  },
  data() {
    return {
      user: null,
    };
  },
};
</script>
<style scoped>
.page-home {
  cursor: pointer;
}
.page-home:hover {
  color: orange;
}
@media screen and (max-width: 768px) {
  .menu-disabled {
    display: none;
  }
}
</style>
