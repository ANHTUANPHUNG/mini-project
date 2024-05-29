<template>
  <div>
    <div>
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        indicators
        img-width="1024"
        :interval="3000"
      >
        <b-carousel-slide style="max-height: 600px;" v-for="item in entries" :key="item" :img-src="item">
        </b-carousel-slide>
      </b-carousel>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "carousel",
  data() {
    // Use default interval of 1000ms
    return {
      entries: [],
    };
  },
  methods: {

    ...mapActions(['ListImg']),
    async getList() {
      this.loading = true;
      const response = await this.ListImg()
      this.entries = response;
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
