import React from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";

const ProductModalContainer = () => {
  const isModalOpened = useSelector(
    (state) => state.newProducts.isAddingProducts
  );
  if (!isModalOpened) {
    return <></>;
  }
  return (
    <div className="w-full min-h-screen h-full p-[1vw] flex items-center justify-center z-50 bg-[#0000004d] absolute top-0 left-0">
      <Modal />
    </div>
  );
};

export default ProductModalContainer;
