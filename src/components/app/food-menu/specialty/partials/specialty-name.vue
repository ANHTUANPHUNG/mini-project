<template>
	<b-form-group>
		<label> Tên món này<span class="text-danger">*</span> </label>
		<b-form-input placeholder="Nhập tên món này" v-model="entry.name" />
	</b-form-group>
</template>

<script>
export default {
	name: 'specialty-name',
	props: {
		value: Object,
	},
	data() {
		return {
			entry: {
				name: '',
			},
		}
	},
	watch: {
		'value.name': {
			handler() {
				this.entry.name = this.value.name
			},
		},
		'entry.name': {
			handler() {
				this.$emit('update', {
					...this.value,
					name: this.entry.name,
				})
			},
		},
		
	},
	created() {
		this.entry = this.value
	},
}
</script>
