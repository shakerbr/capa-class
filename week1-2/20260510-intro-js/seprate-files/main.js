let age = "";

while (age === "") {
    age = prompt("Please enter your age:");
    if (!age) {
        history.back();
    } else {
        if (age !== "") {
            if (confirm("Are you sure your age is correct?")) {
                alert("your age is"+age);
            } else {
                alert("Please revisit the page and enter your page correctly.");
                history.back();
            }
        }
    }
}