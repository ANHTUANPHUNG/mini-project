<template>
  <b-form-group>
    <div style="font-weight: 900"> Ngày sinh</div>
    <b-form-input v-model="entry.dob" type="date" placeholder="Nhập ngày sinh" />
  </b-form-group>
</template>
<script>
export default {
  name: "dob",
  props: {
    value: Object,
  },
  data() {
    return {
      entry: {
        dob: "",
      },
    };
  },
  watch: {
    "value.dob": {
      handler() {
        this.entry.dob = this.value.dob;
      },
    },
    "entry.dob": {
      handler() {
        this.$emit("update", {
          ...this.value,
          dob: this.entry.dob,
        });
      },
    },
  },
  created() {
    this.entry = this.value;
  },
};
</script>
