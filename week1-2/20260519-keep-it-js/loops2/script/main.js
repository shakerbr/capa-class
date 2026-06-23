let names = ["Alice", "Bob", "Charlie", "David", "Eve"];

console.log("-- 0 --");
for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
}

console.log("-- 1 --");
//anothr way
for (let i in names) {
    console.log(names[i]);
}

console.log("-- 2 --");
//another way
for (let name of names) {
    console.log(name);
}

console.log("-- 3 --");
//another way
names.forEach(function(name) {
    console.log(name);
}); 

console.log("-- 4 --");
//another way
names.forEach(name => console.log(name));

