import './styles/general_style.scss';
import {addText} from './modules/module_addText';

let httpRequest;

function ajaxRequest(inputA , inputB) { 

	/*Defining both languages as separate parametres 
	(and not as a single array) avoids mixing up the 
	display order of texts. 
	*/

	httpRequest = new Array(arguments.length);
	for (let i = 0; arguments.length - 1 >= i; i++)	{
	
	httpRequest[i] = new XMLHttpRequest();

	httpRequest[i].open('GET', 'texts/' + arguments[i])
	httpRequest[i].onreadystatechange =  function()	{
		if (httpRequest[i].readyState === XMLHttpRequest.DONE && httpRequest[i].status === 200) {
			modifyText(httpRequest[i].responseText);				
		}
	}
	httpRequest[i].send();
	}
}

function selectLanguages ()	{
	$(".dropdown-content p").on("mouseup", function () {
		let selectedButton = $(this).parent().siblings(".dropbtn");
		selectedButton.html($(this).html());
		
		/* Selected languages were formely assigned by looping an array
		This version relies on a dynamically updated object instead */
			let selectedLanguages =	{
			firstLanguage: `${$("#first-language").text()}.txt`,
			secondLanguage: `${$("#second-language").text()}.txt`
		}
	ajaxRequest(selectedLanguages.firstLanguage, selectedLanguages.secondLanguage);
	});
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




selectLanguages();