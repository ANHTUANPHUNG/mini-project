<template>
    <div class="my-4 row w-100 px-3" style="margin-left: 0">
      
      <div class="bg-white col-12 px-3 my-4" style="border-radius: 5px">
        <div class="w-100 text-right py-3">
          <button-custom value="admin.food-menu.food.create" />
        </div>
  
        <div v-if="!loading" class="scroll">
          <table class="table table-sm" style="min-width: 690px">
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
            <!-- <tbody>
              <tr class="text-center" v-for="(entry, index) in entries" :key="index">
                <th class="align-middle">{{ entry.index || index + 1 }}</th>
                <td style="max-width: 300px;">
                  <div class="row py-2" v-for="i in entry.products" :key="i.product.id">
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
                    <div class="col-3">{{ formatNumberWithDotAndCurrency(i.totalProduct) }}</div>
                  </div>
                </td>
                <td class="align-middle">{{ entry.totalQuantity }}</td>
                <td class="align-middle">
                  {{ formatNumberWithDotAndCurrency(entry.totalProducts) }}
                </td>
                <td class="align-middle">
                  {{ entry?.status }}
                </td>
                <td class="align-middle" ><span v-if="entry.status == 'Chờ xác nhận'" @click="deleteItem(entry.id)" class="cursor-pointer"
                    ><i class="bx bx-trash font-size-20 text-danger"></i
                  ></span></td>
              </tr>
            </tbody> -->
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
    name: "order-waiting",
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
        const response = await axios.get("http://localhost:3300/food");
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
          title: "Xoá món ăn này?",
          icon: "warning",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Không đồng ý",
          showCancelButton: true,
          preConfirm: async () => {
            let response = await axios.delete(`http://localhost:3300/food/` + id);
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
        const today = new Date();
        let date =
        `${today.getFullYear()}-` +
          `${today.getMonth() + 1}-` +
          `${today.getDate()} ` +
          `${today.getHours()}:` +
          `${today.getMinutes()}:` +
          `${today.getSeconds()}`;
  console.log(date);
  const [datePart, timePart] = date.split(' ');
  const b = datePart.split('-')
  const c = timePart.split(':')
  const d = new Date(b[0],b[1]-1,b[2],c[0],c[1],c[2])
  console.log(d);
  if (entry.status.id == 2) {
          data = { ...entry, status: { id: 1, name: "Đang bán" } };
        } else {
          data = { ...entry, status: { id: 2, name: "Ngừng bán" } };
        }
        await this.$swal({
          title: "Cập nhật trạng thái đồ uống ?",
          icon: "warning",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Không đồng ý",
          showCancelButton: true,
          preConfirm: async () => {
            let response = await axios.put(`http://localhost:3300/food/` + entry.id, data);
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
          name: "admin.food-menu.food.update",
          params: { id: id },
        });
      },
      async searchInput(value) {
        let arr = [];
        const response = await axios.get("http://localhost:3300/food");
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
  