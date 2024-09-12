<script setup>
import TextDisplayContainer from './components/TextDisplayContainer.vue'
import NavBar from './components/NavBar.vue'
import LineSelection from './components/LineSelection.vue'
import MainText from './components/MainText.vue'
import FileUploadForm from './components/FileUploadForm.vue'
import About from './components/About.vue'
import { languageCodes } from './resources/languageCodes'
import { posCodes } from './resources/posCodes'
import { ref, nextTick, onMounted } from 'vue'
import { isNonAlphanumeric } from './utils/isNonAlphanumeric'
import { assignRandomColor } from './utils/assignRandomColor'

const currentTexts = ref({
	0: {
		text: [], 
		language: null
	},
	1: {
		text: [],
		language: null
	},
	maxLines: 1,
	comparison: []
})

const currentlyDisplayedLines = ref({
	lines: [null, null],
	comparison: undefined,
	usedTags: new Set()
})
const textDisplayContainer = ref(null)
const toggleAboutViewRef = ref(true)

const languageTable = ref(languageCodes)
const posTable = ref({})

const handleSelectedLineChange = (lineNumber) => {
	currentlyDisplayedLines.value['usedTags'].clear()

	for (let i = 0; i < 2; i++) {
		let pos_data_array = currentTexts.value[i]["text"]["pos"]
		let pos_data = [];
		if (pos_data_array) {
			pos_data = currentTexts.value[i]["text"]["pos"][lineNumber - 1]
			if (pos_data) {
				for (let entry of pos_data) {
				if (!isNonAlphanumeric(entry[0]))
				currentlyDisplayedLines.value['usedTags'].add(entry[1])
				}
			}
		}

		currentlyDisplayedLines.value['lines'][i] = {
			raw: currentTexts.value[i]["text"]["raw"][lineNumber - 1],
			pos: pos_data,
			language: currentTexts.value[i]["language"],
		}
	}
	currentlyDisplayedLines.value['comparison'] = currentTexts.value['comparison'][lineNumber - 1]
}

const toggleAboutView = () => {
	toggleAboutViewRef.value = !toggleAboutViewRef.value
}

const updateText = (receivedData) => {
	currentTexts.value[0] = receivedData[0]
	currentTexts.value[1] = receivedData[1]
	currentTexts.value['comparison'] = receivedData['comparison']
	updateMaxText([receivedData[0]["text"]["raw"], receivedData[1]["text"]["raw"]])
	handleSelectedLineChange(1)
	scrollToBottom()

}

const updateMaxText = (lineLists) => {
	let highestValue = 0
	for (let line of lineLists) {
		if (line.length > highestValue) {
			highestValue = line.length
		}
	}
	currentTexts.value['maxLines'] = highestValue
}

const scrollToBottom = () => {
	nextTick(() => {
		textDisplayContainer.value.$el.scrollIntoView({behaviour: "smooth"})
	})
}

onMounted(() => {
	Object.entries(posCodes).forEach(posEntry => {
		posTable.value[posEntry[0]] = {
			name: posEntry[1],
			color: assignRandomColor()
		}
	})
})

</script>

<template>
	<NavBar @aboutViewClick="toggleAboutView"/>
<div class="container content-body">
	<div v-if="!toggleAboutViewRef">
		<MainText />
		<FileUploadForm @receivedData="updateText"/>
		<LineSelection :maxLines="currentTexts['maxLines']" @updateSelectedLine="handleSelectedLineChange"/>
		<TextDisplayContainer ref="textDisplayContainer" :displayedTextObject=currentlyDisplayedLines 
		:languageTable=languageTable :posTable=posTable />
	</div>
	<div v-else id="about-view">
		<About/>
	</div>

</div>
</template>