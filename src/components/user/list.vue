<template>
  <div
    style="
      background-image: url('https://res.cloudinary.com/dw4xpd646/image/upload/v1716350153/jnowfqcrvcqzrzh4w1hp.jpg');
    "
  >
    <nav-bar-user />
    <div class="user-wrapper" v-if="$route.path == '/user/home'">
      <div>
        <carousel />
      </div>
      <div class="px-5 py-5">
        <div class="row">
          <div class="col-sm-3 col-12">
            <menu-item />
            <div>
              <span style="font-weight: 900; text-transform: uppercase"
                >Sản phẩm bán chạy</span
              >
              <div
                class="mt-3"
                style="border-radius: 9px; background-color: #f287ff"
              >
                <div class="border-bottom menu-item">Đặc sản</div>
                <div class="border-bottom menu-item">Đồ ăn</div>
                <div class="border-bottom menu-item">Thức uống</div>
              </div>
            </div>
          </div>
          <div class="col-9">
            <div class="row">
              <div class="col-12">
                <span
                  class="font-size-20"
                  style="font-weight: 900; text-transform: uppercase"
                  >Đặc sản</span
                >
              </div>
              <div class="col-11" style="background-color: greenyellow">
                <div class="carousel-container">
                  <button @click="prev" class="nav-button">‹</button>
                  <div class="carousel" ref="carousel">
                    <div class="item" v-for="(item, index) in displayItems" :key="index">{{ item }}</div>
                  </div>
                  <button @click="next" class="nav-button">›</button>
                </div>
              </div>
              <div class="col-12">
                <span
                  class="font-size-20"
                  style="font-weight: 900; text-transform: uppercase"
                  >Đặc sản</span
                >
              </div>
              <div class="col-11">
                <div
                  class="w-100"
                  style="background-color: greenyellow; height: 380px"
                >
                  a
                </div>
              </div>
              <div class="col-12">
                <span
                  class="font-size-20"
                  style="font-weight: 900; text-transform: uppercase"
                  >Đặc sản</span
                >
              </div>
              <div class="col-11">
                <div
                  class="row"
                  style="background-color: greenyellow; height: 380px"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-wrapper" v-else>bsadasdasdasd</div>
    <div class="cart">
      <i class="bx bxs-cart-download" style=""></i>
    </div>
  </div>
</template>
<script>
import NavBarUser from "./nav-bar-user.vue";
import MenuItem from "./partials/menu-item.vue";
import Carousel from "./carousel.vue";
export default {
  name: "list",
  components: {
    NavBarUser,
    Carousel,
    MenuItem,
  },
  data() {
    return {
      items: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
      currentIndex: 0,
    };
  },
  computed: {
    displayItems() {
      const start = this.currentIndex;
      const end = start + 3;
      return this.items.slice(start, end).concat(this.items.slice(0, Math.max(0, end - this.items.length)));
    },
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    },
  },
  created() {},
};
</script>
<style scoped>
.carousel-container {
  display: flex;
  align-items: center;
}
.carousel {
  display: flex;
  overflow: hidden;
  width: 300px; /* Adjust based on your needs */
}
.item {
  min-width: 100px; /* Adjust based on your needs */
  text-align: center;
  flex: 0 0 auto;
}
.nav-button {
  background: none;
  border: none;
  font-size: 2em;
  cursor: pointer;
  user-select: none;
}
.user-wrapper {
  margin-top: 90px;
}
.cart {
  font-size: 65px;
  position: fixed;
  bottom: 20px;
  z-index: 1000;
  right: 30px;
  cursor: pointer;
}
.bxs-cart-download:hover {
  color: #e300e3;
  font-size: 80px;
}
@media screen and (max-width: 767px) {
  .user-wrapper {
    margin-top: 70px;
  }
}
</style>
