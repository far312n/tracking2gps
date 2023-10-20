const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
var fs = require('fs');

var server = http.createServer(function(request, response){
    console.log('Request was made: ' +request.url);
    if (request.url === '/track2gps.html' || request.url === '/') {
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.createReadStream(__dirname + '/track2gps.html', 'utf8').pipe(response);
    }
    else if (request.url === '/script.js') {
        response.writeHead(200, {"Content-Type": "text/javascript"});
        fs.createReadStream(__dirname + '/script.js', 'utf8').pipe(response);
    }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// fs.readFile('track2gps.html', function (err, html) {

//     if (err) throw err;    

//     const server = http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  

//     });

//     server.listen(port, hostname, () => {
//       console.log(`Server running at http://${hostname}:${port}/`);
//     });
// });