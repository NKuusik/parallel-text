<script setup>

import { ref, watch } from 'vue'
import axios from 'axios'
import { store } from '../store.js'

const firstExampleText = new File([
	`The Raven\n`, 
	`By Edgar Allan Poe\n`, 
	`Once upon a midnight dreary, while I pondered, weak and weary,
	Over many a quaint and curious volume of forgotten lore,
	While I nodded, nearly napping, suddenly there came a tapping,
	As of some one gently rapping, rapping at my chamber door. “
	“'Tis some visitor,” I muttered, “tapping at my chamber door—
	Only this, and nothing more.”`], 
	"firstExample.txt", 
	{type: "text/plain"})
const secondExampleText = new File([
	`Kaaren\n`, 
	`Edgar Allan Poe\n`, 
	`Südaööl, mil kambris selles tummalt, tuskjalt mõlgutelles
	meeliskelin aegu vanu, ammu veernuid surmani,
	kuulin äkitselt eel ukse kerge väikse sõrmetukse,
	koputuse ma eel ukse, tasa kostva minuni.
	"Rändur see vist, rännukäigul jõudev öisel minuni,"
    mõtlin, "muud ei midagi."`], 
	"secondExample.txt", 
	{type: "text/plain"})


let firstFileRef = ref(null)
let secondFileRef = ref(null)

const isFormValid = ref(false)
const emit = defineEmits(['receivedData'])

const separatorTypesRef = ref([
		{
			title: 'Sentence (regex)',
			value: 'sentence'
		},
		{
			title: 'New line',
			value: 'newline'
		}
	])
const selectedSeparatorTypeRef = ref(separatorTypesRef.value[0].value)


watch(store, () => {
	if (store.exampleUse == true) {
		firstFileRef.value = firstExampleText
		secondFileRef.value = secondExampleText
	} else {
		firstFileRef.value = null
		secondFileRef.value = null
	}
})


const handleSubmit = () => {
	console.log(selectedSeparatorTypeRef.value)
	if (isFormValid.value) {
		let api_endpoint = [process.env.API_URL, 'api/text/?delim=sentence'].join('')
		axios.post(api_endpoint, {
		'first_file': firstFileRef.value,
		'second_file': secondFileRef.value
	},		
	{ headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
	).then((result) => {
		store.dataIsReceived()
		emit('receivedData', [result.data['first_file']['lines'], result.data['second_file']['lines']])
		
	}).catch((err) => {
		console.log(err)
	});
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

</script>

<template>
	<v-form v-model="isFormValid" @submit.prevent="handleSubmit">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-file-input
		  	:disabled="store.exampleUse"
		  	v-model="firstFileRef"
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
		  	:disabled="store.exampleUse"
			v-model="secondFileRef"
		    accept=".txt,text/plain"
            label="Second file"
			:rules="fileTypeRules"
            required
          ></v-file-input>
        </v-col>
      </v-row>
	  <v-select
		v-model="selectedSeparatorTypeRef"
  		label="Separate by"
  		:items="separatorTypesRef"
  		variant="outlined"
></v-select>
	  <v-btn class="mt-4 mb-4 button-universal" type="submit">Submit</v-btn>
    </v-container>
  </v-form>
</template>
