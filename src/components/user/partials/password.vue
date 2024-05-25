<template>
  <b-form-group>
    <div>Mật khẩu<span class="text-danger">*</span></div>
    <b-form-input
      @keyup.enter="checkEnter"
      type="password"
      v-model="entry.password"
      placeholder="Nhập mật khẩu"
    />
  </b-form-group>
</template>
<script>
export default {
  name: "password",
  props: {
    value: Object,
    checkReset: {
      type: Boolean,
      default: false,
    },
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
  methods: {
    checkEnter(event) {
      this.$emit("enter", event);
    },
  },
  created() {
    this.entry = this.value;
  },
};
</script>
