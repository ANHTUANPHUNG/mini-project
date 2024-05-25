<template>
  <b-form-group>
    <div style="font-weight: 900">Tên đăng nhập</div>
    <b-form-input
      @keyup.enter="checkEnter"
      v-model="entry.username"
      placeholder="Nhập tên đăng nhập"
    />
  </b-form-group>
</template>
<script>
export default {
  name: "username",
  props: {
    value: Object,
  },
  data() {
    return {
      entry: {
        username: "",
      },
    };
  },
  watch: {
    "value.username": {
      handler() {
        this.entry.username = this.value.username;
      },
    },
    "entry.username": {
      handler() {
        this.$emit("update", {
          ...this.value,
          username: this.entry.username,
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
