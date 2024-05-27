<template>
  <div  style="width: 100%; padding: 20px 40px;min-height: 55vh;">
    <div class="w-100" style="background-color: #cfc6a5; padding: 10px">
      <div v-if="!loading" class="scroll bg-white px-2 rounded">
        <table  class="table table-sm" style="min-width: 800px">
          <thead>
            <tr class="text-center">
              <th scope="col">#</th>
              <th scope="col">Tên các món</th>
              <th scope="col">Tổng số lượng</th>
              <th scope="col">Tổng tiền</th>
              <th scope="col">Trạng thái</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center" v-for="(entry, index) in entries" :key="entry.index">
              <th class="align-middle">{{ entry.index || index + 1 }}</th>
              <td style="max-width: 300px;">
                <div class="row py-2" v-for="i in entry.products" :key="i.product.name">
                  <div class="col-6">
                    {{ i.product.name }}
                  </div>
                  <div class="col-2">
                    <img
                    style="width: 40px; border-radius: 4px"
                    :src="i.product.image.secure_url"
                    alt=""
                  />
                  </div>
                  <div class="col-1">{{ i.quantity }}</div>
                  <div class="col-3">{{ i.totalProduct | formatNumberWithDotAndCurrency }}</div>
                </div>
              </td>
              <td class="align-middle">{{ entry.totalQuantity }}</td>
              <td class="align-middle">
                {{ entry.totalProducts | formatNumberWithDotAndCurrency }}
              </td>
              <td class="align-middle">
                {{ entry?.status }}
              </td>
              <td class="align-middle" ><span v-if="entry.status == 'Chờ xác nhận'" @click="deleteItem(entry.id)" class="cursor-pointer"
                  ><i class="bx bx-trash font-size-20 text-danger"></i
                ></span></td>
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
    <div  >
        <div style="text-align: -webkit-center">
          <div class="loader"></div>
          <span>Đang tải dữ liệu</span>
        </div>
      </div>
  </div>
    </div>
  </div>
  
</template>
<script>
import ButtonCustom from "@/components/button-custom.vue";
import axios from "axios";

export default {
  name: "order-user",
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
    async getList() {
      this.loading = true;
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get("http://localhost:3300/bills");
      const list = response.data.filter((e) => e.userId == user.id);
      list.reverse();
      let data = [];
      for (let index = 0; index < this.perPage * this.currentPage; index++) {
        if (list[index]) {
          data.push(list[index]);
        }
      }
      this.entries = data;
      this.listData = list;
      this.listData.map((element, index) => {
        element.index = index + 1;
      });
      this.rows = list.length;
      this.loading = false;
    },
    async deleteItem(id) {
      await this.$swal({
        title: "Xoá đơn hàng này?",
        icon: "warning",
        cancelButtonText: "Không đồng ý",
          confirmButtonText: "Đồng ý",
        showCancelButton: true,
        preConfirm: async () => {
          let response = await axios.delete(`http://localhost:3300/bills/` + id);
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
