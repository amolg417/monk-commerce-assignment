import React from "react";

const Actions = ({ selectedProducts, handleCloseButton, addProducts }) => {
  return (
    <div className="w-full py-[0.5vw] px-[1.5vw] flex items-center justify-between">
      <span className="fs-16">{selectedProducts?.size} product selected</span>
      <div className="h-full flex items-center gap-x-[1vw]">
        <buttun
          className=" fs-14 px-[1.5vw] py-[0.2vw] border border-[#00000066] rounded-md cursor-pointer"
          onClick={handleCloseButton}
        >
          Cancel
        </buttun>
        <buttun
          className="fs-14 px-[1.5vw] py-[0.2vw] border bg-[#008060] text-[#fff] rounded-md cursor-pointer"
          onClick={addProducts}
          disa
        >
          Add
        </buttun>
      </div>
    </div>
  );
};

export default Actions;
