require("dotenv").config("../.env");
const functions = require("firebase-functions");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = process.env.LOCAL_PORT || 1111;

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

server.listen(port, () => {
  console.log(`listening on *: ${port}`);
});

require("./socket")(server);

exports.api = functions.https.onRequest(server);
