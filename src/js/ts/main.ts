import http = require('http');
import url = require('url');
import querystring = require('querystring');
import fs = require('fs');

http.createServer(function (req, res) {
  let pathName = url.parse(req.url).pathname;
  console.log(pathName);
  if (pathName == "/") {
    console.log("Updated");
    pathName = "/home";
  }

  fs.readFile(__dirname + "/../../html" + pathName + "/index.html", function(err, data){
    if(err){
      fs.readFile(__dirname + "/../../html/404.html", function(e,d){
        if (e) {
          res.writeHead(404);
          res.write('Page Not Found' + JSON.stringify(err));
          res.end();
        } else {
          res.writeHead(404);
          res.write(d);
          res.end();
        }
      });      
    } else {
      res.writeHead(200);
      res.write(data);
      res.end();
    }
  });
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
