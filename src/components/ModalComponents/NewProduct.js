import React, { useCallback, useState } from "react";
import NewProductVarient from "./NewProductVarient";
import { useDispatch } from "react-redux";
import {
  addProductToCart,
  toggleProductSelection,
} from "../../slices/NewProductsSlice";
import { useSelector } from "react-redux";

const NewProduct = ({ product }) => {
  const allVariants = product.variants;
  const dispatch = useDispatch();
  const selectedProducts = useSelector(
    (state) => state.newProducts.selectedProducts
  );
  const isProductSelected = selectedProducts.has(product.id);
  const selectedVariants = selectedProducts.get(product.id) || new Set();
  const handleProductChange = (productId, variants) => {
    dispatch(toggleProductSelection({ productId, allVariants: variants }));
  };

  return (
    <div className="w-full ">
      <div className="w-full flex items-center gap-x-[1vw] border-b py-[0.5vw] px-[1.4vw]">
        <label className="container mr-[1vw]">
          <input
            type="checkbox"
            checked={isProductSelected}
            onChange={() => handleProductChange(product.id, product?.variants)}
          />
          <span className="checkmark"></span>
        </label>
        <img
          src={
            product?.image?.src ||
            "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
          }
          className="w-[2.5vw] aspect-square rounded-md object-cover"
        />
        <span className="fs-16 text-[#000]">{product?.title}</span>
      </div>
      <div className="w-full">
        {allVariants?.map((item) => (
          <NewProductVarient
            key={item.id}
            variant={item}
            allVariants={allVariants}
            productId={product.id}
            selectedVariants={selectedVariants}
          />
        ))}
      </div>
    </div>
  );
};

export default NewProduct;
