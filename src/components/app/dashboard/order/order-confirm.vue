<template>
  <div class="my-4 row w-100 px-3" style="margin-left: 0">
    <div class="bg-white col-12 px-3 my-4" style="border-radius: 5px">

      <div v-if="!loading" class="scroll" style="margin: 50px 0;">
        <table class="table table-sm" style="min-width: 800px">
          <thead>
            <tr class="text-center">
              <!-- <th scope="col" >Thời gian đặt món</th> -->
              <th scope="col"  >Thời gian xác nhận món</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Tên các món</th>
              <th scope="col">Tổng số lượng</th>
              <th scope="col">Tổng tiền</th>
              <th scope="col">Trạng thái</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="text-center"
              v-for="(entry, index) in entries"
              :key="index"
            >
              <!-- <td class="align-middle" >{{ entry?.created }}</td> -->
              <td class="align-middle" >{{ entry?.createdWaiting }}</td>
              <td class="align-middle">{{ entry?.phone }}</td>
              <td class="align-middle">{{ entry?.address }}</td>
              <td style="max-width: 300px">
                <div
                  class="row py-2"
                  v-for="i in entry?.products"
                  :key="i.product.id"
                >
                  <div class="col-7">
                    {{ i.product.name }}
                  </div>
                  <div class="col-2">{{ i.quantity }}</div>
                  <div class="col-3" style="text-wrap: nowrap;">
                    {{ i.totalProduct | formatNumberWithDotAndCurrency }}
                  </div>
                </div>
              </td>
              <td class="align-middle">{{ entry.totalQuantity }}</td>
              <td class="align-middle" style="text-wrap: nowrap;">
                {{ entry.totalProducts | formatNumberWithDotAndCurrency }}
              </td>
              <td class="align-middle">
                <div
                  @click="updateStatus(entry)"
                  class="cursor-pointer"
                >
                  <b-badge class="bg-primary" style="line-height: 35px; padding: 0 7px;">{{ entry.status }}</b-badge>
                </div>
                </td>
                <td class="align-middle">
                <span
                  @click="deleteItem(entry.id)"
                  class="cursor-pointer"
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
import { mapActions } from 'vuex'

export default {
  name: "order-confirm",
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
    formatDate(datetime) {
      const [date, time] = datetime.split(" ");
      const b = date.split("-");
      const c = time.split(":");
      return new Date(b[0], b[1] - 1, b[2], c[0], c[1], c[2]);
    },
    ...mapActions(['DeleteBill','ListBill','StatusBill']),

    async getList() {
      this.loading = true;
      const response = await this.ListBill();
      const lists = response.filter(e=> e.status == 'Đã xác nhận' && e.delete == 0).sort(
        (a, b) => this.formatDate(b.created) - this.formatDate(a.created)
      );

      let data = [];
      for (let index = 0; index < this.perPage * this.currentPage; index++) {
        if (lists[index]) {
          data.push(lists[index]);
        }
      }
      this.entries = data;
      this.listData = lists;
      this.listData.map((element, index) => {
        element.index = index + 1;
      });
      this.rows = lists.length;
      this.loading = false;
    },
    async deleteItem(id) {
      await this.$swal({
        title: "Huỷ đơn hàng ?",
        icon: "warning",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        showCancelButton: true,
        preConfirm: async () => {
          let response = await this.DeleteBill(id)
          if (response.status == 200) {
            this.$toast.success("Huỷ thành công.", {
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
      const today = new Date();
      let date =
        `${today.getFullYear()}-` +
        `${today.getMonth() + 1}-` +
        `${today.getDate()} ` +
        `${today.getHours()}:` +
        `${today.getMinutes()}:` +
        `${today.getSeconds()}`;
      await this.$swal({
        title: "Cập nhật trạng thái đơn hàng?",
        icon: "warning",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không đồng ý",
        showCancelButton: true,
        preConfirm: async () => {
          const response = await this.StatusBill({id:entry.id,entry:{status: "Đang giao", createdConfirm: date}}) 
          if (response.status == 200) {
            this.$toast.success("Cập nhật thành công: Đơn hàng bắt đầu giao.", {
              position: "top-right",
              timeout: 3000,
            });
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

.bg-false {
  background-color: #d30b1b !important;
  padding: 6px 9px;
}
@media screen and (max-width: 1100px) {
  .scroll {
    overflow-x: auto;
  }
}
</style>
