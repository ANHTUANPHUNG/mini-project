<template>
  <div class="my-4 row w-100 px-3" style="margin-left:0;">
    <div class="bg-white col-12 py-4" style="border-radius: 5px;">
      <b-form-group>
        <label for="">Tìm kiếm theo tên món ăn</label>
        <b-input
          class="col-lg-3 col-sm-6 col-12"
          v-model="text"
          placeholder="Nhập tên món ăn"
        ></b-input>
      </b-form-group>
    </div>
    <div class="bg-white col-12 px-3 my-4" style="border-radius: 5px">
      <div class="w-100 text-right py-3">
        <button-custom value="admin.food-menu.food.create"/>
      </div>

      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import ButtonCustom from '@/components/button-custom.vue';
export default {
  name: "list",
  components:{
    ButtonCustom
  },
  data() {
    return {
      text: "",
    };
  },
};
</script>
<style scoped>


</style>
