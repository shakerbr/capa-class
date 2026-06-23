const mainContainer = document.getElementById("main-container");

// Add a heading insider the main container
const heading = document.createElement("h1");
heading.style.color = "gray";
// Append the heading to the main container 5 times using a loop
for (let i = 0; i < 5; i++) {
    heading.textContent = `Hello World! ${i + 1}`;
    mainContainer.append(heading.cloneNode(true));
}