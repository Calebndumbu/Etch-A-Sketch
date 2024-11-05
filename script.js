const container = document.getElementById("container");

//create 256 squares
for (let i = 0; i < 256; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  container.appendChild(square);
}
