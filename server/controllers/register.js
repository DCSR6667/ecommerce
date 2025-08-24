const db = require("../db.js");
exports.register = (req, res, next) => {
  const obj = req.body;
  db.getDB()
    .collection("register")
    .findOne({ email: obj.email })
    .then((result) => {
      if (result) {
        return res.json({ msg: "Email already exists" });
      } else {
        if (obj.password.length < 5) {
          return res.json({
            msg: "Please enter a strong password and password length should be atleast 5 characters",
          });
        }

        return db.getDB().collection("register").insertOne(obj);
      }
    })
    .then((result) => {
      return res.json({ msg: "success" });
    })
    .catch((err) => {
      console.error(err);
    });
};
