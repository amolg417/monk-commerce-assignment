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
      product_id:droppableId === "productList"?item?.id:mainProduct?.id,
      varient_id:item?.id,
    };
    dispatch(deleteItem(itemData));
  }, [droppableId,mainProduct,item]);

  return (
    <div className="flex items-center justify-end gap-x-[1.4rem]">
      {!isAddingDiscount ? (
        <button
          className="text-[#fff] bg-[#008060] text-[0.9] font-[600] px-[1rem] py-[0.2rem] rounded-sm"
          onClick={handleButton}
        >
          Add Discount
        </button>
      ) : (
        <>
          <input
            type="number"
            value={item?.discount}
            className={`w-[4rem] py-[0.3rem] px-[0.5rem] bg-[#fff] outline-none text-[0.9rem] ${
              droppableId !== "productList" ? "rounded-2xl px-[0.7rem]" : ""
            }`}
            style={{ boxShadow: "0px 2px 4px 0px #0000001A" }}
          />
          <select
            className={`py-[0.3rem] px-[0.5rem] bg-[#fff] outline-none text-[0.9rem] ${
              droppableId !== "productList" ? "rounded-2xl px-[0.7rem]" : ""
            }`}
            style={{ boxShadow: "0px 2px 4px 0px #0000001A" }}
            value={item?.type}
          >
            <option>% Off </option>
            <option>flat Off </option>
          </select>
          {showCrossIcon && (
            <img
              src={crossIcon}
              className="w-[8%] cursor-pointer"
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
