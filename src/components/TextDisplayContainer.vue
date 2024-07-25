<script setup>

const props = defineProps({
  displayedTextArray: Array
})

const isNull = (value) => {
	return value === null
}

</script>

<template>
	<div v-if="!displayedTextArray.every(isNull)" class="row">
		<div v-for="text in displayedTextArray" class='col-6 displayed-texts'>
			{{ text }}
		</div>	
	</div>
</template>