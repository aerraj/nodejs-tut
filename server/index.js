const http = require('http');
const fs = require('fs')
const myServer = http.createServer((req, res) => {
    if(req.url==="/favicon.ico")return res.end();
    const log = `New request ${req.url} recieved at ${new Date().toLocaleString()} \n `;
    fs.appendFile("./log.txt", log, (err, data) => {
        switch (req.url) {
            case "/":
                res.end("Hello from server home-page")
                break;
            case "/about":
                res.end("Hello from about")
                break;
            case "/contact":
                res.end("Hello from contact")
                break;
            default:
                res.end("404 not found")
                break;
        }
    })

})

myServer.listen(8000, () =>
    console.log("Server listening on port 8000"))