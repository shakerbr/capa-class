let names = ["Alice", "Bob", "Charlie", "David", "Eve"];

// Using a while loop to process the names array without losing array elements
let i = 0;
while (i < names.length) {
    console.log(names[i].toUpperCase() + " (" + names[i].length + ")");
    i++;
}

console.log("---------------------");

// Using a while loop to process the names array and remove elements as we go
while (names.length > 0) {
    let name = names.shift();
    console.log(name.toUpperCase() + " (" + name.length + ")");
}
