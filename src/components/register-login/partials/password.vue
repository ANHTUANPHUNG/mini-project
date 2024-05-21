<template>
  <b-form-group>
    <div style="font-weight: 900"> Mật khẩu</div>
    <b-form-input type="password" v-model="entry.password" placeholder="Nhập mật khẩu" />
  </b-form-group>
</template>
<script>
export default {
  name: "password",
  props: {
    value: Object,
  },
  data() {
    return {
      entry: {
        password: "",
      },
    };
  },
  watch: {
    "value.password": {
      handler() {
        this.entry.password = this.value.password;
      },
    },
    "entry.password": {
      handler() {
        this.$emit("update", {
          ...this.value,
          password: this.entry.password,
        });
      },
    },
  },
  created() {
    this.entry = this.value;
  },
};
</script>
