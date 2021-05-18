import http = require('http');
import fs = require('fs');
import mime = require('mime');
import mongoose = require("mongoose");
import bcrypt = require('bcrypt');
import jsonBody = require('body/json');

var Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String
});

module.exports = userSchema;

const saltRounds = 10;

userSchema.methods.generateHash = function(password) {
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      console.log(err);
      return err;
    }

  });
}



// mongodb client, used for accessing the database
async function run_mongodb_client() {
  let secrets = require("./secrets.json");
  try {
      await mongoose.connect("mongodb+srv://" + secrets.username + ":" + secrets.password +"@web1.c3ofa.mongodb.net/jhfp?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
  } catch (err) {
    console.log(err);
    return err;
  }

}

exports.server = http.createServer(function (req, res) {
  const baseURL = "http://" + req.headers.host + "/";
  let pathName = new URL(req.url, baseURL).pathname;

  if (req.method == "GET") {
    handleGET(pathName, req, res);
  } else if (req.method == "POST") {
    handlePOST(pathName, req, res);
  } else if (req.method == "DELETE") {
    handleDELETE(pathName, req, res);
  } else if (req.method == "PUT") {
    handlePUT(pathName, req, res);
  } else {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(404);
    res.write('{"error": "Method is not of GET, POST, DELETE, or PUT"}');
    res.end();
  }
});

function handleGET(pathName, req, res) {
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
}

function handlePOST(pathName, req, res) {
  if (pathName == "/signup") {
    jsonBody(req, res, function (err, body) {
      if (err) {
        res.statusCode = 500;
        return res.end();
      }
      res.setHeader("content-type", "application/json");
      
      res.end(JSON.stringify(body));
    });
  }
}

function handleDELETE(pathName, req, res) {

}

function handlePUT(pathName, req, res) {

}

function userExists() {

}

function signUp(body) {
  
}

exports.server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

exports.close = function(callback: any) {
  exports.server.close(callback);
}