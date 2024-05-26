<template>
  <div class="form-group">
    <label class="mb-1 font-weight-normal">Trạng thái</label>
    <multiselect
      v-model="entry.status"
      :options="entries"
      track-by="id"
      label="name"
      placeholder="Chọn trạng thái"
      :clear-on-select="false"
      :close-on-select="true"
      :hide-selected="false"
      :show-labels="false"
      :internal-search="true"
      :multiple="false"
      :searchable="true"
    >
    </multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  name: "dink-status",
  props: {
    value: Object,
  },
  components: {
    Multiselect,
  },
  data() {
    return {
      entries: [
        { id: 1, name: "Đang bán" },
        { id: 2, name: "Ngừng bán" },
      ],
      entry: {
        status: null,
      },
      change: false,
    };
  },
  watch: {
    "entry.status": {
      handler() {
        this.$emit("update", {
          ...this.value,
          status: this.entry.status,
        });
      },
    },
    "value.status": {
      handler() {
        this.entry.status = this.value.status;
      },
    },
  },

  methods: {},
  created() {
    this.entry = this.value;
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
.multiselect__tags {
  min-height: calc(1.5em + 0.94rem + 5px) !important;
  padding: 0.47rem 0.75rem !important;
  font-family: Roboto, sans-serif !important;
  font-size: 1rem;
  font-weight: 400 !important;
  line-height: 1.5 !important;
  color: #212529 !important;
  background-color: #fcfcfc !important;
  background-clip: padding-box;
  border: 1px solid #e7e7e7 !important;
}

.multiselect__placeholder {
  padding-top: 0 !important;
  margin-bottom: 0 !important;
  color: #ced4da !important;
  font-size: 14px;
}

.multiselect__input {
  margin-bottom: 0 !important;
}

.multiselect__single {
  padding-left: 0 !important;
  margin-bottom: 0 !important;
}

.multiselect__tag {
  background-color: gray !important;
  margin-bottom: 0 !important;
}

.multiselect__tag-icon:after {
  color: gray !important;
}

.multiselect,
.multiselect__input,
.multiselect__single {
  font-size: 13px !important;
}

.multiselect__input,
.multiselect__single {
  background-color: #fcfcfc !important;
}

.multiselect__content-wrapper {
  background-color: #fff !important;
  border: 1px solid #e7e7e7 !important;
}

.mx-input::placeholder {
  color: gainsboro;
}

.multiselect__input,
.mx-calendar-icon,
.mx-datepicker-btn-confirm,
.multiselect__option {
  color: gray !important;
}

.multiselect__option--highlight,
.multiselect__option--highlight:after {
  /* background: green !important; */
  color: white !important;
}

.multiselect--disabled {
  border-radius: 6px !important;
}
/* .multiselect__tags {
        opacity: 0.8 !important;
    } */
</style>
