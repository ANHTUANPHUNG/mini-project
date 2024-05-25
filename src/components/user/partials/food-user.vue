<template>
  <div>
    <div class="px-5 py-5">
      <span class="page-home" @click="$router.push({ name: 'user.home' })"
        >Trang chủ</span
      >
      /
      <span style="font-weight: 600; text-transform: uppercase">Đồ ăn</span>
    </div>
    <div class="px-5">
      <div class="row">
        <div class="col-md-3 menu-disabled">
          <div><menu-item /></div>
          <!-- <div>
            <span style="font-weight: 900; text-transform: uppercase"
              >Sản phẩm bán chạy</span
            >
            <div
              class="mt-3"
              style="border-radius: 9px; background-color: #cfc6a5"
            >
              <div class="border-bottom menu-item">Đặc sản</div>
              <div class="border-bottom menu-item">Đồ ăn</div>
              <div class="border-bottom menu-item">Thức uống</div>
            </div>
          </div> -->
        </div>
        <div class="col-md-9 col-12">
          <div class="row">
            <product-item :checkForm="true" title="Đồ ăn" api="food" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MenuItem from "./menu-item.vue";
import ProductItem from "./product-item.vue";
export default {
  name: "food-user",
  components: {
    MenuItem,
    ProductItem,
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
