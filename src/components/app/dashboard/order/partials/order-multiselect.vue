<template>
  <div style="">
    <div>Món <span class="text-danger">*</span></div>
    <div
      style="
        width: 100%;
        height: 50px;
        background-color: white;
        padding: 0 20px;
        border-radius: 5px;
        border: 1px solid gainsboro;
        position: relative;
      "
    >
      <div
        @click="checkMultiselect = !checkMultiselect"
        class="d-flex justify-content-between align-items-center h-100 cursor-pointer item-name"
      >
        <div>
          <span v-if="!options.length" style="color: #ced4da"
            >Không có dữ liệu</span
          >
          <div v-else class="d-flex">
            <div
              style="
                border-radius: 5px;
                border: 1px solid gainsboro;
                padding: 6px;
              "
              v-for="(item, index) in options"
              :key="item.product.id"
              class="mr-2 bg-secondary text-white"
            >
              <span> {{ item.product.name }} x {{ item.quantity }} </span>
              <i
                class="bx bx-x-circle"
                @click.stop="options.splice(index, 1)"
              ></i>
            </div>
          </div>
        </div>
        <div>
          <i
            v-if="!checkMultiselect"
            class="bx bx-chevron-down font-size-18"
          ></i
          ><i v-else class="bx bx-chevron-up font-size-18"></i>
        </div>
      </div>
      <div
        v-if="checkMultiselect"
        class="multiselect"
        style="
          position: absolute;
          top: 49px;
          left: 0;
          width: 100%;
          height: 50px;
          background-color: white;
          border-radius: 5px;
          border: 1px solid gainsboro;
          height: 300px;
        "
      >
        <div
          style="padding: 0 20px"
          class="d-flex align-items-center py-2 cursor-pointer multiselect-item"
          v-for="(item, index) in data"
          :key="item.data"
          @click="handlerMultiselect(item)"
        >
          <div class="px-2 multiselect-item-name">
            <span>{{ item.product.name }}</span>
          </div>
          <div class="px-2 multiselect-item-img">
            <img
              :src="item.product.image.secure_url"
              style="height: 70px; width: 70px"
              alt=""
            />
          </div>
          <div class="px-2 multiselect-item-quantity">
            <b-form-input
              id="input-invalid"
              :state="null"
              style="width: 80px"
              type="number"
              :value="item.quantity"
              @click.stop
              @change="(v) => (item.quantity = v)"
            ></b-form-input>
          </div>
        </div>
      </div>
    </div>
    <!-- <div  class="text-center w-100 d-flex justify-content-center py-5">
          <div style="text-align: -webkit-center">
            <div class="loader"></div>
            <span>Đang tải dữ liệu</span>
          </div>
        </div> -->
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "create",
  props: {
    value: Object,
  },
  data() {
    return {
      data: [],
      options: [],
      checkMultiselect: false,
    };
  },
  watch: {
    "value.products": {
      handler() {
        this.options = this.value.products;
      },
    },
    options: {
      handler() {
        this.$emit("update", {
          ...this.value,
          products: this.options,
        });
      },
    },
  },
  methods: {
    async getList() {
      const promise1 = axios.get("http://localhost:3300/specialty");
      const promise2 = axios.get("http://localhost:3300/food");
      const promise3 = axios.get("http://localhost:3300/drink");
      let dataApi = [];
      const response = await Promise.all([promise1, promise2, promise3]);
      if (response) {
        response.forEach(({ data }) => data.forEach((e) => dataApi.push(e)));
      }
      const newDataPi = dataApi.filter((e) => e.status.name == "Đang bán");
      let data = [];
      newDataPi.forEach((i) => {
        if (i.status.name == "Đang bán") {
          data.push({ product: i, quantity: 1, totalProduct: i.price });
        }
      });
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < this.value.products.length; j++) {
          if (
            data[i].product.name == this.value.products[j].product.name
          ) {
            data[i] = this.value.products[j];
            break;
          }
        }
      }
      this.data = data;

    },
    async handlerMultiselect(item) {
      item.totalProduct = Number(item.quantity) * item.product.price;
      let quantityString = item.quantity.toString().replace(/^0+/, "");
      item.quantity = quantityString;
      const data = { ...item };
      if (item.quantity <= 0) {
        this.$toast.error("Sản phẩm phải lớn hơn 0.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      const itemInOptions = this.options.find(
        (e) => e.product.name == item.product.name
      );
      if (!itemInOptions) {
        this.options = [...this.options, data];
      } else {
        itemInOptions.quantity = Number(item.quantity);
        itemInOptions.totalProduct = Number(item.quantity) * item.product.price;
      }
    },
  },
  async created() {
    this.options = this.value.products;
    console.log(this.value);
    await this.getList();
  },
};
</script>
<style scoped>
.item-name {
  overflow: auto;
}
.multiselect {
  overflow-y: auto;
}
.multiselect-item:hover {
  background-color: gainsboro;
}
.multiselect-item-name {
  width: 300px;
}
.multiselect-item-img {
  width: 300px;
}
.multiselect-item-quantity {
  width: 300px;
}
@media screen and (max-width: 992px) {
  .multiselect-item-name {
    width: 25%;
  }
  .multiselect-item-img {
    width: 33%;
  }
  .multiselect-item-quantity {
    width: 42%;
  }
}
</style>
