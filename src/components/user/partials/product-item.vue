<template>
  <div v-if="!checkForm" class="row mb-3">
    <div class="col-12">
      <span class="font-size-20" style="font-weight: 900; text-transform: uppercase">{{
        title
      }}</span>
    </div>
    <div class="col-12 mt-2" style="">
      <div
        class="carousel-container"
        style="background-color: #cfc6a5; position: relative; border-radius: 5px"
      >
        <div class="chevron-left cursor-pointer">
          <i @click="prev" class="bx bx-chevron-left font-size-24 text-white"></i>
        </div>
        <div class="carousel">
          <div
            class="item m-2 pb-2"
            style="background-color: rgb(255 171 229); cursor: pointer"
            v-for="(item, index) in displayItems"
            :key="index"
            @click="productDetail(item)"

          >
            <div class="w-100" style="display: grid; position: relative">
              <img style="width: 100%; height: 300px;" :src="item.image?.secure_url" alt="" />
              <span style="font-weight: 800;" class="text-center pt-2 font-size-18">
                {{ item.name }}
              </span>
              <div class="text-center pt-3">
                <span class="">{{ formatNumberWithDotAndCurrency(item.price) }}</span>
              </div>
              <div style="position: absolute; bottom: 0; right: 10px">
                <i class="bx bxs-cart-add font-size-26 " @click="addProduct(item)"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="chevron-right cursor-pointer">
          <i @click="next" class="bx bx-chevron-right font-size-24 text-white"></i>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="col-12 " style="background-color: #cfc6a5; border-radius: 5px">
      <div
        style=" position: relative"
      >
        <div class="row p-2 mb-4">
          <div
            class="col-3 py-2 item-render"
            style=" cursor: pointer; border: 1px solid gainsboro;"
            v-for="(item, index) in items"
            :key="index"
            @click="productDetail(item)"
          >
            <div class="w-100" style="display: grid; position: relative">
              <img style="width: 100%; height: 200px;" :src="item.image?.secure_url" alt="" />
              <span style="font-weight: 800;" class="text-center pt-2 font-size-18">
                {{ item.name }}
              </span>
              <div class="text-center pt-3">
                <span class="">{{ formatNumberWithDotAndCurrency(item.price) }}</span>
              </div>
              <div style="position: absolute; bottom: 0; right: 10px">
                <i class="bx bxs-cart-add font-size-26 " @click="addProduct(item)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "product-item",
  props: {
    title: String,
    api: String,
    checkForm:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      items: [],
      currentIndex: 0,
      window: {
        width: 0,
        height: 0,
      },
      user:null
    };
  },
  computed: {
    displayItems() {
      const start = this.currentIndex;
      let end = start + 2;
      if (this.window.width >= 768) {
        end = start + 3;
      } else {
        end = start + 2;
      }
      return this.items
        .slice(start, end)
        .concat(this.items.slice(0, Math.max(0, end - this.items.length)));
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    formatNumberWithDotAndCurrency(number) {
      let numStr = number.toString().replace(/^0+/, "");
      let formattedNum = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return formattedNum + " đ";
    },
    async getList() {
      const response = await axios.get("http://localhost:3300/" + this.api);

      this.items = response.data.filter(({status}) => status.id == '1');
    },
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    },
    addProduct(value){
      if(!this.user){
        this.$swal({
              title: "Bạn chưa đăng nhập vào ứng dụng",
              icon: "error",
              timer: 1000,
            });
            return;
      }
      console.log(value);
    },
    productDetail(value){
      this.$router.push({name:'user.detail', params:{id:value.id,type:value.type}})
    }
  },
  created() {
    this.getList();
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'))
    }
  },

};
</script>
<style scoped>

.chevron-left,
.chevron-right {
  position: absolute;
  top: 40%;
  z-index: 100;
}
.chevron-left {
  left: 2px;
}
.chevron-right {
  right: 2px;
}
.chevron-left:hover,
.chevron-right:hover {
  border-radius: 50px;
  width: 24px;
  height: 24px;
  border: 1px solid gainsboro;
  background-color: rgb(255, 171, 229);
}
.bxs-cart-add {
  color: white;
}
.bxs-cart-add:hover {
  color: orange;
}
.carousel-container {
  display: flex;
  align-items: center;
}
.carousel {
  display: flex;
  overflow: hidden;
  width: 100%;
}
.item {
  width: 33.333333333333333%;
  /* min-width: 100px; 
  text-align: center;
  flex: 0 0 auto; */
  /* animation: item 1s ease-in-out; */
}
/* @keyframes item{
    from{
        right:-20px
    }
    to{
        right: 0;
    }
} */
/* .item-render:hover img{
  animation: scaleImage 0.6s forwards;
}
@keyframes scaleImage {
  0%{
    height: 100%;
    opacity: 1;
  }
  100%{
    height: 150%;
    opacity: 0.5;
  }
} */
@media screen and (max-width: 768px) {
  .item {
    width: 50%;
  }
}
</style>
