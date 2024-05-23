<template>
  <div>
    <div>
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        indicators
        img-width="1024"
        :interval="5000"
      >
        <b-carousel-slide style="max-height: 400px;" v-for="item in entries" :key="item.id" :img-src="item.image.secure_url">
        </b-carousel-slide>
      </b-carousel>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "carousel",
  data() {
    // Use default interval of 1000ms
    return {
      entries: [],
    };
  },
  methods: {
    async getList() {
      this.loading = true;
      const response = await axios.get("http://localhost:3300/food");
      this.entries = response.data;
      this.loading = false;
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style scoped>
.img-fluid {
  width: 100%;
  height: 20px !important;
}
</style>
