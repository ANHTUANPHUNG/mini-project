<template>
  <div class="my-4 row w-100 px-3" style="margin-left: 0">
    <div class="bg-white col-12 py-4" style="border-radius: 5px">
      <b-form-group>
        <label for="">Tìm kiếm theo tên đồ uống</label>
        <b-input
          class="col-lg-3 col-sm-6 col-12"
          v-model="text"
          placeholder="Nhập tên đồ uống"
        ></b-input>
      </b-form-group>
    </div>
    <div class="bg-white col-12 px-3 my-4" style="border-radius: 5px">
      <div class="w-100 text-right py-3">
        <button-custom value="admin.food-menu.drink.create" />
      </div>

      <div v-if="!loading" class="scroll">
        <table class="table table-sm" style="min-width: 690px">
          <thead>
            <tr class="text-center">
              <th scope="col">#</th>
              <th scope="col">Tên món</th>
              <th scope="col">Giá món</th>
              <th scope="col">Thông tin</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center" v-for="(entry, index) in entries" :key="entry.id">
              <th class="align-middle">{{ index + 1 }}</th>
              <td class="align-middle">{{ entry.name }}</td>
              <td class="align-middle">{{ entry.price }}</td>
              <td class="align-middle">{{ entry.description }}</td>
              <td class="align-middle">
                <img style="width: 60px" :src="entry.image?.url" alt="" />
              </td>
              <td class="align-middle">
                <div class="cursor-pointer" v-if="entry.status?.name == 'Đang bán'">
                  <b-badge class="bg-true">{{ entry.status?.name }}</b-badge>
                </div>
                <div class="cursor-pointer" v-else>
                  <b-badge class="bg-false">{{ entry.status?.name }}</b-badge>
                </div>
              </td>

              <td class="text-center align-middle" style="min-width: 80px">
                <span @click="editItem(entry.id)" class="cursor-pointer"
                  ><i class="bx bx-edit pr-3 font-size-20 text-purple"></i
                ></span>
                <span @click="deleteItem(entry.id)" class="cursor-pointer"
                  ><i class="bx bx-trash font-size-20 text-danger"></i
                ></span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-end pr-3 pb-3 w-100">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
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
import axios from "axios";

export default {
  name: "list",
  components: {
    ButtonCustom,
  },
  data() {
    return {
      text: "",
      entries: [],
      loading: false,
      perPage: 1,
      currentPage: 1,
    };
  },
  computed: {
    rows() {
      return this.entries.length;
    },
  },
  methods: {
    async getList() {
      this.loading = true;
      const response = await axios.get("http://localhost:3000/drink");
      this.entries = response.data;
      this.loading = false;
    },
    async deleteItem(id) {
      await this.$swal({
        title: "Xoá đồ uống này?",
        icon: "warning",
        showCancelButton: true,
        preConfirm: async () => {
          let response = await axios.delete(`http://localhost:3000/drink/` + id);
          if (response.status == 200) {
            this.$swal({
              title: "Xóa thành công",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });
            this.getList();
          }
        },
      });
    },
    async editItem(id) {
      this.$router.push({
        name: "admin.food-menu.drink.update",
        params: { id: id },
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style scoped>
.bg-true {
  background-color: #a709a7 !important;
  padding: 6px 9px;
}
.bg-false {
  background-color: #d30b1b !important;
  padding: 6px 9px;
}
.swal2-icon .swal2-icon-content {
  font-size: 2.75em !important;
}
.swal2-icon.swal2-warning.swal2-icon-show {
  width: 50px !important;
  height: 50px !important;
}
@media screen and (max-width: 900px) {
  .scroll {
    overflow-x: auto;
  }
}
</style>
