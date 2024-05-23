<template>
  <div>
    <div class="">
      <carousel />
    </div>
    <div class=" py-5 px-5">
      <div class="row">
        <div class="col-sm-3 col-12">
        <div><menu-item /></div>
        <div>
          <span style="font-weight: 900; text-transform: uppercase">Sản phẩm bán chạy</span>
          <div class="mt-3" style="border-radius: 9px; background-color: #cfc6a5">
            <div class="border-bottom menu-item">Đặc sản</div>
            <div class="border-bottom menu-item">Đồ ăn</div>
            <div class="border-bottom menu-item">Thức uống</div>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-12">
        <div class="row">
          <div class="col-12"><product-item title="Đặc sản" api="food" /></div>
          <div class="col-12"><product-item title="Đồ ăn" api="drink" /></div>
          <div class="col-12"><product-item title="Đồ uống" api="specialty" /></div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import MenuItem from "./menu-item.vue";
import Carousel from "./carousel.vue";
import ProductItem from "./product-item.vue";
export default {
  name: "list",
  components: {
    Carousel,
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
