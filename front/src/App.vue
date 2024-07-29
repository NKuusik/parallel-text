<script setup>
import DropDownButton from './components/DropDownButton.vue'
import TextDisplayContainer from './components/TextDisplayContainer.vue'
import NavBar from './components/NavBar.vue'
import LineSelection from './components/LineSelection.vue'
import MainText from './components/MainText.vue'
import FileUploadForm from './components/FileUploadForm.vue'
import { ref } from 'vue'

const selectedLanguages = ref({
	0: '',
	1:''
})

const currentlyQueriedText = ref({
	0: [],
	1: []
})

const currentDisplayedText = ref([null, null])

const handleInputDataChange = (buttonText, buttonId) => {
	selectedLanguages.value[buttonId] = buttonText
	ajaxRequest([selectedLanguages.value[0], selectedLanguages.value[1]])
}

const handleSelectedLineChange = (lineNumber) => {
	let currentTexts = currentlyQueriedText.value;
	for (let i = 0; i < 2; i++) {
		currentDisplayedText.value[i] = currentTexts[i][lineNumber]
	}
}

const updateText = (LineLists) => {
	currentlyQueriedText.value[0] = LineLists[0]
	currentlyQueriedText.value[1] = LineLists[1]
}

// Todo: results of ajaxRequest should be stored as refs
function ajaxRequest(input) { 
	let httpRequest = new Array(input.length)
	for (let i = 0; input.length - 1 >= i; i++)	{
		httpRequest[i] = new XMLHttpRequest();
		httpRequest[i].open('GET', 'texts/' + input[i] + ".txt")
		httpRequest[i].onreadystatechange =  function()	{
			if (httpRequest[i].readyState === XMLHttpRequest.DONE && httpRequest[i].status === 200) {
				let responseTextArray = httpRequest[i].responseText.split("\n");
				currentlyQueriedText.value[i] = responseTextArray		
			}
	}
	httpRequest[i].send();
	}
}

</script>

<template>
	<NavBar />
<div class="container content-body">
	<div class="row">
		<MainText />
		<FileUploadForm @receivedData="updateText"/>
	    <DropDownButton @updateSelectedLanguage="handleInputDataChange" :id="0" initialButtonText="First Language"/>
    	<DropDownButton @updateSelectedLanguage="handleInputDataChange" :id="1" initialButtonText="Second Language"/>
		<LineSelection @updateSelectedLine="handleSelectedLineChange"/>
	</div>
	<TextDisplayContainer :displayedTextArray=currentDisplayedText />
</div>
</template>