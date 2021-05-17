import http = require('http');
import fs = require('fs');
import mime = require('mime');
import mongoose = require("mongoose");
import bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String
});

userSchema.methods.generateHash = function(password) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      return hash;
    });
  });
}

// mongodb client, used for accessing the database
async function run_mongodb_client() {
  let secrets = require("./secrets.json");
  mongoose.connect("mongodb+srv://" + secrets.username + ":" + secrets.password +"@web1.c3ofa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

}

exports.server = http.createServer(function (req, res) {
  const baseURL = "http://" + req.headers.host + "/";
  let pathName = new URL(req.url, baseURL).pathname;

  // Home page does not need /home directory
  if (pathName == "/") {
    pathName = "/home";
  }

  // This implementation allows html pages to be requested without .html at the end but does not effect other types
  if (!pathName.includes(".")) {
    pathName = pathName.concat("/index.html");
    pathName = "/html".concat(pathName);
  }

  console.log(pathName);
  fs.readFile(__dirname + "/../.." + pathName, function(err, data){
    if(err){
      // Serve 404 page if page is not found
      fs.readFile(__dirname + "/../../html/404/index.html", function(e,d){
        if (e) {
          res.writeHead(404);
          res.write('Page Not Found' + JSON.stringify(err));
          res.end();
        } else {
          res.setHeader("Content-Type", mime.getType(__dirname + "/../../html/404.html"));
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
exports.server.listen(1337, '127.0.0.1');
console.log('Server running at https://127.0.0.1:1337/');

exports.close = function(callback: any) {
  exports.server.close(callback);
}