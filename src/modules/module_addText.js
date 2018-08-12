// export function addText (inputText) {
// 	// console.log(inputText);
// 	document.getElementById("inputForm").addEventListener("keyup", function(e) {
// 		let key = e.key;
// 		let displayedText = document.getElementsByClassName("displayed-text");
// 		// console.log(displayedText);
// 		if (key === "Enter") {
// 			// let textField = document.createElement("p");
// 			// textField.setAttribute("class", "textfield");
			
// 			[].forEach.call(displayedText, element => {
// 			console.log(element);
// 			let textField = document.createElement("p");
// 			textField.setAttribute("class", "textfield");
			
// 				while (element.childElementCount >= 1)	{
// 					element.removeChild(element.firstChild);
// 				}
				
// 				textField.appendChild(inputText);
// 				element.appendChild(textField);
// 			});
// 		}
// 	});
// }


export function addText (inputText) {
	let containerForDisplayedTexts = document.getElementById("container-for-displayed-texts");
	document.getElementById("inputForm").addEventListener("keyup", function(e) {
		let key = e.key;
		if (key === "Enter") {
			let displayedText = document.createElement("div");
			displayedText.setAttribute("class", "col-6 displayed-texts");
		
			while (containerForDisplayedTexts.childElementCount >= 2)	{
				containerForDisplayedTexts.removeChild(containerForDisplayedTexts.firstChild);
			}
			displayedText.appendChild(inputText);
			containerForDisplayedTexts.appendChild(displayedText);
		}
	});
}