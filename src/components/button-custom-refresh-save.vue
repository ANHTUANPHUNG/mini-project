<template>
  <div class="d-flex">
    <div class="pr-2">
      <b-button v-if="checkRefresh" class="bg-white text-secondary button-refresh font-size-18" @click="$emit('refresh')"><i class="bx bx-revision pr-1"></i> Đặt lại</b-button>
    </div>
    <div>
      <b-button :disabled="disabledButton" v-if="value" class="bg-white text-secondary button-save font-size-18" @click="$emit('save')"><i class="bx bx-save align-text-bottom pr-1"></i>Lưu lại</b-button>
      <b-button v-else class="bg-white text-secondary button-save font-size-18" @click="$emit('save')">Đăng nhập</b-button>
    </div>
  </div>
</template>
<script>
export default{
    name:'button-custom-refresh-save',
    props:{
      checkRefresh:{
        type:Boolean,
        default:true
      },
      value:{
        type:Boolean,
        default:true
      },
      disabledButton:{
        type:Boolean,
        default:false
      }
    }

}
</script>
<style scoped>

.button-refresh {
  border: 1px solid #a709a7;
  padding: 3px 12px !important;
}
.button-refresh:hover {
  background-color: #a709a7 !important;
  color: white !important;
}
.button-refresh:focus {
  box-shadow: 0 0 0 0.2rem #f3cbf3 !important;
}
.button-save {
  border: 1px solid #a709a7;
  padding: 3px 12px !important;
  background-color: #a709a7 !important;
  color: white !important;
}
.button-save:hover {
  background-color: #8d008d !important;
  color: white !important;
}
.button-save:focus {
  box-shadow: 0 0 0 0.2rem #f3cbf3 !important;
}

</style>
