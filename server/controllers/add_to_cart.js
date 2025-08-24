const db = require("../db.js");
const { ObjectId } = require("mongodb");
const { isthere } = require("../helpers/isthere.js");

exports.add_to_cart = (req, res, next) => {
  const obj = req.body;

  db.getDB()
    .collection("register")
    .findOne({ _id: new ObjectId(obj._id) })
    .then((result) => {
      if (isthere(obj.id, result.cart)) {
        db.getDB()
          .collection("register")
          .updateOne(
            { _id: new ObjectId(obj._id) },
            { $inc: { "cart.$[ele].quantity": 1 } },
            { arrayFilters: [{ "ele.id": obj.id }] }
          )
          .then((result) => {
            res.json({ result });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        db.getDB()
          .collection("register")
          .updateOne(
            { _id: new ObjectId(obj._id) },
            {
              $push: {
                cart: {
                  id: obj.id,
                  name: obj.name,
                  image: obj.image,
                  price: obj.price,
                  quantity: obj.quantity,
                },
              },
            }
          )
          .then((result) => {
            res.json({ result });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
