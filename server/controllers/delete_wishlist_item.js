const db = require("../db.js");
const { ObjectId } = require("mongodb");
const { isthere } = require("../helpers/isthere.js");

exports.delete_wishlist_item = (req, res, next) => {
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
          res.json({ result: result["wishlist"] });
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
  //   .deleteOne({ id: Number(req.params.id) })
  //   .then((result) => {
  //     db.getDB()
  //       .collection("wishlist")
  //       .find()
  //       .toArray()
  //       .then((result) => {
  //         res.json({ result });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
