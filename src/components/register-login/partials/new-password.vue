<template>
  <b-form-group>
    <div class="text-center" style="font-weight: 900"> Xác nhận mật khẩu mới</div>
    <b-form-input type="password" v-model="entry.newPassword" placeholder="Nhập lại mật khẩu mới" />
  </b-form-group>
</template>
<script>
export default {
  name: "new-password",
  props: {
    value: Object,
  },
  data() {
    return {
      entry: {
        newPassword: "",
      },
    };
  },
  watch: {
    "value.newPassword": {
      handler() {
        this.entry.newPassword = this.value.newPassword;
      },
    },
    "entry.newPassword": {
      handler() {
        this.$emit("update", {
          ...this.value,
          newPassword: this.entry.newPassword,
        });
      },
    },
  },
  created() {
    this.entry = this.value;
  },
};
</script>
