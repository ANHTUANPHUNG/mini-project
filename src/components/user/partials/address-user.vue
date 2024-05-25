<template>
	<b-form-group>
		<label> Địa chỉ<span class="text-danger">*</span> </label>
		<b-form-input placeholder="Nhập địa chỉ" v-model="entry.address" />
	</b-form-group>
</template>

<script>
export default {
	name: 'address-user',
	props: {
		value: Object,
	},
	data() {
		return {
			entry: {
				address: '',
			},
		}
	},
	watch: {
		'entry.address': {
			handler() {
				this.$emit('update', {
					...this.value,
					address: this.entry.address,
				})
			},

		},
		'value.address': {
			handler() {
				this.entry.address = this.value.address
			},

		},
	},
	created() {
		this.entry = this.value
	},
}
</script>
