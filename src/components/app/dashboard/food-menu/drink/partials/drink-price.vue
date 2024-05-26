<template>
	<b-form-group>
		<label> Giá tiền<span class="text-danger">*</span> </label>
		<b-form-input placeholder="Nhập giá tiền đồ uống" v-model="entry.price" />
	</b-form-group>
</template>

<script>
export default {
	name: 'drink-price',
	props: {
		value: Object,
	},
	data() {
		return {
			entry: {
				price: 0,
			},
		}
	},
	watch: {
		'entry.price': {
			handler() {
				this.$emit('update', {
					...this.value,
					price: this.entry.price,
				})
			},
		},
		'value.price': {
			handler() {
				this.entry.price = this.value.price
			},

		},
	},
	created() {
		this.entry = this.value
	},
}
</script>
