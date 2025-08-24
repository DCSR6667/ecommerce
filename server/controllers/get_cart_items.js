const db = require("../db.js");
const { calculateTotalPrice } = require("../helpers/calculate_price.js");
const { ObjectId } = require("mongodb");
exports.get_cart_items = (req, res, next) => {
  db.getDB()
    .collection("register")
    .findOne({ _id: new ObjectId(req.params.userid) })
    .then((result) => {
      var totalPrice = calculateTotalPrice(result.cart);
      res.json({ result: result["cart"], totalPrice });
    })
    .catch((err) => {
      console.log(err);
    });

  // db.getDB()
  //   .collection("cart")
  //   .find()
  //   .toArray()
  //   .then((result) => {
  //     var totalPrice = calculateTotalPrice(result);
  //     res.json({ result, totalPrice });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
