<template>
  <div class="my-4 row w-100 px-3" style="margin-left: 0">
    <div class="bg-white col-12 py-4" style="border-radius: 5px">
      <b-form-group>
        <label for="">Tìm kiếm theo tên món đặc sản</label>
        <b-input
          class="col-lg-3 col-sm-6 col-12"
          placeholder="Nhập tên món đặc sản"
          @input="searchInput($event)"
        ></b-input>
      </b-form-group>
    </div>
    <div class="bg-white col-12 px-3 my-4" style="border-radius: 5px">
      <div class="w-100 text-right py-3">
        <button-custom value="admin.food-menu.specialty.create" />
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
            <tr class="text-center" v-for="(entry, index) in entries" :key="index">
              <th class="align-middle">{{ entry.index || index + 1 }}</th>
              <td class="align-middle">{{ entry.name }}</td>
              <td class="align-middle">{{ formatNumberWithDotAndCurrency(entry.price) }}</td>
              <td class="align-middle">{{ entry.description }}</td>
              <td class="align-middle">
                <img style="width: 60px; height: 60px" :src="entry.image?.url" alt="" />
              </td>
              <td class="align-middle">
                <div
                  @click="updateStatus(entry)"
                  class="cursor-pointer"
                  v-if="entry.status?.name == 'Đang bán'"
                >
                  <b-badge class="bg-true">{{ entry.status?.name }}</b-badge>
                </div>
                <div @click="updateStatus(entry)" class="cursor-pointer" v-else>
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
        <div class="d-flex justify-content-end pr-3 py-3 w-100">
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
      perPage: 5,
      currentPage: 1,
      listData: 0,
      rows: 0,
    };
  },
  watch: {
    currentPage: {
      handler() {
        let data = [];
        for (
          let index = this.perPage * (this.currentPage - 1);
          index < this.perPage * this.currentPage;
          index++
        ) {
          if (this.listData[index]) {
            data.push(this.listData[index]);
          }
        }
        this.entries = data;
      },
      deep: true,
    },
  },
  methods: {
    formatNumberWithDotAndCurrency(number) {
      let numStr = number.toString().replace(/^0+/, "");
      let formattedNum = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return formattedNum + " đ";
    },
    async getList() {
      this.loading = true;
      const response = await axios.get("http://localhost:3300/specialty");
      response.data.reverse()
      let data = [];
      for (let index = 0; index < this.perPage * this.currentPage; index++) {
        if (response.data[index]) {
          data.push(response.data[index]);
        }
      }
      this.entries = data;
      this.listData = response.data;
      this.listData.map((element, index) => {
        element.index = index + 1;
      });
      this.rows = response.data.length;
      this.loading = false;
    },
    async deleteItem(id) {
      await this.$swal({
        title: "Xoá món đặc sản này?",
        icon: "warning",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        showCancelButton: true,
        preConfirm: async () => {
          let response = await axios.delete(`http://localhost:3300/specialty/` + id);
          if (response.status == 200) {
            this.$toast.success("Xóa thành công.", {
              position: "top-right",
              timeout: 3000,
            });
            this.currentPage = 1;
            this.getList();
          }
        },
      });
    },
    async updateStatus(entry) {
      let data;
      if (entry.status.id == 2) {
        data = { ...entry, status: { id: 1, name: "Đang bán" } };
      } else {
        data = { ...entry, status: { id: 2, name: "Ngừng bán" } };
      }
      await this.$swal({
        title: "Cập nhật trạng thái đặc sản ?",
        icon: "warning",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        showCancelButton: true,
        preConfirm: async () => {
          let response = await axios.put(`http://localhost:3300/specialty/` + entry.id, data);
          if (response.status == 200) {
            this.$toast.success("Cập nhật thành công.", {
              position: "top-right",
              timeout: 3000,
            });
            this.getList();
          }
        },
      });
    },
    async editItem(id) {
      this.$router.push({
        name: "admin.food-menu.specialty.update",
        params: { id: id },
      });
    },
    async searchInput(value) {
      let arr = [];
      const response = await axios.get("http://localhost:3300/specialty");
      response.data.forEach((element) => {
        if (element.name.toLowerCase().includes(value.toLowerCase())) {
          arr.push(element);
        }
      });
      this.listData = arr;
      this.listData.map((element, index) => {
        element.index = index + 1;
      });
      this.rows = this.listData.length;
      let data = [];
      for (
        let index = this.perPage * (this.currentPage - 1);
        index < this.perPage * this.currentPage;
        index++
      ) {
        if (this.listData[index]) {
          data.push(this.listData[index]);
        }
      }
      this.entries = data;
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

@media screen and (max-width: 900px) {
  .scroll {
    overflow-x: auto;
  }
}
</style>
