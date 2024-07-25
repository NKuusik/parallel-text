<script setup>

defineProps({
  displayedTextArray: Array
})

const isNull = (value) => {
	return value === null
}

</script>

<template>
	<div v-if="!displayedTextArray.every(isNull)" class="row mt-4">
		<div v-for="text in displayedTextArray" v-bind:key="text" class='col-6 mb-4 displayed-texts'>
			{{ text }}
		</div>	
	</div>
</template>