const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang=en>
            <head>
                <meta charset="UTF-8">
                <title>Testing Node - Express.js</title>
            </head>
            <body>
                <h1>Hello World!</h1>
            </body>
        </html>`);
});

server.listen(3931, () => {
    console.log('Server is running on port 3931')
});
