import React, { useCallback, useMemo, useState } from "react";
import crossIcon from "../../assest/crossIcon.svg";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../slices/ProductsSlice";

const AddDiscount = React.memo(({ item, droppableId, mainProduct }) => {
  const [isAddingDiscount, setIsAddingDiscount] = useState(false);
  const dispatch = useDispatch();
  const handleButton = useCallback(() => {
    setIsAddingDiscount(true);
  }, []);

  const showCrossIcon = useMemo(() => {
    if (droppableId === "productList") return true;
    return mainProduct?.variants?.length > 1;
  }, [droppableId, mainProduct]);

  const handleDeleteItem = useCallback(() => {
    const itemData = {
      isVarient: droppableId !== "productList",
      product_id: droppableId === "productList" ? item?.id : mainProduct?.id,
      varient_id: item?.id,
    };
    dispatch(deleteItem(itemData));
  }, [droppableId, mainProduct, item]);

  return (
    <div className="flex items-center justify-end gap-x-[1.4vw]">
      {!isAddingDiscount ? (
        <button
          className="text-[#fff] bg-[#008060] fs-14 font-[600] px-[1vw] py-[0.2vw] rounded-sm"
          onClick={handleButton}
        >
          Add Discount
        </button>
      ) : (
        <>
          <input
            type="number"
            value={item?.discount}
            className={`w-[4.1vw] py-[0.3vw] px-[0.5vw] bg-[#fff] outline-none fs-14 ${
              droppableId !== "productList" ? "rounded-2xl px-[0.7vw]" : ""
            }`}
            style={{ boxShadow: "0px 2px 4px 0px #0000001A" }}
          />
          <select
            className={`py-[0.3vw] px-[0.5vw] bg-[#fff] outline-none fs-14 ${
              droppableId !== "productList" ? "rounded-2xl px-[0.7vw]" : ""
            }`}
            style={{ boxShadow: "0px 2px 4px 0px #0000001A" }}
            value={item?.type}
          >
            <option className="fs-14">% Off </option>
            <option className="fs-14">flat Off </option>
          </select>
          {showCrossIcon && (
            <img
              src={crossIcon}
              className="w-[1vw] cursor-pointer"
              alt="Remove"
              onClick={handleDeleteItem}
            />
          )}
        </>
      )}
    </div>
  );
});

export default AddDiscount;
