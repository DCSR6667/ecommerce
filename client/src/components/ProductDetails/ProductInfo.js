import { Link } from "react-router-dom";
import css from "../../css/ProductInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../utils/url";
import { helper } from "../../utils/decode";

const ProductInfo = ({ product }) => {
  const navigate = useNavigate();

  const addToCart = (product) => {
    var login = helper();

    var msg = "please login to add items to cart";
    if (login == null) {
      navigate("/login/" + msg);
      return;
    }

    var obj = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      _id: login.id,
    };

    fetch(`${backendUrl}/add_to_cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((result) => {
        navigate("/cart");
      })
      .catch((err) => {
        console.log(err);
      });
    // var cartItems = JSON.parse(localStorage.getItem("cartItems"));

    // if (cartItems == null) {
    //   var obj = {
    //     id: product.id,
    //     name: product.name,
    //     image: product.image,
    //     price: product.price,
    //     quantity: 1,
    //   };
    //   localStorage.setItem("cartItems", JSON.stringify([obj]));
    // } else {
    //   var flag = 0;

    //   var i = 0;
    //   while (i < cartItems.length) {
    //     if (product.id === cartItems[i].id) {
    //       cartItems[i]["quantity"] += 1;
    //       flag = 1;
    //       localStorage.setItem("cartItems", JSON.stringify(cartItems));
    //     }
    //     i += 1;
    //   }

    //   if (flag == 0) {
    //     var obj = {
    //       id: product.id,
    //       name: product.name,
    //       image: product.image,
    //       price: product.price,
    //       quantity: 1,
    //     };

    //     var new_array = [...cartItems, obj];
    //     localStorage.removeItem("cartItems");
    //     localStorage.setItem("cartItems", JSON.stringify(new_array));
    //   }
    // }

    // navigate("/cart");
  };

  const wishlist = (product) => {
    var login = helper();
    var msg = "please login to add items to wishlist";
    if (login == null) {
      navigate("/login/" + msg);
      return;
    }
    var obj = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      _id: login.id,
    };

    fetch(`${backendUrl}/add_to_wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((result) => {
        navigate("/wish_list");
      })
      .catch((err) => {
        console.log(err);
      });
    // var wishlistItems = JSON.parse(localStorage.getItem("wishlistItems"));

    // if (wishlistItems == null) {
    //   var obj = {
    //     id: product.id,
    //     name: product.name,
    //     image: product.image,
    //     price: product.price,
    //     quantity: 1,
    //   };
    //   localStorage.setItem("wishlistItems", JSON.stringify([obj]));
    // } else {
    //   var flag = 0;

    //   var i = 0;
    //   while (i < wishlistItems.length) {
    //     if (product.id === wishlistItems[i].id) {
    //       wishlistItems[i]["quantity"] += 1;
    //       flag = 1;
    //       localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    //     }
    //     i += 1;
    //   }

    //   if (flag == 0) {
    //     var obj = {
    //       id: product.id,
    //       name: product.name,
    //       image: product.image,
    //       price: product.price,
    //       quantity: 1,
    //     };

    //     var new_array = [...wishlistItems, obj];
    //     localStorage.removeItem("wishlistItems");
    //     localStorage.setItem("wishlistItems", JSON.stringify(new_array));
    //   }
    // }

    // navigate("/wish_list");
  };

  return (
    <div className="container mt-5 p-4 shadow">
      <div className="row">
        <div className="col-4 shadow-sm p-3">
          <img
            src={backendUrl + product.image}
            style={{ width: "100%", height: "450px" }}
            alt="loading"
          />
        </div>

        <div className={"col-6 " + css["box"]}>
          <div className={"row p-3 border-bottom " + css["name"]}>
            {product.name}
          </div>

          <div className={"row p-3 " + css["des"]}>{product.description}</div>

          <div className={"row p-3  " + css["price"]}>
            Price: ${product.price}
          </div>

          <div className="row p-3">
            <div
              className="col-4 p-2 rounded"
              style={{
                marginLeft: "10px",
                textAlign: "center",
                backgroundColor: "#2c3e50",
              }}
            >
              <div
                onClick={() => {
                  addToCart(product);
                }}
                className={css["link"]}
              >
                <span className={css["span"]}>
                  <FontAwesomeIcon icon={faCartPlus} />{" "}
                </span>{" "}
                Add to Cart
              </div>
            </div>

            <div
              className="col-4 p-2 rounded"
              style={{
                marginLeft: "10px",
                textAlign: "center",
                backgroundColor: "#2c3e50",
              }}
            >
              <div
                onClick={() => {
                  wishlist(product);
                }}
                className={css["link"]}
              >
                <span className={css["span"]}>
                  <FontAwesomeIcon icon={faHeart} />
                </span>{" "}
                Wish List
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
