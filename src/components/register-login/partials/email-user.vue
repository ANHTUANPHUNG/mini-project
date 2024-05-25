<template>
  <b-form-group>
    <div v-if="checkReset" style="font-weight: 900" class="text-center">Nhập email</div>
    <div v-else style="font-weight: 900">Email</div>
    <b-form-input v-model="entry.email" @keyup.enter="checkEnter" placeholder="Nhập email" />
  </b-form-group>
</template>
<script>
export default {
  name: "email-user",
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
        email: "",
      },
    };
  },
  watch: {
    "value.email": {
      handler() {
        this.entry.email = this.value.email;
      },
    },
    "entry.email": {
      handler() {
        this.$emit("update", {
          ...this.value,
          email: this.entry.email,
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
