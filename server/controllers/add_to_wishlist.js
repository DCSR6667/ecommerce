const db = require("../db.js");
const { ObjectId } = require("mongodb");
const { isthere } = require("../helpers/isthere.js");

exports.add_to_wishlist = (req, res, next) => {
  const obj = req.body;

  db.getDB()
    .collection("register")
    .findOne({ _id: new ObjectId(obj._id) })
    .then((result) => {
      if (!isthere(obj.id, result.wishlist)) {
        db.getDB()
          .collection("register")
          .updateOne(
            { _id: new ObjectId(obj._id) },
            {
              $push: {
                wishlist: {
                  id: obj.id,
                  name: obj.name,
                  image: obj.image,
                  price: obj.price,
                  quantity: obj.quantity,
                },
              },
            }
          )
          .then((result) => {})
          .catch((err) => {
            console.log(err);
          });
      }
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};
