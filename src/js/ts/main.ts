import http = require('http');
import fs = require('fs');
import mime = require('mime');
import mongoose = require("mongoose");
import bcrypt = require('bcrypt');
import jsonBody = require('body/json');
import Joi = require('joi');

var Schema = mongoose.Schema;

// mongodb client, used for accessing the database
async function runMongodbClient() {
  const secretsFile = fs.readFileSync("./secrets.json");
  const secrets = JSON.parse(secretsFile.toString());
  mongoose.connect("mongodb+srv://" + secrets.username + ":" + secrets.password +"@web1.c3ofa.mongodb.net/jhfp?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}).then(
    () => {
      console.info('\x1b[36m%s\x1b[0m', "Connected to MongoDB Database")
    },
    err => {
      console.error('\x1b[31m%s\x1b[0m', err);
    }
  );
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
  jsonBody(req, res, function (err, body) {
    if (err) {
      res.statusCode = 500;
      res.end();
    } else {
      if (pathName == "/signup") {
        signUp(body, res, POSTcallback);
      } else if (pathName == "/login") {
        logIn(body, res, POSTcallback);
      }
    }      
  });
}

function POSTcallback(res, response) {
  if (response.error) {
    res.statusCode = 400;
    res.write(JSON.stringify(response));
    res.end();
  } else {
    res.statusCode = 200;
    res.write(JSON.stringify(response));
    res.end();
  }
}

function handleDELETE(pathName, req, res) {

}

function handlePUT(pathName, req, res) {

}

// checks if a user exists, needed for checking if a user name is valid when signing up
function userExists() {

}

interface Item {
  id: number;
  name: string;
  description: string;
  nutrition: string;
}

interface Quantity {
  item_id: number;
  number: number;
}

interface Transaction {
  date: Date;
  items: [Quantity];
}

const UserSignUpValidationSchema = Joi.object({
  fname: Joi.string().max(36).pattern(/[a-zA-Z]/).required(),
  lname: Joi.string().max(36).pattern(/[a-zA-Z]/).required(),
  email: Joi.string().max(256).email().required(),
  password: Joi.string().max(128).required()
});

const UserLogInValidationSchema = Joi.object({
  email: Joi.string().max(256).email().required(),
  password: Joi.string().max(128).required()
});

export interface IUser extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  email: String;
  fname: String;
  lname: String;
  hash: String;
  history: [Transaction];
}

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  fname: String,
  lname: String,
  hash: String,
  history: []
});

UserSchema.pre<IUser>("save", function (next) {
  if (this.isModified("hash") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        console.error('\x1b[31m%s\x1b[0m', saltError);
        return next(saltError);
      } else {
        bcrypt.hash(this.hash, salt, function(hashError, hash) {
          if (hashError) {
            console.error('\x1b[31m%s\x1b[0m', hashError);
            return next(hashError);
          }
          this.hash = hash;
          next();
        })
      }
    })
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, (this as IUser).hash, function(err, isMatch) {
    if (err) {
      return callback(err);
    } else {
      callback(null, isMatch);
    }
  });
}

var User = mongoose.model('Users', UserSchema);

// Firsts validates sign up info and then creates a new account
function signUp(body, res, callback) {
  let validation = UserSignUpValidationSchema.validate(body);
  if (validation.error) {
    console.error('\x1b[31m%s\x1b[0m', validation);
    let error = { error: "Form Sent is Invalid, Reload or Contact Your Adminstrator" };
    callback(res, error);
  } else {
    User.countDocuments({email: validation.value.email}, function (err, count){
      if (err) {
        let error = { error: "Could Not Check Database, Reload or Contact Your Administrator" };
        console.error('\x1b[31m%s\x1b[0m', error);
        callback(res, error);
      }
      if (count == 0) {
        var newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          email: validation.value.email,
          fname: validation.value.fname,
          lname: validation.value.lname,
          hash: validation.value.password,
          history: []
        });

        newUser.save(function (err) {
          if (err) {
            let error = { error: "Could Not Save New User, Reload or Contact Administrator" };
            console.error('\x1b[31m%s\x1b[0m', error);
            callback(res, error);
          }
        });
        console.trace("Sign Up Successful: " + newUser);
        callback(res, "Sign Up Successful");
      } else {
        let error = {error: "Username Already Exists"}
        console.error('\x1b[31m%s\x1b[0m', error);
        callback(res, error);
      }
    });
  }
}

function logIn(body, res, callback) {
  let validation = UserLogInValidationSchema.validate(body);
  if (validation.error) {
    console.error('\x1b[31m%s\x1b[0m', validation);
    let error = { error: "Form Sent is Invalid, Reload or Contact Your Adminstrator" };
    callback(res, error);
  } else {
    User.findOne({email: validation.value.email}, function(err, user) {
      if (err) {
        let error = {error: "Could Not Search For User"}
        console.error('\x1b[31m%s\x1b[0m', error);
        callback(res, error);
      } else if (!user) {
        let error = {error: "Could Not Find User"}
        console.error('\x1b[31m%s\x1b[0m', error);
        callback(res, error);
      } else {
        user.comparePassword(validation.value.password, function(matchError, isMatch) {
          if (matchError) {
            let error = {error: "Could Not Confirm Password Matches"}
            console.error('\x1b[31m%s\x1b[0m', error);
            callback(res, error)
          } else if (!isMatch) {
            let error = {error: "Incorrect Password"}
            console.error('\x1b[31m%s\x1b[0m', error);
            callback(res, error)
          } else {
            console.trace("Logged In User: " + validation.value.email);
            callback(res, "Log In Successful")
          }
        });
      }
    });
  }
}

exports.server.listen(1337, '127.0.0.1');
runMongodbClient();
console.info('\x1b[36m%s\x1b[0m', "Server running at http://127.0.0.1:1337/");

exports.close = function(callback: any) {
  exports.server.close(callback);
}