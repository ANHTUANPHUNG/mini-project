<template>
  <div class="my-4 w-100 px-3" style="margin-left: 0">
    <div class="bg-white" style="border-radius: 5px">
      <div class="d-flex justify-content-between p-3 border-bottom">
        <div
          class="cursor-pointer text-purple"
          @click="$router.push({ name: 'admin.food-menu.food.list' })"
        >
          <i
            class="bx bx-left-arrow-alt font-size-20 align-text-bottom pr-2"
          ></i>
          <span class="">Cập nhật món ăn</span>
        </div>
        <div>
          <button-custom-refresh-save @refresh="refresh" @save="update" />
        </div>
      </div>
      <div class="row py-3" v-if="!loading">
        <div class="col-lg-12" style="padding: 0 32px">
          <food-name v-model="entry" @update="(v) => (entry = v)" />
        </div>
        <div class="col-lg-12" style="padding: 0 32px">
          <food-description v-model="entry" @update="(v) => (entry = v)" />
        </div>
        <div class="col-lg-12" style="padding: 0 32px">
          <food-price v-model="entry" @update="(v) => (entry = v)" />
        </div>
        <div class="col-lg-12" style="padding: 0 32px">
          <food-status v-model="entry" @update="(v) => (entry = v)" />
        </div>
        <div class="col-lg-6" style="padding: 0 32px">
          <food-image v-model="entry" @update="(v) => (entry = v)" />
        </div>
      </div>
      <div v-else class="text-center w-100 d-flex justify-content-center py-5">
        <div style="text-align: -webkit-center">
          <div class="loader"></div>
          <span>Đang tải dữ liệu</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonCustom from "@/components/button-custom.vue";
import ButtonCustomRefreshSave from "@/components/button-custom-refresh-save.vue";
import FoodImage from "./partials/food-image.vue";
import FoodDescription from "./partials/food-description.vue";
import FoodName from "./partials/food-name.vue";
import FoodPrice from "./partials/food-price.vue";
import FoodStatus from "./partials/food-status.vue";
import axios from "axios";

export default {
  name: "update",
  components: {
    ButtonCustom,
    ButtonCustomRefreshSave,
    FoodImage,
    FoodDescription,
    FoodName,
    FoodPrice,
    FoodStatus,
  },
  data() {
    return {
      entry: {},
      loading: false,
      itemId: "",
    };
  },
  methods: {
    async getItemById() {
      this.loading = true;
      const res = await axios.get("http://localhost:3300/food/" + this.itemId);
      this.entry = res.data;
      this.loading = false;
    },
    async update() {
      if (!this.entry.name || this.entry.name.trim() === "") {
        await this.$swal({
          text: "Tên không được trống.",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      }
      if (!this.entry.description || this.entry.description.trim() === "") {
        await this.$swal({
          text: "Thông tin không được trống.",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      }
      if (isNaN(this.entry.price) || this.entry.price <= 0) {
        await this.$swal({
          text: "Giá tiền phải là số và lớn hơn 0.",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      }
      if (this.entry.status === null) {
        await this.$swal({
          text: "Trạng thái không được trống.",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      }
      if (this.entry.image === null) {
        await this.$swal({
          text: "Ảnh không được trống.",
          confirmButtonText: "Đồng ý",
          confirmButtonColor: "purple",
          icon: "error",
        });
        return;
      }
      this.entry = {...this.entry,price:Number(this.entry.price), type:'food'}
      await this.$swal({
        title: "Chỉnh sửa món ăn này?",
        icon: "warning",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        confirmButtonColor: "purple",
        showCancelButton: true,
        preConfirm: async () => {
          const response = await axios.put(
            "http://localhost:3300/food/" + this.itemId,
            this.entry
          );
          if (response) {
            this.$swal({
              title: "Chỉnh sửa thành công",
              icon: "success",
              confirmButtonColor: "purple",
            });
            this.$router.push({
              name: "admin.food-menu.food.list",
            });
          }
        },
      });
    },
    async refresh() {
      await this.$swal({
        title: "Khôi phục dữ liệu ban đầu?",
        confirmButtonColor: "purple",
        cancelButtonText: "Không đồng ý",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",

        preConfirm: async () => this.getItemById(),
      });
    },
  },
  created() {
    this.itemId = this.$route.params.id;
    this.getItemById();
  },
};
</script>
<style scoped></style>
