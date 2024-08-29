<script setup>

defineProps({
  displayedTextArray: Object
})

const isNull = (value) => {
	return value === null
}

</script>

<template>
	<div v-if="!displayedTextArray['lines'].every(isNull)" class="row mt-4">
		<div v-for="text in displayedTextArray['lines']" v-bind:key="text" class='col-6 mb-4 displayed-texts'>
			{{ text }}
		</div>
		<div v-for="i in 2" class='col-6 mb-4 displayed-texts'>
				<span v-for="allComparisons in displayedTextArray['comparison']" v-bind:key="allComparisons">
				<span v-if="allComparisons.length == 1" class="identical-text">
					{{allComparisons[0]}}
				</span>
				<span v-else class="different-text">
					{{allComparisons[i - 1]}}
				</span>
			</span>
		</div>	
	</div>
</template>