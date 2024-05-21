<template>
  <b-form-group>
    <label> Ảnh<span class="text-danger">*</span> </label>
    <b-form-file
      id="image"
      class="mt-3"
      @change="handleFileChange($event)"
      style="display: none"
    ></b-form-file>
    <div
      style="border: 1px solid gainsboro;  background-color: gainsboro;position: relative;"
      class="p-2 d-flex justify-content-center align-items-center"
    >
      <div v-if="!loading" >
        
        <label for="image" class="cursor-pointer" style="margin: 0">
          <div  v-if="entry.image" class="row">
            <img :src="entry.image?.secure_url" class="col-12" />
          </div>
          <div v-else class="row">
            <img  src="./../../../../assets/default.png" class="col-12"  alt="" />

          </div>
        </label>
      </div>

      <div v-else class="loader"></div>
	  <div
          v-if="entry.image"
          class="cursor-pointer"
          style="position: absolute; top: 0; right: 5px"
          @click="handleIconClick"
        >
          <b-badge variant="dark">x</b-badge>
        </div>
    </div>
  </b-form-group>
</template>

<script>
import axios from "axios";

export default {
  name: "food-image",
  props: {
    value: Object,
  },
  data() {
    return {
      results: null,
      errors: [],
      file: null,
      filesSelected: 0,
      cloudName: "dw4xpd646",
      preset: "oohlfcxa",
      tags: "browser-upload",
      fileContents: null,
      formData: null,
      entry: {
        image: null,
      },
      loading: false,
    };
  },
  watch: {
    "entry.image": {
      handler() {
        this.$emit("update", {
          ...this.value,
          image: this.entry.image,
        });
      },
    },
    "value.image": {
      handler() {
        this.entry.image = this.value.image;
      },
    },
  },
  methods: {
    handleIconClick(event) {
      this.entry.image = null;
    },
    handleFileChange: function (event) {
      this.file = event.target.files[0];
      if (this.preset.length < 1 || this.cloudName.length < 1) {
        this.errors.push("You must enter a cloud name and preset to upload");
        return;
      } else {
        this.errors = [];
      }
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.fileContents = reader.result;
          this.prepareFormData();
          let cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
          this.loading = true;
          let requestObj = {
            url: cloudinaryUploadURL,
            method: "POST",
            data: this.formData,
          };
          axios(requestObj)
            .then((response) => {
              this.entry = {
                ...this.entry,
                image: response.data,
              };
              this.loading = false;
            })
            .catch((error) => {
              this.errors.push(error);
              this.loading = false;
            });
        }.bind(this),
        false
      );
      if (this.file && this.file.name) {
        reader.readAsDataURL(this.file);
      }
    },
    prepareFormData: function () {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.preset);
      this.formData.append("tags", this.tags); // Optional - add tag for image admin in Cloudinary
      this.formData.append("file", this.fileContents);
    },
  },
  created() {
    this.entry = this.value;
  },
};
</script>
<style scoped>
/* HTML: <div class="loader"></div> */

</style>
