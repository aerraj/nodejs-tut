const http = require('http');
const fs = require('fs')
const url = require('url')





const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();
    const log = `New request ${req.method} ${req.url} recieved at ${new Date().toLocaleString()} \n `;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl)
    fs.appendFile("./log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case "/":
               if(req.method==="GET") res.end("Hello from server home-page")
                break;
            case "/about":
                const username = myUrl.query.myname
                res.end(`Hello I am ${username}`)
                break;
            case "/contact":
                res.end("Please let's talk over mail")
                break;
            case "/signup":
                    if(res.method==="GET")
                    res.end("This is a signup form")
                else if(res.method==="POST")
                // DB query
             res.end("Success")
            default:
                res.end("404 not found")
                break;
        }
    })

})

myServer.listen(8000, () =>
    console.log("Server listening on port 8000"))