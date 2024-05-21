<template>
  <b-form-group>
    <div style="font-weight: 900"> Địa chỉ</div>
    <b-form-input v-model="entry.address" placeholder="Nhập địa chỉ" />
  </b-form-group>
</template>
<script>
export default {
  name: "address-user",
  props: {
    value: Object,
  },
  data() {
    return {
      entry: {
        address: "",
      },
    };
  },
  watch: {
    "value.address": {
      handler() {
        this.entry.address = this.value.address;
      },
    },
    "entry.address": {
      handler() {
        this.$emit("update", {
          ...this.value,
          address: this.entry.address,
        });
      },
    },
  },
  created() {
    this.entry = this.value;
  },
};
</script>
