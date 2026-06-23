let name = "Shaker";
let favNo = 2

const fullDate = new Date();
const year = fullDate.getFullYear();
const month = fullDate.getMonth() + 1;
const day = fullDate.getDate();

let tomorrowDate = function (date) {
    date.setDate(date.getDate() + 1);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return {year, month, day};
}

let {year:tomorrowYear, month:tomorrowMonth, day:tomorrowDay} = tomorrowDate(fullDate);

function sayIt() {
    console.log(`Hello ${name}, your favorite number is ${favNo}! And today is ${year}-${month}-${day}.`);
    console.log(`Tommorw is ${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`)
} 

sayIt();
