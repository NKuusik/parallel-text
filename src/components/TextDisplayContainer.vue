<script setup>

const props = defineProps({
  displayedTextArray: Array
})

const boo = () => {
	return ('<h1>{{ displayedText }}</h1>')
}

</script>

<template>
	<div v-for="text in displayedTextArray" class="row" id="container-for-displayed-texts">
		<div class='col-6 displayed-texts'>{{ text }}</div>
	</div>	
</template>