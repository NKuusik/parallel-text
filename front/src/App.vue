<script setup>
import TextDisplayContainer from './components/TextDisplayContainer.vue'
import NavBar from './components/NavBar.vue'
import LineSelection from './components/LineSelection.vue'
import MainText from './components/MainText.vue'
import FileUploadForm from './components/FileUploadForm.vue'
import { ref, nextTick } from 'vue'

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
	tagColors: {}
})
const textDisplayContainer = ref(null)

const handleSelectedLineChange = (lineNumber) => {
	const tagColors = {}

	for (let i = 0; i < 2; i++) {
		console.log(currentTexts.value[i])
		let pos_data = currentTexts.value[i]["text"]["pos"]
		if (pos_data !== null) {
			pos_data = currentTexts.value[i]["text"]["pos"][lineNumber - 1]
			for (let entry of pos_data) {
				const tag = entry[1]
				if (!(tag in tagColors)) {
					tagColors[tag] = assignRandomColor()
				}
			}
		}

		currentlyDisplayedLines.value['lines'][i] = {
			raw: currentTexts.value[i]["text"]["raw"][lineNumber - 1],
			pos: pos_data,
			language: currentTexts.value[i]["language"],
		}
	}
	currentlyDisplayedLines.value['tagColors'] = tagColors
	currentlyDisplayedLines.value['comparison'] = currentTexts.value['comparison'][lineNumber - 1]
	console.log(currentlyDisplayedLines.value)
}

const updateText = (receivedData) => {
	console.log(receivedData)
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


const assignRandomColor = () => {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

const scrollToBottom = () => {
	nextTick(() => {
		textDisplayContainer.value.$el.scrollIntoView({behaviour: "smooth"})
	})
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
	<TextDisplayContainer ref="textDisplayContainer" :displayedTextObject=currentlyDisplayedLines />
</div>
</template>