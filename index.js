const http = require('http');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    // if(req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //         if(err) throw err;
    //         res.writeHead(200, {
    //             'Content-Type': 'text/html'
    //         })
    //         res.end(content);
    //     })
        
    // }else if(req.url === '/about'){
    //     // res.end('<h1>About</h1>');
    //     fs.readFile(path.join(__dirname,'public', 'about.html'), (err, content) => {
    //         if(err) throw err;
    //         res.writeHead(200, {
    //             'Content-Type': 'text/html'
    //         });
    //         res.end(content);
    //     })
    // }else if(req.url === '/api/users'){
    //     const users = [{
    //         name: 'Bob', age: 40
    //     }, {
    //         name: 'John', age: 30
    //     }];
    //     res.writeHead(200, {
    //         'Content-Type': 'application/json'
    //     });
    //     res.end(JSON.stringify(users))
    // }

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    if(req.url.includes('sw_cached_pages.js')){
        filePath = path.join(__dirname, req.url);
    }
   
    console.log('file', filePath)
    // extension file
    let extname = path.extname(filePath);

    //initial content type
    let contentType = 'text/html';

    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            console.log('here');
            break;
        case '.html':
            contentType = 'text/html';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
    fs.readFile(filePath, (err, content) => {
        if(err){
            if(err.code === 'ENOENT'){ // Page not found
                fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf8');
                });
            }else{
                res.writeHead(500);
                res.end(`Server error ${err.code}`);
            }
        }else{
            res.writeHead(200, {
                'Content-Type': contentType
            })
            console.log('content', content)
            res.end(content, 'utf8');
        }
    })
});

server.listen(PORT, () => console.log(`server running on ${PORT}`));