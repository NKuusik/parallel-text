import './styles/general_style.scss';
import {addText} from './modules/module_addText';

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
			}	else	{
				firstLanguage = dropbtns[0].innerHTML + ".txt";
			}	if (a === 1)	{
				secondLanguage = this.innerHTML + ".txt";
			}	else	{
				secondLanguage = dropbtns[1].innerHTML + ".txt";
			}
			ajaxRequest(firstLanguage, secondLanguage);
				});		
			}
		
		}
	}

function modifyText(inputText) {
	let scheduled = null;
	let array = inputText.split("\n");
	document.getElementById("inputForm").addEventListener("keydown", function(e) {
		let key = e.key;
		let iterator = document.getElementById("inputForm").value;
		let textContent = document.createTextNode(array[iterator]);
		if (!scheduled)	{
			setTimeout(() =>	{
				if (textContent.nodeValue == "undefined")	{
					textContent = document.createTextNode("No line found. Choose another number.");
				}
				addText(textContent);
				scheduled = null;	
			}, 50);
		}
		scheduled = e;
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