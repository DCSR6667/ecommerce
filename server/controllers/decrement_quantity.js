const { ObjectId } = require("mongodb");
const db = require("../db.js");
const { calculateTotalPrice } = require("../helpers/calculate_price.js");
exports.decrement_quantity = (req, res, next) => {
  db.getDB()
    .collection("register")
    .updateOne(
      { _id: new ObjectId(req.body._id) },
      { $inc: { "cart.$[ele].quantity": -1 } },
      { arrayFilters: [{ "ele.id": req.body.id }] }
    )
    .then((result) => {
      db.getDB()
        .collection("register")
        .updateOne(
          { _id: new ObjectId(req.body._id) },
          { $pull: { cart: { quantity: { $lt: 1 } } } }
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
    })
    .catch((err) => {
      console.log(err);
    });
  // db.getDB()
  //   .collection("cart")
  //   .findOne({ id: Number(req.params.id) })
  //   .then((result) => {
  //     if (result.quantity <= 1) {
  //       db.getDB()
  //         .collection("cart")
  //         .deleteOne({ id: result.id })
  //         .then((result) => {
  //           db.getDB()
  //             .collection("cart")
  //             .find()
  //             .toArray()
  //             .then((result) => {
  //               var totalPrice = calculateTotalPrice(result);
  //               res.json({ result, totalPrice });
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     } else {
  //       db.getDB()
  //         .collection("cart")
  //         .updateOne({ id: Number(req.params.id) }, { $inc: { quantity: -1 } })
  //         .then((result) => {
  //           db.getDB()
  //             .collection("cart")
  //             .find()
  //             .toArray()
  //             .then((result) => {
  //               var totalPrice = calculateTotalPrice(result);
  //               res.json({ result, totalPrice });
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
