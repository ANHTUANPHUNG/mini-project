<template>
  <div class="my-4 row w-100 px-3" style="margin-left: 0">
    <div class="bg-white col-12 px-3 my-4" style="border-radius: 5px">

      <div v-if="!loading" class="scroll " style="margin: 50px 0;">
        <table class="table table-sm" style="min-width: 1000px">
          <thead>
            <tr class="text-center">
              <th scope="col"  >Thời gian hoàn thành</th>

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
              <td class="align-middle" >{{ entry?.createdInProgress }}</td>

              <td class="align-middle">{{ entry?.phone }}</td>
              <td class="align-middle">{{ entry?.address }}</td>
              <td style="min-width: 300px">
                <div
                  class="row py-2"
                  v-for="i in entry?.products"
                  :key="i.product.name"
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
                >
                  <b-badge class="bg-success" style="line-height: 35px; padding: 0 7px;">{{ entry.status }}</b-badge>
                </div>
                </td>
              <td></td>
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
    formatDate(date) {
      const [datePart, timePart] = date.split(" ");
      const b = datePart.split("-");
      const c = timePart.split(":");
      return new Date(b[0], b[1] - 1, b[2], c[0], c[1], c[2]);
    },
    ...mapActions(['DeleteBill','ListBill','StatusBill']),

    async getList() {
      this.loading = true;
      const response = await this.ListBill();
      const lists = response.filter(e=> e.status == 'Đã hoàn thành' && e.delete == 0).sort(
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
@media screen and (max-width: 1300px) {
  .scroll {
    overflow-x: auto;
  }
}
</style>
