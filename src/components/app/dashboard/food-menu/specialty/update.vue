<template>
  <div class="my-4 w-100 px-3" style="margin-left: 0">
    <div class="bg-white" style="border-radius: 5px">
      <div class="d-flex justify-content-between p-3 border-bottom">
        <div
          class="cursor-pointer text-purple"
          @click="$router.push({ name: 'admin.food-menu.specialty.list' })"
        >
          <i
            class="bx bx-left-arrow-alt font-size-20 align-text-bottom pr-2"
          ></i>
          <span class="">Cập nhật món đặc sản</span>
        </div>
        <div>
          <button-custom-refresh-save @refresh="refresh" @save="update" />
        </div>
      </div>
      <div class="row py-3" v-if="!loading">
        <div class="col-lg-12" style="padding: 0 32px">
          <specialty-name v-model="entry" @update="(v) => (entry = v)" />
        </div>
        <div class="col-lg-12" style="padding: 0 32px">
          <specialty-description v-model="entry" @update="(v) => (entry = v)" />
        </div>
        <div class="col-lg-12" style="padding: 0 32px">
          <specialty-price v-model="entry" @update="(v) => (entry = v)" />
        </div>
        <div class="col-lg-12" style="padding: 0 32px">
          <specialty-status v-model="entry" @update="(v) => (entry = v)" />
        </div>
        <div class="col-lg-6" style="padding: 0 32px">
          <specialty-image v-model="entry" @update="(v) => (entry = v)" />
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
import SpecialtyImage from "./partials/specialty-image.vue";
import SpecialtyDescription from "./partials/specialty-description.vue";
import SpecialtyName from "./partials/specialty-name.vue";
import SpecialtyPrice from "./partials/specialty-price.vue";
import SpecialtyStatus from "./partials/specialty-status.vue";
import axios from "axios";
import { mapActions,mapGetters } from 'vuex'

export default {
  name: "update",
  components: {
    ButtonCustom,
    ButtonCustomRefreshSave,
    SpecialtyImage,
    SpecialtyDescription,
    SpecialtyName,
    SpecialtyPrice,
    SpecialtyStatus,
  },
  data() {
    return {
      entry: {},
      loading: false,
      itemId: "",
      data: [],
    };
  },
  computed:{
    ...mapGetters(['listProduct'])
  },
  methods: {
    ...mapActions(['DataAllProduct','GetByIdSpecialty','UpdateSpecialty']),

    async getList() {
      await this.DataAllProduct()
      const newDataPi = this.listProduct.filter((e) => e.name != this.entry.name);
      this.data = newDataPi;
    },
    async getItemById() {
      this.loading = true;
      const res = await this.GetByIdSpecialty(this.itemId) 
      this.entry = res;
      this.loading = false;
    },
    async update() {
      if (this.data.find(({ name }) => name == this.entry.name)) {
        this.$toast.error("Tên mặt hàng đã tồn tại.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      if (!this.entry.name || this.entry.name.trim() === "") {
        this.$toast.error("Tên không được trống.", {
          position: "top-right",
          timeout: 3000,
        });
      }
      if (!this.entry.description || this.entry.description.trim() === "") {
        this.$toast.error("Thông tin không được trống.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      if (isNaN(this.entry.price) || this.entry.price <= 0) {
        this.$toast.error("Giá tiền phải là số và lớn hơn 0.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      if (this.entry.status === null) {
        this.$toast.error("Trạng thái không được trống.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      if (this.entry.image === null) {
        this.$toast.error("Ảnh không được trống.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      this.entry = {
        ...this.entry,
        price: Number(this.entry.price),
        type: "specialty",
      };
      await this.$swal({
        title: "Chỉnh sửa món đặc sản này?",
        icon: "warning",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        confirmButtonColor: "purple",
        showCancelButton: true,
        preConfirm: async () => {
          const response = await this.UpdateSpecialty({id:this.itemId,entry:this.entry}) 
          if (response) {
            this.$toast.success("Chỉnh sửa thành công.", {
              position: "top-right",
              timeout: 3000,
            });
            this.$router.push({
              name: "admin.food-menu.specialty.list",
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
  async created() {
    this.itemId = this.$route.params.id;

    await this.getItemById();
    await this.getList();
  },
};
</script>
<style scoped></style>
