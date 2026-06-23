let age = parseInt(prompt("How old are you?"), 10);
let gender = prompt("What is your gender? (male/female)");

if (gender == "male" || gender == "m" || gender == "M") {
    gender = "male";
} else if (gender == "female" || gender == "f" || gender == "F") {
    gender = "female";
}


if (age < 13 && gender == "male") {
    alert("You're a male child.");
} else if (age < 13 && gender == "female") {
    alert("You're a female child.");
} else if (gender == "male") {
    alert("You're a male adult.");
} else if (gender == "female") {
    alert("You're a female adult.");
} else {
    alert("Invalid input.");
}
