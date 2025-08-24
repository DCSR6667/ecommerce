import css from "../../css/ProductsDisplay.module.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { backendUrl } from "../../utils/url";

const ProductsDisplay = ({ products, helper }) => {
  return (
    <div className="container mt-3 border shadow-sm p-3 pb-5">
      <div className="row p-3">
        <div className="col-4 mb-2 " style={{ marginLeft: "450px" }}>
          <form>
            <input
              onChange={(event) => {
                helper(event.target.value);
              }}
              className={css["input"]}
              placeholder="Search By Price ($)"
              type="text"
              name="input_price"
            />
          </form>
        </div>
      </div>

      <div className="row">
        {/* First Column */}

        {products.map((product) => {
          return (
            <div
              className="col-3 shadow-sm p-3 border mb-3"
              style={{ marginLeft: "70px" }}
            >
              <Link
                className={css["link"]}
                to={`/product_details/${encodeURIComponent(
                  JSON.stringify(product)
                )}`}
              >
                <div className="row p-1">
                  <div className="col-12 mt-2">
                    <img
                      className={css["img"] + " rounded"}
                      src={backendUrl + product.image}
                      style={{ width: "100%", height: "280px" }}
                      alt="dummy-img"
                    />
                  </div>
                  <div className={"col-12 mt-2 " + css["name_price"]}>
                    {product.name}
                  </div>
                  <div className={"col-12 mt-2 " + css["name_price"]}>
                    ${product.price}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsDisplay;
