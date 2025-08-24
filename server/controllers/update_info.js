const db = require("../db.js");
const { ObjectId } = require("mongodb");
const { filter_body } = require("../helpers/filter_body.js");
const { linear_search } = require("../helpers/linear_search.js");
exports.update_info = (req, res, next) => {
  db.getDB()
    .collection("register")
    .findOne({ _id: new ObjectId(req.body._id) })
    .then((result) => {
      var newbody = filter_body({ ...req.body });

      var needtoupdate = { ...result, ...newbody };
      console.log(needtoupdate);

      if (linear_search(Object.keys(needtoupdate))) {
        if (needtoupdate.password === needtoupdate.old_password) {
          db.getDB()
            .collection("register")
            .updateOne(
              { _id: new ObjectId(req.body._id) },
              { $set: { password: needtoupdate.new_password } }
            )
            .then((result) => {})
            .catch((err) => {
              console.log(err);
            });
        } else {
          return res.json({
            msg: "incorrect password updation failed",
            data: null,
          });
        }
      }

      db.getDB()
        .collection("register")
        .updateOne(
          { _id: new ObjectId(req.body._id) },
          { $set: { name: needtoupdate.name, email: needtoupdate.email } }
        )
        .then((result) => {
          db.getDB()
            .collection("register")
            .findOne({ _id: new ObjectId(req.body._id) })
            .then((result) => {
              return res.json({ msg: "updated successfully", data: result });
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
};
