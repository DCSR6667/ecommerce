import Navbar from "../Navbar.js";
import WishListDisplay from "./WishListDisplay.js";
import { helper } from "../../utils/decode.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const WishList = () => {
  const navigate = useNavigate();
  var login = helper();
  useEffect(() => {
    if (login == null) {
      var msg = "please login to view wishlist items";
      navigate("/login/" + msg);
    }
  }, []);
  return (
    <div>
      <Navbar />
      {login != null && <WishListDisplay />}
    </div>
  );
};

export default WishList;
