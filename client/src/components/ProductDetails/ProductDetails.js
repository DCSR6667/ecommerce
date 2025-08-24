import ProductInfo from "./ProductInfo.js";
import Navbar from "../Navbar.js";
import { useParams } from "react-router-dom";
const ProductDetails = () => {
  const { product } = useParams();
  var parseddata = JSON.parse(decodeURIComponent(product));

  return (
    <div>
      <Navbar />
      <ProductInfo product={parseddata} />
    </div>
  );
};

export default ProductDetails;
