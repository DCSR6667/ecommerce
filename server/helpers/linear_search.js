exports.linear_search = (arr) => {
  var i = 0;
  var oldpass = false,
    newpass = false;
  while (i < arr.length) {
    if (arr[i] == "old_password") {
      oldpass = true;
    }
    if (arr[i] == "new_password") {
      newpass = true;
    }
    if (newpass && oldpass) {
      return true;
    }
    i += 1;
  }
  return false;
};
