exports.isthere = (id, cart) => {
  var i = 0;
  while (i < cart.length) {
    if (cart[i].id == id) {
      return true;
    }
    i += 1;
  }
  return false;
};
