<script setup>
import TextDisplayContainer from './components/TextDisplayContainer.vue'
import NavBar from './components/NavBar.vue'
import LineSelection from './components/LineSelection.vue'
import MainText from './components/MainText.vue'
import FileUploadForm from './components/FileUploadForm.vue'
import { ref } from 'vue'

const currentTexts = ref({
	0: [],
	1: [],
	maxLines: 0
})

const currentlyDisplayedLines = ref([null, null])

const handleSelectedLineChange = (lineNumber) => {
	for (let i = 0; i < 2; i++) {
		currentlyDisplayedLines.value[i] = currentTexts.value[i][lineNumber]
	}
}

const updateText = (lineLists) => {
	currentTexts.value[0] = lineLists[0]
	currentTexts.value[1] = lineLists[1]
	updateMaxText(lineLists)
}

const updateMaxText = (lineLists) => {
	let highestValue = 0
	for (let line of lineLists) {
		if (line.length > highestValue) {
			highestValue = line.length
		}
	}
	currentTexts.value['maxLines'] = highestValue
	console.log(currentTexts.value['maxLines'])
}
</script>

<template>
	<NavBar />
<div class="container content-body">
	<div class="row">
		<MainText />
		<FileUploadForm @receivedData="updateText"/>
		<LineSelection :maxLines="currentTexts['maxLines']" @updateSelectedLine="handleSelectedLineChange"/>
	</div>
	<TextDisplayContainer :displayedTextArray=currentlyDisplayedLines />
</div>
</template>