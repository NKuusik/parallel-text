<script setup>
import DropDownButton from './components/DropDownButton.vue'
import TextDisplayContainer from './components/TextDisplayContainer.vue'
import NavBar from './components/NavBar.vue'
import LineSelection from './components/LineSelection.vue'
import MainText from './components/MainText.vue'
import { ref } from 'vue'

const selectedLanguages = ref({
	0: '',
	1:''
})

const currentDisplayedText = ref([null, null])

const handleDataChange = (buttonText, buttonId) => {
	selectedLanguages.value[buttonId] = buttonText
	ajaxRequest([selectedLanguages.value[0], selectedLanguages.value[1]])
}

// Todo: results of ajaxRequest should be stored as refs
function ajaxRequest(input) { 
	let httpRequest = new Array(input.length)
	for (let i = 0; input.length - 1 >= i; i++)	{
		httpRequest[i] = new XMLHttpRequest();
		httpRequest[i].open('GET', 'texts/' + input[i] + ".txt")
		httpRequest[i].onreadystatechange =  function()	{
			if (httpRequest[i].readyState === XMLHttpRequest.DONE && httpRequest[i].status === 200) {
				modifyText(httpRequest[i].responseText, i);				
			}
	}
	httpRequest[i].send();
	}
}

// Todo: Refactor and move this to LineSelection
function modifyText(inputText, index) {
	let scheduled = null;
	let textContent;
	let array = inputText.split("\n");
	$("#input-form").on("keydown", function(e) {
		if (e.which == 13)	{
		let lineNumber = $("#input-form").val();
			if (!scheduled)	{
				setTimeout(() =>	{
					if (array[lineNumber] == null)	{
						textContent = "No line found. Choose another number.";
					} else {
						textContent = array[lineNumber];

					}
					scheduled = null;
					currentDisplayedText.value[index] = textContent	
				}, 50);
			}
			scheduled = e;	
		}	
	});
}

</script>

<template>
	<NavBar />
<div class="container content-body">
	<div class="row">
		<MainText />
	    <DropDownButton @updateSelectedLanguage="handleDataChange" :id="0" initialButtonText="First Language"/>
    	<DropDownButton @updateSelectedLanguage="handleDataChange" :id="1" initialButtonText="Second Language"/>
		<LineSelection/>
	</div>
	<TextDisplayContainer :displayedTextArray=currentDisplayedText />
</div>
</template>