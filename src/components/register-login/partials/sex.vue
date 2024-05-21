<template>
  <b-form-group label="Giới tính" v-slot="{ ariaDescribedby }">
    <b-form-radio-group
      v-model="entry.sex"
      :options="options"
      :aria-describedby="ariaDescribedby"
      name="radio-inline"
    ></b-form-radio-group>
  </b-form-group>
</template>

<script>
export default {
  name: "sex",
  props: {
    value: Object,
  },
  data() {
    return {
      entry: {
        sex: "Nam",
      },
      options: [
        { text: "Nam", value: "Nam" },
        { text: "Nữ", value: "Nữ" },
        { text: "Khác", value: "Khác" },
      ],
    };
  },
  watch: {
    "value.sex": {
      handler() {
        this.entry.sex = this.value.sex;
      },
    },
    "entry.sex": {
      handler() {
        this.$emit("update", {
          ...this.value,
          sex: this.entry.sex,
        });
      },
    },
  },
  created() {
    this.entry = this.value;
    this.entry.sex='Nam'
  },
};
</script>
