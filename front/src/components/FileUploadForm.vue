<script setup>

import { ref } from 'vue'
import axios from 'axios'
import { store } from '../store.js'

const first_file = ref(null)
const second_file = ref(null)
const isFormValid = ref(false)

const emit = defineEmits(['receivedData'])


const handleSubmit = () => {
	if (isFormValid) {
		axios.post('http://127.0.0.1:8000/text/', {
		'first_file': first_file.value,
		'second_file': second_file.value
	},		
	{ headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
	).then((result) => {
		store.dataIsReceived()
		console.log(store.isDataReceived)
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
</template>
