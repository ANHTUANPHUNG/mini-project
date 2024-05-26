<template>
  <b-button class="bg-white text-secondary button-custom" @click="createAction(value)">Thêm mới</b-button>
</template>
<script>
export default {
  name: "button-custom",
  props:{
    value:String
  },
  data(){
    return{
      entry:''
    }
  },
  methods:{
    createAction(value){
      this.$router.push({ name: value })
    }
  },
  created(){
  }
};
</script>
<style scoped>
.button-custom {
  border: 1px solid #a709a7;
}
.button-custom:hover {
  background-color: #a709a7 !important;
  color: white !important;
}
.button-custom:focus {
  box-shadow: 0 0 0 0.2rem #f3cbf3 !important;
}

</style>
