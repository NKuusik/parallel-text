<script setup>
import DropDownButton from './components/DropDownButton.vue'
import TextDisplayContainer from './components/TextDisplayContainer.vue'
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
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container">
					<a class="navbar-brand" href="index.html"><span class="fas fa-home"></span></a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<a class="nav-link mr-auto" href="index.html">Parallel Text Displayer</a>
					<a class="nav-link ml-auto" href="mailto:normankuusik@gmail.com"><span class="fab fa-mailchimp"></span> e-mail</a>
				</div>
			</div>
		</nav> 

<div class="container content-body">

	<div class="row">
		<div class="col-12">
			<h1>Parallel text</h1>
			<p>This website displays two parallel versions of the Universal Declaration of Human Rights line by line.</p>
			<p>Pick input languages.</p>
		</div>
		<div class="col-6">
      <DropDownButton @updateSelectedLanguage="handleDataChange" :id="0" initialButtonText="First Language"/>
		</div>
    <div class="col-6">
      <DropDownButton @updateSelectedLanguage="handleDataChange" :id="1" initialButtonText="Second Language"/>
		</div>

		<div class="col-12">
			<p>Choose the number of the line and press enter.</p>
		</div>
			
		<div class="col-12">
			<input id="input-form" type="text" vuename="enter text" value="1-88">
		</div>
	</div>

	<TextDisplayContainer :displayedTextArray=currentDisplayedText />

</div>
</template>