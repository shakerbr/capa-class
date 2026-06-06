const express = require("express");
const mysql = require("mysql2")


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3307",
    password: "capasoftwaredevcourse",
    database: "attendance"
})

connection.connect((err) => {
    console.log("Connected to the database");
})


const server = express();
server.set("json spaces", 2);

server.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang=en>
            <head>
                <meta charset="UTF-8">
                <title>Testing Node - Express.js</title>
            </head>
            <body style="background: black; color: white;">
                <h1>Hello World!</h1>
                <ul>
                    <li style="color: white;"><a style="color: white;" href="/students">Students</a></li>
                </ul>
                
            </body>
        </html>`);
});

server.get("/students", (req, res) => {
    connection.query("SELECT * FROM students;", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(`Error in mySQL query`);
        } else {
            res.json(result);
        }
    })
});

server.get("/students/:id", (req, res) => {
    const studentID = req.params.id;
    connection.query("SELECT * FROM students WHERE id = ?;", [studentID], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(`Error in mySQL query`);
        } else {
            if (result.length > 0) {
                res.json(result[0])
            } else {
                res.status(404).send("404<br>Student Not Found")
            }
        }
    })
});

server.post("/students", express.json(), (req, res) => {
    const {name, gender, courseID} = req.body;
    connection.query(
        "INSERT INTO students (name, gender, course_id) VALUES (?, ?, ?)",
        [name, gender, courseID],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error saving your data");
            } else {
                res.send(`Your data has been saved successfully \nName: ${name} \nGender: ${gender} \nCourse ID: ${courseID}`);
            }
        }
    )
})

const serverport = 3931;
server.listen(serverport, () => {
    console.log(`Server is running on port ${serverport}`)
});
