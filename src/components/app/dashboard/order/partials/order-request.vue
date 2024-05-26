<template>
    <b-form-group>
      <div > Yêu cầu cho nhà hàng</div>
      <b-form-textarea v-model="entry.request" placeholder="Nhập yêu cầu cho nhà hàng" />
    </b-form-group>
  </template>
  <script>
  export default {
    name: "order-request",
    props: {
      value: Object,
    },
    data() {
      return {
        entry: {
          request: "",
        },
      };
    },
    watch: {
      "value.request": {
        handler() {
          this.entry.request = this.value.request;
        },
      },
      "entry.request": {
        handler() {
          this.$emit("update", {
            ...this.value,
            request: this.entry.request,
          });
        },
      },
    },
    created() {
      this.entry = this.value;
    },
  };
  </script>
  