const db = require("../db.js");
const jwt = require("jsonwebtoken");
exports.login = (req, res, next) => {
  const obj = req.body;
  db.getDB()
    .collection("register")
    .findOne({ email: obj.email })
    .then((result) => {
      if (result == null) {
        return res.json({ msg: "invalid email" });
      } else {
        return db
          .getDB()
          .collection("register")
          .findOne({ email: obj.email, password: obj.password });
      }
    })
    .then((result) => {
      if (result == null) {
        return res.json({ msg: "invalid password" });
      } else {
        const payload = {
          name: result.name,
          email: result.email,
          password: result.password,
          id: result._id,
        };
        const token = jwt.sign(payload, "secret", { expiresIn: "1h" });
        return res.json({ token: token, msg: "success" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
