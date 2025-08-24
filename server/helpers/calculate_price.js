exports.calculateTotalPrice = (cartItems) => {
  var i = 0;
  var totalPrice = 0;
  var math;
  while (i < cartItems.length) {
    math = parseInt(cartItems[i]["price"], 10) * cartItems[i]["quantity"];
    totalPrice = totalPrice + math;
    i += 1;
  }
  return totalPrice;
};
