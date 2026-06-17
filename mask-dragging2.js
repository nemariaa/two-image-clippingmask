/* Adapted from https://codepen.io/peterbenoit/pen/MWMNOYE. Thank you Peter!! */

// Variables to store current drag position
let isDragging = false;
let startX,
	startY,
	maskX = 50,
	maskY = 50;

// Get element
const maskedElement = document.getElementById("maskedElement");

// Update display
function updateMask() {
		maskedElement.style.maskPosition = `${maskX}% ${maskY}%`;
		maskedElement.style.webkitMaskPosition = `${maskX}% ${maskY}%`;
	} 

// Calculate new positions as a percentage based on masked image size & update mask position
function calculateNewPositions(dx,dy) {
  const imgWidth = maskedElement.clientWidth;
	const imgHeight = maskedElement.clientHeight;
	const newMaskX = Math.min(
		Math.max(
			(((maskX * imgWidth) / 100 + dx) / imgWidth) * 100,
			0
		),
		100
	);
	const newMaskY = Math.min(
		Math.max(
			(((maskY * imgHeight) / 100 + dy) / imgHeight) * 100,
			0
		),
		100
	);
	// Update the mask position
	maskX = newMaskX;
	maskY = newMaskY;
  //console.log("Update mask position finished"); 
}

/***************************************/
/* Handle mouse click and drag events */

// Handle dragging the mask element
maskedElement.addEventListener("mousedown", (e) => {
	isDragging = true;
	startX = e.clientX;
	startY = e.clientY;
	maskedElement.classList.add("dragging");
	e.preventDefault(); // Prevent default drag behavior
  //console.log("Mousedown finished"); 
});

document.addEventListener("mousemove", (e) => {
	if (!isDragging) return;

	const dx = e.clientX - startX;
	const dy = e.clientY - startY;
  console.log(dx); 
  console.log(dy); 

	// Calculate new positions
	calculateNewPositions(dx,dy);  

  // Update display
	updateMask(true);

	// Update the starting positions
	startX = e.clientX;
	startY = e.clientY;
});

document.addEventListener("mouseup", () => {
	isDragging = false;
	maskedElement.classList.remove("dragging");
  //console.log("Dragging finished")
});
/* End mouse section */
/***************************************/

/***************************************/
/* Handle touch events for mobile devices */
maskedElement.addEventListener("touchstart", (e) => {
	isDragging = true;
	startX = e.touches[0].clientX;
	startY = e.touches[0].clientY;
	maskedElement.classList.add("dragging");
	e.preventDefault();
});

document.addEventListener("touchmove", (e) => {
	if (!isDragging) return;

	const dx = e.touches[0].clientX - startX;
	const dy = e.touches[0].clientY - startY;

	// Calculate new positions
	calculateNewPositions(dx,dy);  

	// Update display
	updateMask(true);

	// Update the starting positions
	startX = e.touches[0].clientX;
	startY = e.touches[0].clientY;
});

document.addEventListener("touchend", () => {
	isDragging = false;
	maskedElement.classList.remove("dragging");
});
/* End mobile section */
/***************************************/

// Initialize the mask when the page loads
document.addEventListener("DOMContentLoaded", () => {
	updateMask(true);
});

