// export function addText (inputText) {
// 	// console.log(inputText);
// 	document.getElementById("input-form").addEventListener("keyup", function(e) {
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
	let containerForDisplayedTexts = $("#container-for-displayed-texts");
	let displayedText = $("<div class='col-6 displayed-texts'></div>");
	$("#input-form").on("keyup", function(e){
		if (e.which == 13)	{
			while (containerForDisplayedTexts.get(0).childElementCount >= 2)	{
				containerForDisplayedTexts.find("div:first-child").remove()
			}
			containerForDisplayedTexts.append(displayedText.text(inputText));
		}
	});
}