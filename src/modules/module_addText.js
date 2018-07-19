export function modifyText(inputText) {
	
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
export function addText (inputText) { 
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