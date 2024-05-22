<template>
  <div style="height: 100vh; display: flex; justify-content: center">
    <div class="pb-5" style="text-align: center; position: relative;">
      <img
        style="max-height: 600px"
        src="https://res.cloudinary.com/dw4xpd646/image/upload/v1716362555/jserzsygdihbxuhrtj6i.jpg"
        alt=""
      />
      <div style="position: absolute; top: 30px; " class="d-flex " >
        <div class="pr-5 back-register-login" @click="$router.push({name:'register-login'})">
            <i class='bx bx-left-arrow-alt ' ></i> Trở về
        </div>
        <span class="font-size-24 text-purple pl-4">
                Không đủ quyền đăng nhập
            </span>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "error",
};
</script>
<style scoped>
.back-register-login{
    line-height: 35px; cursor: pointer;
}
.back-register-login:hover{
    color: orange;
}
</style>
