<template>
  <b-modal  hide-footer hide-header v-model="entry">
    <div class="text-center font-size-20  pb-3" style="font-weight: 600">Thông tin tài khoản</div>
    <div class=" border p-2">
      <div class="d-flex">
        <span style="min-width: 150px">Tên đăng nhập:</span> <span>{{ user?.username }}</span>
      </div>
      <div class="d-flex">
        <span style="min-width: 150px">Email:</span> <span>{{ user?.email }}</span>
      </div>
      <div class="d-flex">
        <span style="min-width: 150px">Số điện thoại:</span> <span>{{ user?.phone }}</span>
      </div>
      <div class="d-flex">
        <span style="min-width: 150px">Ngày sinh:</span> <span>{{ user?.dob }}</span>
      </div>
      <div class="d-flex">
        <span style="min-width: 150px">Địa chỉ:</span> <span>{{ user?.address }}</span>
      </div>
      <div class="d-flex">
        <span style="min-width: 150px">Thời gian tạo:</span> <span>{{ user?.created }}</span>
      </div>
    </div>
    <div class="d-flex justify-content-end  pt-3">
      <div class="">
        <b-button @click="entry = false"> Đóng </b-button>
      </div>
    </div>
  </b-modal>
</template>
<script>
export default {
  name: "modal-information",
  props: {
    value: Boolean,
    user: Object,
  },
  data() {
    return {
      entry: false,
    };
  },
  watch: {
    "value": {
      handler() {
        this.entry = this.value;
      },
    },
    "entry": {
      handler() {
        this.$emit("update", this.entry);
      },
    },
  },
  created() {
    this.entry = this.value;
  },
};
</script>
