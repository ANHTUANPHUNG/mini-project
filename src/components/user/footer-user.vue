<template>
  <div class="footer-wrapper">
    <div class="w-100">
      <div class="row w-100">
        <div class="col-sm-6 col-12 mb-3" >
          <div style="font-weight: 800; font-size: 26px; color: #000">Nhà hàng Bà Tuyết</div>
          <span class="font-size-20 text-white">Đây là địa điểm được rất nhiều người nổi tiếng và khách du lịch ghé thăm.</span>
        </div>
        <div class="col-sm-6 col-12 mb-3 text-white" style="display: grid">
          <span style="font-weight: 800; font-size: 26px; color: #000">Thông tin liên hệ</span>
          <span style="font-size: 20px">Nhà hàng Bà Tuyết</span>
          <span >Địa chỉ: {{ entry?.address }}</span>
          <span >Email: {{ entry?.email }}</span>
          <span >Điện thoại: {{ entry?.phone }}</span>
          <span >Hotline: {{ entry?.phone }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "footer-user",
  data() {
    return {
      entry: {},
    };
  },
  methods: {
    async getList() {
      const res = await axios.get("http://localhost:3300/users/a757");
      this.entry = res.data;
      console.log(res.data);
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style scoped>
.footer-wrapper {
  background-color: #e300e3;
  padding: 20px 10px;
}
@media screen and (max-width: 992px) and (min-width: 567px) {
  .footer-wrapper {
    padding: 20px 30px;
  }
}
@media screen and (min-width: 993px) {
  .footer-wrapper {
    /* padding: 30px 100px; */
  }
}
</style>
