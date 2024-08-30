<script setup>

import { ref } from 'vue'

defineProps({
  displayedTextObject: Object
})

const isNull = (value) => {
	return value === null
}

const isComparisonActive = ref(true)

</script>

<template>
	<div v-if="!displayedTextObject['lines'].every(isNull)" class="row mt-4">
		<div>
			<v-checkbox
				class="d-inline-flex"
      			v-model="isComparisonActive"
      			:label="`Highlight differences`">
			</v-checkbox>
		</div>
		<div v-if="isComparisonActive && displayedTextObject['comparison'] !== undefined" >
			<div v-for="i in 2" v-bind:key="i" class='col-6 mb-4 displayed-texts'>
				<span v-for="allComparisons in displayedTextObject['comparison']" v-bind:key="allComparisons">
					<span v-if="allComparisons.length == 1" class="identical-text">
						{{allComparisons[0]}}
					</span>
					<span v-else class="different-text">
						{{allComparisons[i - 1]}}
					</span>
				</span>
			</div>
		</div>	
		<div v-else v-for="text in displayedTextObject['lines']" v-bind:key="text" class='col-6 mb-4 displayed-texts'>
			{{ text }}
		</div>
		
	</div>	
</template>