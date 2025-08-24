const db = require("../db.js");
const { ObjectId } = require("mongodb");
exports.get_wishlist_items = (req, res, next) => {
  db.getDB()
    .collection("register")
    .findOne({ _id: new ObjectId(req.params.userid) })
    .then((result) => {
      res.json({ result: result["wishlist"] });
    })
    .catch((err) => {
      console.log(err);
    });
  // db.getDB()
  //   .collection("wishlist")
  //   .find()
  //   .toArray()
  //   .then((result) => {
  //     res.json({ result });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
