<template>
	<b-form-group>
		<label> Thông tin món ăn<span class="text-danger">*</span> </label>
		<b-form-input placeholder="Nhập thông tin món ăn" v-model="entry.description" />
	</b-form-group>
</template>

<script>
export default {
	name: 'food-description',
	props: {
		value: Object,
	},
	data() {
		return {
			entry: {
				description: '',
			},
		}
	},
	watch: {
		'entry.description': {
			handler() {
				this.$emit('update', {
					...this.value,
					description: this.entry.description,
				})
			},

		},
		'value.description': {
			handler() {
				this.entry.description = this.value.description
			},

		},
	},
	created() {
		this.entry = this.value
	},
}
</script>
