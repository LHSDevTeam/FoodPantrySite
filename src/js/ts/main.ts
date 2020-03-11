import https = require('https');
import url = require('url');
import querystring = require('querystring');
import fs = require('fs');
import mime = require('mime');

// Load Certificates (This will change when uploaded to the server)
let options = {
  key: fs.readFileSync('tls.key'),
  cert: fs.readFileSync('tls.crt')
};

this.server = https.createServer(options, function (req, res) {
  let pathName = url.parse(req.url).pathname;

  // Home page does not need /home directory
  if (pathName == "/") {
    pathName = "/home";
  }

  // This implementation allows html pages to be requested without .html at the end but does not effect other types
  if (!pathName.includes(".")) {
    pathName = pathName.concat("/index.html");
    pathName = "html".concat(pathName);
  }

  console.log(pathName);
  fs.readFile(__dirname + "/../../" + pathName, function(err, data){
    if(err){
      // Serve 404 page if page is not found
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
      res.setHeader("Content-Type", mime.getType(pathName));
      res.writeHead(200);
      res.write(data);
      res.end();
    }
  });
});
this.server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

exports.close = function(callback: any) {
  this.server.close(callback);
}
