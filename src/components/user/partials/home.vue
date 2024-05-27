<template>
  <div>
    <div class="">
      <carousel />
    </div>
    <div class=" py-5 px-5">
      <div class="row reverse">
        <div class="col-md-3 col-12 ">
          <!-- {{ $store.state.name }} -->
        <div><menu-item /></div>
        <div><sell-fast /></div>

      </div>
      <div class="col-md-9 col-12 ">
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
import SellFast from "./sell-fast.vue"

export default {
  name: "home",
  components: {
    Carousel,
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
<style>
@media (max-width: 768px) {
  .reverse {
    flex-direction: column-reverse;
  }
  
}</style>
