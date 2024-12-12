import React from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";

const ProductModalContainer = () => {
  const isModalOpened = useSelector(
    (state) => state.newProducts.isAddingProducts
  );
  if (!isModalOpened) {
    return null;
  }
  return (
    <div className="w-full h-full flex items-center justify-center z-50 bg-[#0000004d] absolute top-0 left-0">
      <Modal />
    </div>
  );
};

export default ProductModalContainer;
