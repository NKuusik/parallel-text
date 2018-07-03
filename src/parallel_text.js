import './general style.css';
import './parallel text style.css';

let httpRequest;

function selectLanguages ()	{
	let firstLanguage;
	let secondLanguage;
	let dropbtns = document.getElementsByClassName("dropbtn");
	for (let a = 0; dropbtns.length - 1 >= a; a++)	{
		let options = document.getElementsByClassName("dropdown-content")[a].children;
			for (let i = 0; options.length - 1 >= i; i++)	{
			options[i].addEventListener("mouseup", function()	{
			dropbtns[a].innerHTML = options[i].innerHTML;
			if (a === 0)	{
				firstLanguage = this.innerHTML + ".txt";
				console.log("First language is " + firstLanguage);
			}
				else	{
				firstLanguage = dropbtns[0].innerHTML + ".txt";
			}
			if (a === 1)	{
				secondLanguage = this.innerHTML + ".txt";
			}
				else	{
				secondLanguage = dropbtns[1].innerHTML + ".txt";
			}
			ajaxRequest(firstLanguage, secondLanguage);
				});		
			}
		
		}
	}
/* Initially the ajaxRequest ran on two separate functions, addFirstLanguage() and addSecondLanguage(). 
This has now been replaced by the function selectLanguages()

function addFirstLanguage()	{
		let options = document.getElementsByClassName("dropdown-content")[0].children;
		let dropbtns = document.getElementsByClassName("dropbtn");
		for (let i = 0; options.length - 1 >= i; i++)	{
			options[i].addEventListener("mouseup", function()	{
			dropbtns[0].innerHTML = options[i].innerHTML;
			let firstLanguage = this.innerHTML + ".txt";
			let secondLanguage = dropbtns[1].innerHTML + ".txt";
			ajaxRequest(firstLanguage, secondLanguage);
				});		
			}
		}

function addSecondLanguage()	{
		let options = document.getElementsByClassName("dropdown-content")[1].children;
		let dropbtns = document.getElementsByClassName("dropbtn");
		for (let i = 0; options.length - 1 >= i; i++)	{
			options[i].addEventListener("mouseup", function()	{
			dropbtns[1].innerHTML = options[i].innerHTML;
			let firstLanguage = dropbtns[0].innerHTML + ".txt";
			let secondLanguage = this.innerHTML + ".txt";
			ajaxRequest(firstLanguage, secondLanguage);
				});		
			}
		}
*/


function modifyText(inputText) {
	
	let array = inputText.split("\n");
	document.getElementById("inputForm").addEventListener("keydown", function(e) {
		let key = e.key;
			let iterator = document.getElementById("inputForm").value;
			let textContent = document.createTextNode(array[iterator]);
			if (textContent.nodeValue == "undefined")	{
				textContent = document.createTextNode("No line found. Choose another number.");
				addText(textContent);
			} else {
				addText(textContent);
			}	
		});	
	}
function addText (inputText) { 
	document.getElementById("inputForm").addEventListener("keyup", function(e) {
		let key = e.key;
		let konteiner = document.getElementsByClassName("container")[0];
		let previousDiv = document.getElementById("previousdiv");
		if (key === "Enter") {
			let textField = document.createElement("div");
			textField.setAttribute("class", "textfield");
			
			while (previousDiv.childElementCount >= 2)	{
				previousDiv.removeChild(previousDiv.firstChild);
			}
			textField.appendChild(inputText);
			previousDiv.appendChild(textField);
		}
	});
}


function ajaxRequest(inputA , inputB) {
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


selectLanguages();