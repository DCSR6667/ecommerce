import { jwtDecode } from "jwt-decode";
export const helper = () => {
  var token = localStorage.getItem("login");
  var decodedtoken = null;

  if (token != null) {
    try {
      if (decodedtoken != null) {
        return decodedtoken;
      }

      decodedtoken = jwtDecode(token);
    } catch (err) {
      console.log(err);
    }

    return decodedtoken;
  }
  return null;
};
