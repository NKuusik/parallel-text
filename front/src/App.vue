<script setup>
import TextDisplayContainer from './components/TextDisplayContainer.vue'
import NavBar from './components/NavBar.vue'
import LineSelection from './components/LineSelection.vue'
import MainText from './components/MainText.vue'
import FileUploadForm from './components/FileUploadForm.vue'
import { ref, nextTick } from 'vue'

const currentTexts = ref({
	0: [],
	1: [],
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
		let pos_data = currentTexts.value[i]["pos"]
		if (pos_data !== null) {
			pos_data = currentTexts.value[i]["pos"][lineNumber - 1]
			for (let entry of pos_data) {
				const tag = entry[1]
				if (!(tag in tagColors)) {
					tagColors[tag] = assignRandomColor()
				}
			}
		}

		currentlyDisplayedLines.value['lines'][i] = {
			raw: currentTexts.value[i]["raw"][lineNumber - 1],
			pos: pos_data,
		}
	}
	currentlyDisplayedLines.value['tagColors'] = tagColors
	currentlyDisplayedLines.value['comparison'] = currentTexts.value['comparison'][lineNumber - 1]
	console.log(currentlyDisplayedLines.value['tagColors'])
}

const updateText = (lineLists) => {
	currentTexts.value[0] = lineLists[0]
	currentTexts.value[1] = lineLists[1]
	currentTexts.value['comparison'] = lineLists[2]
	updateMaxText([lineLists[0]["raw"], lineLists[1]["raw"]])
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