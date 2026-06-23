let names = ["Alice", "Bob", "Charlie", "David", "Eve"];

console.log("Printing the first letter of each name using indexing:");
let j = 0;
while (j < names.length) {
    console.log(names[j] + " (" + names[j][0] + ")");
    j++;
}

console.log("Printing the first letter of each name using substring:");
let i = 0;
while (i < names.length) {
    console.log(names[i] + " (" + names[i].substring(0, 1) + ")");
    i++;
}

console.log("Printing the first letter of each name using slice:");
let l = 0;
while (l < names.length) {
    console.log(names[l] + " (" + names[l].slice(0, 1) + ")");
    l++;
}

console.log("Printing the first letter of each name using split:");
let n = 0;
while (n < names.length) {
    console.log(names[n] + " (" + names[n].split('')[0] + ")");
    n++;
}

console.log("Printing the first letter of each name using charAt:");
let k = 0;
while (k < names.length) {
    console.log(names[k] + " (" + names[k].charAt(0) + ")");
    k++;
}

console.log("Printing the first letter of each name using at:");
let m = 0;
while (m < names.length) {
    console.log(names[m] + " (" + names[m].at(0) + ")");
    m++;
}