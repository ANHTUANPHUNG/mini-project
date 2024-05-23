<template>
  <div>
    <div class="px-5 py-5">
      <span class="page-home" @click="$router.push({ name: 'user.home' })">Trang chủ</span> /
      <span style="font-weight: 600; text-transform: uppercase">Đồ ăn</span>
    </div>
    <div class="row px-5">
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
        <div   style="background-color: #cfc6a5;border-radius: 5px " class="px-3">
          <div class="row border-bottom" style=" ">
            <div class="col-lg-6 col-12 py-3">
              <img class="w-100" :src="entry?.image.secure_url" alt="" />
            </div>
            <div class="col-lg-6 col-12 py-3" style="">
              <div style="font-weight: 800; font-size: 40px">{{ entry?.name }}</div>
              <div style="font-size: 20px" class="mb-2">
                Giá tiền:
                <span class="text-danger" style="font-weight: 800"> {{ entry?.price }}</span>
              </div>
              <div class="mb-2" style="font-size: 20px">
                Thông tin món:<span> {{ entry?.description }}</span>
              </div>
              <div>
                <div style="font-size: 20px" class="mb-2">Số lượng sản phẩm</div>
                <b-button-group>
                  <b-button variant="">-</b-button>
                  <b-input style="width: 60px" type="number" v-model="count"></b-input>
                  <b-button variant="">+</b-button>
                </b-button-group>
              </div>
              <div class="my-4">
                <b-button class="w-100" variant="success"> Mua hàng</b-button>
              </div>
            </div>
            
          </div>
          <div>
              <div style="font-weight: 800; font-size: 30px">Sản phẩm tương tự</div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import MenuItem from "./menu-item.vue";
import ProductItem from "./product-item.vue";
export default {
  name: "list",
  components: {
    MenuItem,
    ProductItem,
  },
  data() {
    return {
      user: null,
      entry: null,
      count: 1,
      entries: [],
    };
  },
  methods: {
    async getList() {
      const res = await axios.get("http://localhost:3300/" + this.$route.params.type);
      this.entries = res.data;
    },
    async getProductId() {
      const res = await axios.get(
        "http://localhost:3300/" + this.$route.params.type + "/" + this.$route.params.id
      );
      this.entry = res.data;
    },
  },
  created() {
    this.getProductId();
    this.getList();
  },
};
</script>
