<script setup>

import { ref, onUpdated } from 'vue'

const props = defineProps({
  displayedTextObject: Object,
  languageTable: Object,
  posTable: Object
})

const filterTypesRef = ref([
		{
			title: 'Display Parts of Speech',
			value: 'pos'
		},
		{
			title: 'Highlight differences',
			value: 'diff'
		},
		{
			title: 'None',
			value: null
		}
	])

const selectedFilterTypeRef = ref(filterTypesRef.value[0].value)

const isNull = (value) => {
	return value === null
}

const validatePoSTag = (tagKey) => {
	return props.posTable[tagKey] !== undefined
}

const provideTagColor = (tagKey) => {
	if (validatePoSTag(tagKey)) {
		return props.posTable[tagKey]['color']
	}
	return 'transparent'
}

onUpdated(() => {
	console.log(props.posTable)
	console.log(props.displayedTextObject['tagColors'])
})
</script>

<template>
	<div v-if="!displayedTextObject['lines'].every(isNull)" class="row mt-4">
		<div>
			<v-select
				v-model="selectedFilterTypeRef"
  				label="Filter"
  				:items="filterTypesRef"
  				variant="outlined"
				>
				<!-- Provides background color for selection -->
				<template #prepend-item>
					<v-card flat class="dropdown-selection" />
          		</template>
			</v-select>
		</div>
		<!-- PoS key explainer -->
		<div v-if="selectedFilterTypeRef==='pos'">
			<span v-for="(tagColor, tagKey) of displayedTextObject['tagColors']" v-bind:key="tagColor" :style="{backgroundColor:provideTagColor(tagKey)}">
				<span v-if="validatePoSTag(tagKey)">
					<!-- Empty <span> maintains line-breaking whitespace. -->
					{{ posTable[tagKey]['name'] }} <span></span>
				</span>
			</span>
		</div>
		<!-- Displayed texts -->
		<div>
			The languages are in {{ languageTable[displayedTextObject["lines"][0]["language"]] }} 
			and {{ languageTable[displayedTextObject["lines"][1]["language"]] }}
		</div>
		<div v-if="selectedFilterTypeRef==='diff' && displayedTextObject['comparison'] !== undefined" v-for="i in 2" v-bind:key="i" class='col-6 mb-4 displayed-texts'>
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
			<span v-if="selectedFilterTypeRef===null">
				<div>
				{{ text['raw'] }}
				</div>
			</span>
			<span v-else-if="selectedFilterTypeRef==='pos'">
				<div>
					<span v-for="tag in text['pos']" v-bind:key="tag" :style="{backgroundColor: provideTagColor([tag[1]])}">
						<!-- Empty <span> maintains line-breaking whitespace. -->
						{{ tag[0] }} <span></span>
					</span>
				</div>
			</span>
		</div>
	</div>	
</template>