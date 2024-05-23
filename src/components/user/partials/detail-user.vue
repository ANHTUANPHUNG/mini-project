<template>
  <div>
    <div class="px-5 py-5">
      <span class="page-home" @click="$router.push({ name: 'user.home' })"
        >Trang chủ</span
      >
      /
      <span style="font-weight: 600; text-transform: uppercase">Đồ ăn</span>
    </div>
    <div class="row px-5">
      <div class="col-sm-3 col-12">
        <div><menu-item /></div>
        <div>
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
        </div>
      </div>
      <div class="col-lg-9 col-12" v-if="!loading">
        <div style="background-color: #cfc6a5; border-radius: 5px" class="px-3">
          <div class="row border-bottom" style="">
            <div class="col-lg-6 col-12 py-3">
              <img
                class="w-100"
                style="max-height: 350px"
                :src="entry?.image.secure_url"
                alt=""
              />
            </div>
            <div class="col-lg-6 col-12 py-3" style="">
              <div style="font-weight: 800; font-size: 40px">
                {{ entry?.name }}
              </div>
              <div style="font-size: 20px" class="mb-2">
                Giá tiền:
                <span class="text-danger" style="font-weight: 800">
                  {{ entry?.price }}</span
                >
              </div>
              <div class="my-2" style="font-size: 20px">
                Thông tin món:<span> {{ entry?.description }}</span>
              </div>
              <div>
                <div style="font-size: 20px" class="my-2">
                  Số lượng sản phẩm
                </div>
                <b-button-group class="my-2">
                  <b-button @click="minus" variant="">-</b-button>
                  <b-input
                    style="width: 60px"
                    type="number"
                    v-model="count"
                  ></b-input>
                  <b-button @click="add" variant="">+</b-button>
                </b-button-group>
                <div class="my-2" style="font-size: 20px">
                  Tổng tiền:<span> {{ totalProduct }}</span>
                </div>
              </div>
              <div class="my-4">
                <b-button class="w-100" variant="success"> Mua hàng</b-button>
              </div>
            </div>
          </div>
          <div>
            <div style="font-weight: 800; font-size: 30px">
              Sản phẩm tương tự
            </div>
            <div class="row">
              <div
                v-for="item in entries"
                :key="item.id"
                class="text-center col-lg-2 col-sm-3 col-4 py-2 cursor-pointer"
                @click="
                  $router.push({
                    name: 'user.detail',
                    params: { id: item.id, type: item.type },
                  })
                "
              >
                <img
                  class="w-100"
                  style="height: 150px"
                  :src="item?.image?.secure_url"
                  alt=""
                />
                <div style="font-weight: bold">{{ item.name }}</div>
                <div style="font-weight: bold">{{ item.price }}</div>
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
      loading:false
    };
  },
  computed: {
    totalProduct() {
      return this.count * this.entry?.price;
    },
  },
  watch:{
    $route:{
      handler(){
        this.getList()
      },
      deep:true,
      immediate:true
    }
  },
  methods: {
    async getList() {
      this.loading=true
      const res = await axios.get(
        "http://localhost:3300/" + this.$route.params.type
      );
      const data= res.data.filter((e) => e.status.id ==1);
      const index = data.findIndex(({ id }) => id == this.$route.params.id);
      this.entry= data[index]
      this.entries = [
        data[(index + 1) % data.length],
        data[(index + 2) % data.length],
        data[(index + 3) % data.length],
      ];
      console.log(this.entries);
      this.loading=false
    },

    add() {
      this.count++;
    },
    minus() {
      if (this.count <= 1) {
        this.$swal({
          text: "Số lượng không được bé hơn 1.",
          showConfirmButton: false,
          timer: 1000,
          icon: "error",
        });
        return;
      }
      this.count--;
    },
  },
  created(){
    
  }
}
</script>
