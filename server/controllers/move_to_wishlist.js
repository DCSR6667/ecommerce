const db = require("../db.js");
const { calculateTotalPrice } = require("../helpers/calculate_price.js");
const { ObjectId } = require("mongodb");
const { isthere } = require("../helpers/isthere.js");

exports.move_to_wishlist = (req, res, next) => {
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
          if (!isthere(req.body.id, result.wishlist)) {
            db.getDB()
              .collection("register")
              .updateOne(
                { _id: new ObjectId(req.body._id) },
                {
                  $push: {
                    wishlist: {
                      id: req.body.id,
                      name: req.body.name,
                      image: req.body.image,
                      price: req.body.price,
                      quantity: req.body.quantity,
                    },
                  },
                }
              )
              .then((result) => {})
              .catch((err) => {
                console.log(err);
              });
          }

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
  //   .collection("wishlist")
  //   .findOne({ id: req.body.id })
  //   .then((result) => {
  //     if (result == null) {
  //       db.getDB()
  //         .collection("wishlist")
  //         .insertOne(req.body)
  //         .then((result) => {})
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     } else {
  //     }

  //     db.getDB()
  //       .collection("cart")
  //       .deleteOne({ id: Number(req.body.id) })
  //       .then((result) => {
  //         db.getDB()
  //           .collection("cart")
  //           .find()
  //           .toArray()
  //           .then((result) => {
  //             var totalPrice = calculateTotalPrice(result);
  //             res.json({ result, totalPrice });
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
