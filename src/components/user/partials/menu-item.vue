<template>
  <div class="pb-4">
    <span style="font-weight: 900; text-transform: uppercase">Danh mục sản phẩm</span>
    <div class="mt-3" style="border-radius: 9px; background-color: #f287ff">
      <div class="border-bottom menu-item" @click="$router.push({ name: 'user.specialty' })">
        Đặc sản
      </div>
      <div class="border-bottom menu-item" @click="$router.push({ name: 'user.food' })">Đồ ăn</div>
      <div class="border-bottom menu-item" @click="$router.push({ name: 'user.drink' })">
        Thức uống
      </div>
    </div>
  </div>
</template>
<script>
    export default{
        name:'menu-item'
    }
</script>
<style scoped>
.menu-item {
  line-height: 35px;
  padding-left: 20px;
  color: #000000;
  cursor: pointer;
}
</style>