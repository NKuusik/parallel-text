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