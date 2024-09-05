<script setup>
import TextDisplayContainer from './components/TextDisplayContainer.vue'
import NavBar from './components/NavBar.vue'
import LineSelection from './components/LineSelection.vue'
import MainText from './components/MainText.vue'
import FileUploadForm from './components/FileUploadForm.vue'
import * as tableData from './resources/table_data'
import { readCSV } from './readCSVData'
import { ref, nextTick, onMounted } from 'vue'
import axios from 'axios'

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

const languageTable = ref({})
const posTable = ref({})

const handleSelectedLineChange = (lineNumber) => {
	currentlyDisplayedLines.value['usedTags'].clear()

	for (let i = 0; i < 2; i++) {
		let pos_data = currentTexts.value[i]["text"]["pos"]
		if (pos_data !== null) {
			pos_data = currentTexts.value[i]["text"]["pos"][lineNumber - 1]
			for (let entry of pos_data) {
				const tag = entry[1]
				currentlyDisplayedLines.value['usedTags'].add(tag)
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


const assignRandomColor = () => {
	let colorCode = 0
	// Excludes dark colors
	while (colorCode < 5000000) {
		colorCode = Math.floor(Math.random() * 16777215)
	}
      
	return '#' + colorCode.toString(16);
}

const scrollToBottom = () => {
	nextTick(() => {
		textDisplayContainer.value.$el.scrollIntoView({behaviour: "smooth"})
	})
}

onMounted(() => {
	for (const table of Object.values(tableData)) {
		axios.get(table)
		.then((res) => {
		return readCSV(res.data)
		}).then((currentTabe) => {
			const currentTableData = currentTabe.data
			if (currentTableData[0][0] === 'lang') {
				// Language codes start from third row.
				for (const languageRow of currentTableData.slice(2)) {
					languageTable.value[languageRow[0]] = languageRow[1]
					}
				}
			else if (currentTableData[0][0] === 'pos') {
				// PoS codes start from second row.
				for (const posRow of currentTableData.slice(1)) {
					posTable.value[posRow[0]] = {
						name: posRow[1],
						color: assignRandomColor()
					}
					}
				}
			})
		}
		console.log(posTable.value)
	})

</script>

<template>
	<NavBar />
<div class="container content-body">
	<div class="row">
		<MainText />
		<FileUploadForm @receivedData="updateText"/>
		<LineSelection :maxLines="currentTexts['maxLines']" @updateSelectedLine="handleSelectedLineChange"/>
	</div>
	<TextDisplayContainer ref="textDisplayContainer" :displayedTextObject=currentlyDisplayedLines 
		:languageTable=languageTable :posTable=posTable />
</div>
</template>