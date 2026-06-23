const streetStates = ["empty", "crowded"];
const lightStates = ["red", "yellow", "green"];
let lightIndex = 0;
let streetIndex = 0;

const lightStateEl = document.querySelector(".light-state");
const streetStateEl = document.querySelector(".street-state");
const badgeEl = document.getElementById("current-state-badge");

function updateDisplay() {
  var light = lightStates[lightIndex];
  var street = streetStates[streetIndex];

  /* Traffic light color */
  lightStateEl.className = "light-state " + light;

  /* Street text */
  streetStateEl.textContent = street.charAt(0).toUpperCase() + street.slice(1);
  streetStateEl.className = "street-state " + street;

  /* Current state — conditions on both light and street */
  if (light === "red") {
    badgeEl.textContent = "Stop";
    badgeEl.className = "stop";
  } else if (light === "green" && street === "empty") {
    badgeEl.textContent = "Can drive";
    badgeEl.className = "drive";
  } else {
    badgeEl.textContent = "Wait";
    badgeEl.className = "wait";
  }
}

document.getElementById("change-light").addEventListener("click", function () {
  lightIndex = (lightIndex + 1) % lightStates.length;
  updateDisplay();
});

document.getElementById("change-street").addEventListener("click", function () {
  streetIndex = (streetIndex + 1) % streetStates.length;
  updateDisplay();
});

updateDisplay();
