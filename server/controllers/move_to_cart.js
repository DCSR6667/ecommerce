const db = require("../db.js");
const { ObjectId } = require("mongodb");
const { isthere } = require("../helpers/isthere.js");

exports.move_to_cart = (req, res, next) => {
  db.getDB()
    .collection("register")
    .updateOne(
      { _id: new ObjectId(req.body._id) },
      { $pull: { wishlist: { id: req.body.id } } }
    )
    .then((result) => {
      db.getDB()
        .collection("register")
        .findOne({ _id: new ObjectId(req.body._id) })
        .then((result) => {
          if (!isthere(req.body.id, result.cart)) {
            db.getDB()
              .collection("register")
              .updateOne(
                { _id: new ObjectId(req.body._id) },
                {
                  $push: {
                    cart: {
                      id: req.body.id,
                      name: req.body.name,
                      image: req.body.image,
                      price: req.body.price,
                      quantity: 1,
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
              res.json({ result: result["wishlist"] });
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
  //   .findOne({ id: req.body.id })
  //   .then((result) => {
  //     if (result == null) {
  //       db.getDB()
  //         .collection("cart")
  //         .insertOne(req.body)
  //         .then((result) => {})
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     } else {
  //     }

  //     db.getDB()
  //       .collection("wishlist")
  //       .deleteOne({ id: Number(req.body.id) })
  //       .then((result) => {
  //         db.getDB()
  //           .collection("wishlist")
  //           .find()
  //           .toArray()
  //           .then((result) => {
  //             res.json({ result });
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
