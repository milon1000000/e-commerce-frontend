import React, { useContext } from "react";
import { userDataContext } from "../context/userContext";
import { useParams } from "react-router-dom";
import ProductImg from "../components/ProductImg";
import ProductDes from "../components/ProductDes";
import Navbar from "../components/ui/Navbar";

function SingleProduct() {
  const { id } = useParams();
  const { productData } = useContext(userDataContext);

  const singleProduct = productData?.find((item) => item._id === id);

  if (!singleProduct) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="pt-20 py-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <ProductImg images={singleProduct.productImg} />
          <ProductDes product={singleProduct} />
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
