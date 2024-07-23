<script setup>
import DropDownButton from './components/DropDownButton.vue'
import { ref } from 'vue'
import {addText} from './modules/module_addText';


const handleDataChange = (buttonText, buttonId) => {
	selectedLanguages.value[buttonId] = buttonText
	ajaxRequest(selectedLanguages.value['first-language'], selectedLanguages.value['second-language'])
}
let httpRequest;

function ajaxRequest(inputA , inputB) { 
	console.log(`ajaxRequest ${inputA} ${inputB}`)
	httpRequest = new Array(arguments.length);
	console.log(`ajaxRequest ${inputA} ${httpRequest}`)

	for (let i = 0; arguments.length - 1 >= i; i++)	{

		httpRequest[i] = new XMLHttpRequest();
		console.log(`ajaxRequest ${inputA} ${httpRequest}`)
		httpRequest[i].open('GET', 'texts/' + arguments[i] + ".txt")
		httpRequest[i].onreadystatechange =  function()	{
			if (httpRequest[i].readyState === XMLHttpRequest.DONE && httpRequest[i].status === 200) {
				modifyText(httpRequest[i].responseText);				
			}
	}
	httpRequest[i].send();
	}
}

function modifyText(inputText) {
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
						addText(textContent);
					} else {
						textContent = array[lineNumber];
						addText(textContent);
					}
					scheduled = null;	
				}, 50);
			}
			scheduled = e;	
		}	
	});
}


const selectedLanguages = ref({
	'first-language': '',
	'second-language':''
})

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
      <DropDownButton @updateSelectedLanguage="handleDataChange" id="first-language" initialButtonText="First Language"/>
		</div>
    <div class="col-6">
      <DropDownButton @updateSelectedLanguage="handleDataChange" id="second-language" initialButtonText="Second Language"/>
		</div>

		<div class="col-12">
			<p>Choose the number of the line and press enter.</p>
		</div>
			
		<div class="col-12">
			<input id="input-form" type="text" vuename="enter text" value="1-88">
		</div>
	</div>

	<!-- Displayed text -->
	<div class="row" id="container-for-displayed-texts"></div>	

</div>
</template>