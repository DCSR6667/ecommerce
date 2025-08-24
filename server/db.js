const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require("dotenv").config();
// const url = process.env.MONGO_URI;
//process.env.MONGO_URL || "mongodb://mongodb:27017/ecommerce";
// "mongodb+srv://chandra:chandra@cluster0.9ye9jop.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const url =
  "mongodb+srv://chandra:chandra@cluster0.9ye9jop.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let _db;

const initDB = (callback) => {
  if (_db) {
    return callback(null, _db);
  }

  MongoClient.connect(url)
    .then((client) => {
      _db = client.db("ecommerce");
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDB = () => {
  if (!_db) {
    throw Error("something went wrong");
  }
  return _db;
};

module.exports = { initDB, getDB };
