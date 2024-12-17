import React from "react";
import ProductListWrapper from "./ProductListWrapper";
import ProductModalContainer from "../ModalComponents/ProductModalContainer";

const ProductListContainer = () => {
  return (
    <div className="w-[60vw] min-h-full pl-[3vw] pt-[3vw] relative">
      <h3 className="fs-16 text-[#202223] font-[600] mb-[1vw]">Add Product</h3>
      <div className="w-[50vw] flex items-center gap-[21vw] mb-[1vw]">
        <span className="fs-14 font-[500] text-[#000]">Products</span>
        <span className="fs-14 font-[500] text-[#000]">Discount</span>
      </div>
      <ProductListWrapper />
      <ProductModalContainer />
    </div>
  );
};

export default ProductListContainer;
