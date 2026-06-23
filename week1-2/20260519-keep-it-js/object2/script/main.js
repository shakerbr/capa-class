let person = {
    name: "Osman",
    age: 30,
    city: "Duhok",
    county: "Iraq",
};

// Using in loop to iterate over the properties of the person object
for (let key in person) {
    console.log(key + " is " + person[key]);
}