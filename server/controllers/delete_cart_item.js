const db = require("../db.js");
const { calculateTotalPrice } = require("../helpers/calculate_price.js");
const { ObjectId } = require("mongodb");
const { isthere } = require("../helpers/isthere.js");

exports.delete_cart_item = (req, res, next) => {
  db.getDB()
    .collection("register")
    .updateOne(
      { _id: new ObjectId(req.body._id) },
      { $pull: { cart: { id: req.body.id } } }
    )
    .then((result) => {
      db.getDB()
        .collection("register")
        .findOne({ _id: new ObjectId(req.body._id) })
        .then((result) => {
          var totalPrice = calculateTotalPrice(result.cart);
          res.json({ result: result["cart"], totalPrice });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  // db.getDB()
  //   .collection("cart")
  //   .deleteOne({ id: Number(req.params.id) })
  //   .then((result) => {
  //     db.getDB()
  //       .collection("cart")
  //       .find()
  //       .toArray()
  //       .then((result) => {
  //         var totalPrice = calculateTotalPrice(result);
  //         res.json({ result, totalPrice });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
