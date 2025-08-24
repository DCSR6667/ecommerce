const db = require("../db.js");
exports.get_products = (req, res, next) => {
  console.log("iam getting products");
  db.getDB()
    .collection("products")
    .find()
    .toArray()
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};
