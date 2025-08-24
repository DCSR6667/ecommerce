const express = require("express");
const app = express();
const path = require("path");

const router = require("./router.js");
const db = require("./db.js");
const bodyParser = require("body-parser");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  ); // Allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
  next();
});

app.use(bodyParser.json());

app.use(
  "/static/images/",
  express.static(path.join(__dirname, "static", "images"))
);

// Serve static files from the client/build directory
app.use(express.static(path.join(__dirname, "static/build")));

app.use(router);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "static/build", "index.html"));
});

db.initDB((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(3001, () => {
      console.log("server is running on port 3001");
    });
  }
});
