<script setup>
import DropDownButton from './components/DropDownButton.vue'
import TextDisplayContainer from './components/TextDisplayContainer.vue'
import NavBar from './components/NavBar.vue'
import LineSelection from './components/LineSelection.vue'
import MainText from './components/MainText.vue'
import { ref } from 'vue'
import axios from 'axios';


const selectedLanguages = ref({
	0: '',
	1:''
})

const currentlyQueriedText = ref({
	0: [],
	1: []
})

const currentDisplayedText = ref([null, null])

const first_file = ref(null)
const second_file = ref(null)

const handleSubmit = () => {
	axios.post('http://127.0.0.1:8000/text/', {
		'first_file': first_file.value,
		'second_file': second_file.value
	},		
	{ headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
	).then((result) => {
		// Todo: separate handling for invalid server response
		currentlyQueriedText.value[0] = result.data['first_file']['lines']
		currentlyQueriedText.value[1] = result.data['second_file']['lines']
		
	}).catch((err) => {
		console.log(err)
	});
}

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

const fileTypeRules = [
	(value) => ruleValueExists(value), 
	(value) => ruleNameLength(value, 50), 
	(value) => ruleFileSize(value),
	(value) => ruleFileExtensionIsCorrect(value),
	(value) => ruleFileTypeIsCorrect(value)

]


const ruleValueExists = (value) => {
	if (value.length === 1) {
		return true		
	}
	return "Required"
}

const ruleNameLength = (value, acceptedLength) => {
	let fileName = value[0].name
	if (fileName.length <= acceptedLength) {
		return true
	}
	return "File name is too long"
} 

const ruleFileSize = (value) => {
	let file = value[0]
	if (file.size > 0) {
		return true
	}
	return "File is empty"
}

const ruleFileExtensionIsCorrect = (value) => {
	let allowedExtensions = /.txt/i
	let fileName = value[0].name
	if (allowedExtensions.exec(fileName)) {
		return true
	}
	return "Only .txt files are permitted"
}

const ruleFileTypeIsCorrect = (value) => {
	let file = value[0]
	if (file.type === "text/plain") {
		return true
	}
	return "Plain text file required."
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


		<v-form v-model="valid" @submit.prevent="handleSubmit">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-file-input
		  	v-model="first_file"
		  	accept=".txt,text/plain"
            label="First file"
			:rules="fileTypeRules"
            required
          ></v-file-input>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-file-input
			v-model="second_file"
		    accept=".txt,text/plain"
            label="Second file"
			:rules="fileTypeRules"
            required
          ></v-file-input>
        </v-col>
      </v-row>
	  <v-btn class="mt-4 mb-4" type="submit">Submit</v-btn>
    </v-container>
  </v-form>


	    <DropDownButton @updateSelectedLanguage="handleInputDataChange" :id="0" initialButtonText="First Language"/>
    	<DropDownButton @updateSelectedLanguage="handleInputDataChange" :id="1" initialButtonText="Second Language"/>
		<LineSelection @updateSelectedLine="handleSelectedLineChange"/>
	</div>
	<TextDisplayContainer :displayedTextArray=currentDisplayedText />
</div>
</template>