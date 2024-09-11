<script setup>

import { ref, onUpdated } from 'vue'
import { isNonAlphanumeric } from '../utils/isNonAlphanumeric';
import FilterSelectionForm from './subcomponents/FilterSelectionForm.vue';

const props = defineProps({
  displayedTextObject: Object,
  languageTable: Object,
  posTable: Object
})

const receivedFilterTypeRef = ref(null)

const isNull = (value) => {
	return value === null
}

const validatePoSTag = (tagKey) => {
	return props.posTable[tagKey] !== undefined
}

const provideTagColor = (tagKey, tokenValue='default') => {
	if (validatePoSTag(tagKey) && !isNonAlphanumeric(tokenValue) ) {
		return props.posTable[tagKey]['color']
	}
	return 'transparent'
}

const handleFilterSelectionChange = (filterSelectionValue) => {
	receivedFilterTypeRef.value = filterSelectionValue
}

</script>

<template>
	<div v-if="!displayedTextObject['lines'].every(isNull)" class="row mt-4">
		<FilterSelectionForm 
			:currentLanguages="[
				displayedTextObject['lines'][0]['language'], 
				displayedTextObject['lines'][1]['language']]" 
			@updateFilterSelection="handleFilterSelectionChange" />		
		<!-- PoS key explainer -->
		<div v-if="receivedFilterTypeRef==='pos'">
			<span v-for="tagKey of displayedTextObject['usedTags']" v-bind:key="tagKey" class="pos-entry" :style="{backgroundColor:provideTagColor(tagKey)}">
				<span v-if="validatePoSTag(tagKey)">
					<!-- Empty <span> maintains line-breaking whitespace. -->
					{{ posTable[tagKey]['name'] }} <span></span>
				</span>
			</span>
		</div>
		<!-- Displayed texts -->
		<div>
			The texts are in {{ languageTable[displayedTextObject["lines"][0]["language"]] }} 
			and {{ languageTable[displayedTextObject["lines"][1]["language"]] }}
		</div>
		<div v-if="receivedFilterTypeRef==='diff' && displayedTextObject['comparison'] !== undefined" v-for="i in 2" v-bind:key="i" class='col-6 mb-4 displayed-texts'>
				<span v-for="allComparisons in displayedTextObject['comparison']" v-bind:key="allComparisons">
					<span v-if="allComparisons.length == 1" class="identical-text">
						{{allComparisons[0]}}
					</span>
					<span v-else class="different-text">
						{{allComparisons[i - 1]}}
					</span>
				</span>
		</div>	
		<div v-else v-for="text in displayedTextObject['lines']" v-bind:key="text" class='col-6 mb-4 displayed-texts'>
			<span v-if="receivedFilterTypeRef==='pos'">
				<div>
					<span v-for="tag in text['pos']" v-bind:key="tag" class="pos-entry" :style="{backgroundColor: provideTagColor(tag[1], tag[0])}">
						<!-- Empty <span> maintains line-breaking whitespace. -->
						{{ tag[0] }} <span></span>
					</span>
				</div>
			</span>
			<span v-else>
				<div>
				{{ text['raw'] }}
				</div>
			</span>
		</div>
	</div>	
</template>