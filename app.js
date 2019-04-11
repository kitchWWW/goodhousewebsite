var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.env.PORT || 3000;

const runSpawn = require('child_process').spawn;

fs.writeFile("server.log","Starting Log...",function(err){});

const testSpawn = require('child_process').spawn;

function serverLog(data){
  console.log("***"+ Date.now()+" "+data);
}

http.createServer(function(request, response) {
  serverLog(request.method);
  serverLog(request.url);
  if(request.method==="GET"){
    var uri = url.parse(request.url).pathname
      , filename = path.join(process.cwd(), uri);

    fs.exists(filename, function(exists) {
      if(!exists) {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
      }

      if (fs.statSync(filename).isDirectory()) filename += '/index.html';

      fs.readFile(filename, "binary", function(err, file) {
        if(err) {        
          response.writeHead(500, {"Content-Type": "text/plain"});
          response.write(err + "\n");
          response.end();
          return;
        }

        response.writeHead(200);
        response.write(file, "binary");
        response.end();
      });
    });
  } else {
      response.writeHead(404, 'Resource Not Found', {'Content-Type': 'text/html'});
      response.end('<!doctype html><html><head><title>404</title></head><body>404: Resource Not Found</body></html>');
    }
}).listen(parseInt(port, 10));

console.log("Server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");