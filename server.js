const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

http.createServer((req, res) => {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    
    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(filename);
            return res.end("404 Not Found");
        }

        let body = [];
        req.on('error', (err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => { 
            body = Buffer.concat(body).toString();
            res.statusCode = 200;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            if (body) {
                //var s = querystring.parse(body);
                //res.write(s.mytext);
                res.write(body);
            } else {
                res.write(data);
            }
            res.end();
        });
    });
}).listen(8080, 'localhost');
