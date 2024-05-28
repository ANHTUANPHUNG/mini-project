<template>
  <div class="my-4 row w-100 px-3" style="margin-left: 0">
    <div class="bg-white col-12 py-4" style="border-radius: 5px">
      <search-input v-model=data api="drink"></search-input>

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
              <th scope="col">Tên đồ uống</th>
              <th scope="col">Giá đồ uống</th>
              <th scope="col">Thông tin</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center" v-for="(entry, index) in data.entries" :key="index">
              <th class="align-middle">{{ entry.index || index + 1 }}</th>
              <td class="align-middle">{{ entry.name }}</td>
              <td class="align-middle">{{ entry.price| formatNumberWithDotAndCurrency }}</td>
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
            v-model="data.currentPage"
            :total-rows="data.rows"
            :per-page="data.perPage"
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
import SearchInput from '@/components/searchInput.vue';
import { mapActions } from 'vuex'

export default {
  name: "list",
  components: {
    ButtonCustom,SearchInput
  },
  data() {
    return {
      loading: false,
      data:{
        entries: [],
      perPage: 5,
      currentPage: 1,
      listData: [],
      rows: 0,
      },
    };
  },
  watch: {
    'data.currentPage': {
      handler() {
        let data = [];
        for (
          let index = this.data.perPage * (this.data.currentPage - 1);
          index < this.data.perPage * this.data.currentPage;
          index++
        ) {
          if (this.data.listData[index]) {
            data.push(this.data.listData[index]);
          }
        }
        this.data.entries = data;
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(['ListDrink','DeleteDrink','UpdateDrink']),

    async getList() {
      this.loading = true;
      const response = await this.ListDrink();
      response.reverse()
      let data = [];
      for (let index = 0; index < this.data.perPage * this.data.currentPage; index++) {
        if (response[index]) {
          data.push(response[index]);
        }
      }
      this.data.entries = data;
      this.data.listData = response;
      this.data.listData.map((element, index) => {
        element.index = index + 1;
      });
      this.data.rows = response.length;
      this.loading = false;
    },
    async deleteItem(id) {
      await this.$swal({
        title: "Xoá loại đồ uống này?",
        icon: "warning",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        showCancelButton: true,
        preConfirm: async () => {
          let response = await this.DeleteDrink(id);
          if (response.status == 200) {
            this.$toast.success("Xóa thành công.", {
              position: "top-right",
              timeout: 3000,
            });
            this.data.currentPage = 1;
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
        title: "Cập nhật trạng thái món ăn?",
        icon: "warning",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        showCancelButton: true,
        preConfirm: async () => {
          const response = await this.UpdateDrink({id:entry.id,entry:data}) 
          if (response) {
            this.$toast.success("Cập nhật thành công.", {
              position: "top-right",
              timeout: 3000,
            });
            this.data.currentPage = 1;
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
@media screen and (max-width: 900px) {
  .scroll {
    overflow-x: auto;
  }
}
</style>
