import React from "react";
import ProductListWrapper from "./ProductListWrapper";
import ProductModalContainer from "../ModalComponents/ProductModalContainer";

const ProductListContainer = () => {
  return (
    <div className="w-[60%] h-full pl-[3rem] relative">
      <h3 className="text-[1rem] text-[#202223] font-[600] mb-[1rem]">
        Add Product
      </h3>
      <div className="w-[50%] flex items-center justify-between mb-[1rem]">
        <span className="text-[0.9rem] font-[500] text-[#000]">Products</span>
        <span className="text-[0.9rem] font-[500] text-[#000]">Discount</span>
      </div>
      <ProductListWrapper />
      <ProductModalContainer />
    </div>
  );
};

export default ProductListContainer;
