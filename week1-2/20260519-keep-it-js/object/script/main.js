let person = {
    name: {
        first: "Osman",
        last: "Hamad",
    },
    birthYear: 1990,
    city: "Duhok",
    gender: "male",
    isStudent: false,
    getAge () {
        const currentYear = new Date().getFullYear();
        return currentYear - this.birthYear;
    }
};

// to add a new property later
person.country = "Iraq";

console.log(person.getAge());


