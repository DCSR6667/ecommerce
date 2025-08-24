import Navbar from "../Navbar";
import React, { useEffect, useState } from "react";
import ProductsDisplay from "./ProductsDisplay";
import { useParams } from "react-router-dom";
import { backendUrl } from "../../utils/url";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/get_products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.result);
      })
      .catch((error) => {
        console.log("Error loading the data ", error);
      });
  }, []);

  const helper = (input_price) => {
    fetch(`${backendUrl}/get_products`)
      .then((response) => response.json())
      .then(({ result }) => {
        result = result.filter((product) => {
          if (
            input_price === "" ||
            Number(product.price) <= Number(input_price)
          ) {
            return true;
          } else {
            return false;
          }
        });

        setProducts(result);
      })
      .catch((error) => {
        console.log("Error loading the data:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <ProductsDisplay products={products} helper={helper} />
    </div>
  );
};

export default ProductList;
