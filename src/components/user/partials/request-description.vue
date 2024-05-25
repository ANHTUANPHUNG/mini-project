<template>
	<b-form-group>
		<label> Yêu cầu cho nhà hàng </label>
		<b-form-textarea  placeholder="Nhập yêu cầu cho nhà hàng" v-model="entry.description" />
	</b-form-group>
</template>

<script>
export default {
	name: 'request-description',
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
