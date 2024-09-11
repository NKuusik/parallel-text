export const assignRandomColor = () => {
	let colorCode = 0
	// Excludes dark colors
	while (colorCode < 5000000) {
		colorCode = Math.floor(Math.random() * 16777215)
	}
	return '#' + colorCode.toString(16);
}