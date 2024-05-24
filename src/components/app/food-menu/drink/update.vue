<template>
    <div class="my-4 w-100 px-3" style="margin-left: 0">
      <div class="bg-white" style="border-radius: 5px">
        <div class="d-flex justify-content-between p-3 border-bottom">
          <div
            class="cursor-pointer text-purple"
            @click="$router.push({ name: 'admin.food-menu.drink.list' })"
          >
            <i
              class="bx bx-left-arrow-alt font-size-20 align-text-bottom pr-2"
            ></i>
            <span class="">Cập nhật loại đồ uống</span>
          </div>
          <div>
            <button-custom-refresh-save @refresh="refresh" @save="update" />
          </div>
        </div>
        <div class="row py-3" v-if="!loading">
          <div class="col-lg-12" style="padding: 0 32px">
            <drink-name v-model="entry" @update="(v) => (entry = v)" />
          </div>
          <div class="col-lg-12" style="padding: 0 32px">
            <drink-description v-model="entry" @update="(v) => (entry = v)" />
          </div>
          <div class="col-lg-12" style="padding: 0 32px">
            <drink-price v-model="entry" @update="(v) => (entry = v)" />
          </div>
          <div class="col-lg-12" style="padding: 0 32px">
            <drink-status v-model="entry" @update="(v) => (entry = v)" />
          </div>
          <div class="col-lg-6" style="padding: 0 32px">
            <drink-image v-model="entry" @update="(v) => (entry = v)" />
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
  import DrinkStatus from "./partials/drink-status.vue";
  import DrinkImage from "./partials/drink-image.vue";
  import DrinkDescription from "./partials/drink-description.vue";
  import DrinkName from "./partials/drink-name.vue";
  import DrinkPrice from "./partials/drink-price.vue";
  import axios from "axios";
  
  export default {
    name: "update",
    components: {
      ButtonCustom,
      ButtonCustomRefreshSave,
      DrinkImage,
      DrinkDescription,
      DrinkName,
      DrinkPrice,
      DrinkStatus,
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
        const res = await axios.get("http://localhost:3300/drink/" + this.itemId);
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
        this.entry = {...this.entry,price:Number(this.entry.price), type:'drink'}

        await this.$swal({
          title: "Chỉnh sửa đồ uống này?",
          icon: "warning",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Không đồng ý",
          confirmButtonColor: "purple",
          showCancelButton: true,
          preConfirm: async () => {
            const response = await axios.put(
              "http://localhost:3300/drink/" + this.itemId,
              this.entry
            );
            if (response) {
              this.$swal({
                title: "Chỉnh sửa thành công",
                icon: "success",
                confirmButtonColor: "purple",
              });
              this.$router.push({
                name: "admin.food-menu.drink.list",
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
  