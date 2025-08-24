const express = require("express");
const router = express.Router();
const { get_products } = require("./controllers/get_products.js");
const { get_cart_items } = require("./controllers/get_cart_items.js");
const { get_wishlist_items } = require("./controllers/get_wishlist_items.js");
const { add_to_cart } = require("./controllers/add_to_cart.js");
const { add_to_wishlist } = require("./controllers/add_to_wishlist.js");
const { increment_quantity } = require("./controllers/increment_quantity.js");
const { decrement_quantity } = require("./controllers/decrement_quantity.js");
const { delete_cart_item } = require("./controllers/delete_cart_item.js");
const {
  delete_wishlist_item,
} = require("./controllers/delete_wishlist_item.js");
const { move_to_wishlist } = require("./controllers/move_to_wishlist.js");
const { move_to_cart } = require("./controllers/move_to_cart.js");
const { register } = require("./controllers/register.js");
const { login } = require("./controllers/login.js");
const { update_info } = require("./controllers/update_info.js");

router.get("/get_products", get_products);

router.get("/get_cart_items/:userid", get_cart_items);
router.get("/get_wishlist_items/:userid", get_wishlist_items);
router.post("/add_to_cart", add_to_cart);
router.post("/add_to_wishlist", add_to_wishlist);
router.post("/register", register);
router.post("/login", login);
router.post("/update_info", update_info);

router.patch("/increment_quantity/", increment_quantity);
router.patch("/decrement_quantity/", decrement_quantity);

router.delete("/delete_cart_item/", delete_cart_item);
router.delete("/delete_wishlist_item/", delete_wishlist_item);
router.delete("/move_to_wishlist", move_to_wishlist);
router.delete("/move_to_cart", move_to_cart);
module.exports = router;
