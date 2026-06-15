import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.json("Welcome to Student API");
});

app.get("/student", (req, res) => {
    res.json({
        "id": 1,
        "name": "Shakir Br",
        "department": "IT"
    });
});

app.get("/about", (req, res) => {
    res.json({
        "course": "Full-Stack Application Development",
        "week": 4,
        "topic": "Backend Fundamentals"
    });
});

app.get("/skills", (req, res) => {
    res.json(["HTML", "CSS", "JavaScript", "Node.js"]);
});

app.get("/students", (req, res) => {
    res.json(
        [
            {
                "id": 1,
                "name": "Ali"
            },
            {
                "id": 2,
                "name": "Sara"
            },
            {
                "id": 3,
                "name": "Ahmed"
            }
        ]
    );
});

const port = 3000;
app.listen(port, (err) => {
    console.log(`Server is listening on port ${port}`);
});
