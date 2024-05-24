<template>
  <b-form-group>
    <div v-if="checkReset" style="font-weight: 900" class="text-center">
      Nhập mật khẩu mới
    </div>

    <div v-else style="font-weight: 900">Mật khẩu</div>
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
  methods:{
    checkEnter(event) {
      this.$emit('enter',event)
    }
  },
  created() {
    this.entry = this.value;
  },
};
</script>
