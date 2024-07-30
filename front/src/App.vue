<script setup>
import TextDisplayContainer from './components/TextDisplayContainer.vue'
import NavBar from './components/NavBar.vue'
import LineSelection from './components/LineSelection.vue'
import MainText from './components/MainText.vue'
import FileUploadForm from './components/FileUploadForm.vue'
import { ref } from 'vue'

const currentTexts = ref({
	0: [],
	1: []
})

const currentlyDisplayedLines = ref([null, null])

const handleSelectedLineChange = (lineNumber) => {
	for (let i = 0; i < 2; i++) {
		currentlyDisplayedLines.value[i] = currentTexts.value[i][lineNumber]
	}
}

const updateText = (LineLists) => {
	currentTexts.value[0] = LineLists[0]
	currentTexts.value[1] = LineLists[1]
}

</script>

<template>
	<NavBar />
<div class="container content-body">
	<div class="row">
		<MainText />
		<FileUploadForm @receivedData="updateText"/>
		<LineSelection @updateSelectedLine="handleSelectedLineChange"/>
	</div>
	<TextDisplayContainer :displayedTextArray=currentlyDisplayedLines />
</div>
</template>