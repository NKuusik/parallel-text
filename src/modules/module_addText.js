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