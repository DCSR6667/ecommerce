import Navbar from "../Navbar";
import CartDisplay from "./CartDisplay";
import { useNavigate } from "react-router-dom";
import { helper } from "../../utils/decode";
import { useEffect } from "react";

const Cart = () => {
  const navigate = useNavigate();
  var login = helper();

  useEffect(() => {
    if (login == null) {
      var msg = "please login to view cart items";
      navigate("/login/" + msg);
    }
  }, []);

  return (
    <div>
      <Navbar />
      {login != null && <CartDisplay />}
    </div>
  );
};

export default Cart;
