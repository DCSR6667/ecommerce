import React, { useState, useEffect } from "react";
import css from "../../css/CartDisplay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { backendUrl } from "../../utils/url";
import { helper } from "../../utils/decode";

const WishListDisplay = () => {
  const [wishlistItems, setWishListItems] = useState([]);
  var login = helper();

  useEffect(() => {
    fetch(`${backendUrl}/get_wishlist_items/${login.id}`)
      .then((response) => response.json())
      .then((data) => {
        setWishListItems(data.result);
      })
      .catch((error) => {
        console.log("Error loading the JSON file:", error);
      });
  }, []);

  const moveItemToCart = (prod) => {
    fetch(`${backendUrl}/move_to_cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: prod.id,
        name: prod.name,
        image: prod.image,
        price: prod.price,
        quantity: prod.quantity,
        _id: login.id,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setWishListItems(data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = ({ id }) => {
    fetch(`${backendUrl}/delete_wishlist_item/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        _id: login.id,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setWishListItems(data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className={"row justify-content-center mt-3 " + css["cart_title"]}>
        <div className="col-3">WISH LIST ITEMS</div>
      </div>

      <div className="row justify-content-center">
        {wishlistItems.length !== 0 &&
          wishlistItems.map((item) => {
            return (
              <div className="col-7 mt-4 p-4 shadow">
                <div className="row">
                  <div className="col-4 shadow-sm p-3">
                    <img
                      src={backendUrl + item["image"]}
                      alt="loading"
                      style={{ width: "100%", height: "180px" }}
                    />
                  </div>

                  <div className="col-6" style={{ marginLeft: "26px" }}>
                    <div className={"row mt-4 " + css["name"]}>
                      <strong>{item["name"]}</strong>
                    </div>

                    <div className={"row mt-2 " + css["price"]}>
                      <strong>Price: ${item["price"]}</strong>
                    </div>

                    {/* <div className={'row mt-2 '+css['quantity']}>


                                    <div className={'col-5 '+css['quantity']}>
                                        Quantity: {item['quantity']}

                                    </div>


                                    <div className={'col-1 ml-1 '+css['plus']} onClick={() => increaseQuantity(item)}>

                                    <FontAwesomeIcon className={css['icon']} icon={faPlus} />

                                    </div>

                                    <div className={'col-1 ml-1 '+css['minus']} onClick={() => decreaseQuantity(item)}>

                                    <FontAwesomeIcon icon={faMinus} />

                                    </div>
                                            
                                    
                                </div> */}

                    <div className="row mt-4">
                      <div
                        className={"col-7 p-2 rounded " + css["move"]}
                        onClick={() => {
                          moveItemToCart(item);
                        }}
                        style={{ marginLeft: "20px" }}
                      >
                        MOVE TO CART
                      </div>

                      <div
                        className={"col-3 p-2 rounded " + css["delete"]}
                        onClick={() => {
                          deleteItem(item);
                        }}
                        style={{ marginLeft: "15px" }}
                      >
                        DELETE
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default WishListDisplay;
