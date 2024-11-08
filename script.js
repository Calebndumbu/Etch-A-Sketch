// Global variables and initial setup
const CONTAINER_HEIGHT = 300; // The height of the container for the grid is set to 300px
let element_color = "black"; // Default color for the grid blocks
let rgbOn = false; // Flag to track if RGB mode is enabled

// DOM elements for user interaction
const applyColorButton = document.getElementById("apply-color"); // Button to apply the selected color
const colorInput = document.getElementById("color"); // Color input element to pick color
const container = document.getElementById("container"); // The grid container element
const rgbMode = document.getElementById("rgb-mode"); // Checkbox to toggle RGB mode
const changeGrid = document.getElementById("change-grid"); // Button to change grid size
const resetButton = document.getElementById("reset-grid"); // Button to reset to default grid

// Function to create the grid dynamically
function makeGrid(div, size) {
  div.innerHTML = ""; // Clear existing grid if any
  div.style.height = CONTAINER_HEIGHT + "px"; // Set the container height
  div.style.width = CONTAINER_HEIGHT + "px"; // Set the container width

  // Create grid blocks based on the size
  for (let i = 0; i < size ** 2; i++) {
    const square = document.createElement("div"); // Create a new square element
    square.classList.add("block"); // Add the 'block' class for styling
    square.style.width = `${CONTAINER_HEIGHT / size}px`; // Set block width relative to the grid size
    square.style.height = `${CONTAINER_HEIGHT / size}px`; // Set block height

    div.appendChild(square); // Append the block to the container
    addHoverEffect(square); // Add hover effect to the block
  }
  addColorEffect(div); // Add the coloring effect when interacting with blocks
}

// Function to set the color of the blocks
function setColor(color) {
  element_color = color; // Update the element_color variable to the selected color
}

// Function to apply color on mouse events (mousedown, mouseover)
function addColorEffect(container) {
  let isHolding = false; // Flag to track if mouse is being held down

  // When mouse button is pressed down on the container
  container.addEventListener("mousedown", (e) => {
    isHolding = true; // Set isHolding to true when mouse button is pressed
    if (e.target.classList.contains("block") && isHolding) {
      color(e.target); // Apply color to the clicked block
    }
  });

  // When mouse button is released, set isHolding to false
  container.addEventListener("mouseup", () => {
    isHolding = false;
  });

  // When mouse is moved over a block while holding the mouse button
  container.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("block") && isHolding) {
      color(e.target); // Apply color to the hovered block if holding mouse
    }
  });
}

// Function to color a block based on the color mode (normal or RGB)
function color(pixel) {
  if (!rgbOn) {
    pixel.style.backgroundColor = element_color; // Apply the selected color if RGB is off
  } else {
    // Apply a random RGB color if RGB mode is on
    pixel.style.backgroundColor = `rgb(${Math.random() * 255}, ${
      Math.random() * 255
    }, ${Math.random() * 255})`;
  }
}

// Function to add hover effects to grid blocks (highlighting)
function addHoverEffect(pixel) {
  pixel.addEventListener("mouseover", () => pixel.classList.add("hovered")); // Add 'hovered' class when mouse is over
  pixel.addEventListener("mouseout", () => pixel.classList.remove("hovered")); // Remove 'hovered' class when mouse leaves
}

// Function to reset the grid to its default state
function resetToDefault() {
  element_color = "black"; // Reset color to black
  rgbOn = false; // Reset RGB mode to off
  colorInput.value = "#000000"; // Reset color input to black
  makeGrid(container, 16); // Create a new grid with default size (16x16)
}

// Initialize the grid with default size (16x16)
makeGrid(container, 16);

// Event listener for the "Apply Color" button
applyColorButton.addEventListener("click", () => {
  setColor(colorInput.value); // Set the color based on the user's input
});

// Event listener for the "RGB Mode" button (toggle RGB mode on or off)
rgbMode.addEventListener("click", () => {
  rgbOn = !rgbOn; // Toggle the RGB mode state
});

// Event listener for the "Change Grid Size" button
changeGrid.addEventListener("click", () => {
  const size = parseInt(prompt("Enter grid size between 2 and 128"), 10); // Prompt user for grid size

  // Check if the size is a valid number between 2 and 128
  if (Number.isInteger(size) && size >= 2 && size <= 128) {
    makeGrid(container, size); // Create the grid with the new size
  } else {
    alert("Invalid size. Enter number between 2 and 128!"); // Alert user if the size is invalid
  }
});

// Event listener for the "Reset Grid" button
resetButton.addEventListener("click", resetToDefault); // Reset the grid to default settings when clicked
