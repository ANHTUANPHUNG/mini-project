<template>
  <b-form-group>
    <div > Xác nhận mật khẩu mới<span class="text-danger">*</span></div>
    <b-form-input type="password"     @keyup.enter="checkEnter"
 v-model="entry.newPassword" placeholder="Nhập lại mật khẩu mới" />
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
  methods:{
    checkEnter(event) {
      this.$emit('enter',event)
    }
  },  created() {
    this.entry = this.value;
  },
};
</script>
