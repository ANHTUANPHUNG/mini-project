<template>
    <b-form-group>
      <div style="font-weight: 900"> Số điện thoại</div>
      <b-form-input v-model="entry.phone" placeholder="Nhập số điện thoại" />
    </b-form-group>
  </template>
  <script>
  export default {
    name: "phone-user",
    props: {
      value: Object,
    },
    data() {
      return {
        entry: {
          phone: "",
        },
      };
    },
    watch: {
      "value.phone": {
        handler() {
          this.entry.phone = this.value.phone;
        },
      },
      "entry.phone": {
        handler() {
          this.$emit("update", {
            ...this.value,
            phone: this.entry.phone,
          });
        },
      },
    },
    created() {
      this.entry = this.value;
    },
  };
  </script>
  