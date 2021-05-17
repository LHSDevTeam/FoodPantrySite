import http = require('http');
import url = require('url');
import querystring = require('querystring');
import fs = require('fs');
import mime = require('mime');
const { MongoClient } = require("mongodb");


const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run_mongodb_client() {
  try {
    await client.connect();
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
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

run_mongodb_client().catch(console.dir);