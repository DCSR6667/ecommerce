exports.filter_body = (body) => {
  Object.keys(body).forEach((key) => {
    if (body[key].length === 0 || key == "_id") {
      delete body[key];
    }
  });
  return body;
};
