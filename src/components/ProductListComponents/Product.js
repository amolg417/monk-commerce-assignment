import React, { useCallback, useState } from "react";
import dragIcon from "../../assest/dragIcon.png";
import editIcon from "../../assest/editPencil.png";
import AddDiscount from "./AddDiscount.js";
import { Draggable } from "react-beautiful-dnd";
import ProductList from "./ProductList.js";
import ShowVarient from "./ShowVarient.js";
import { useDispatch } from "react-redux";
import { hangleModalVisibility } from "../../slices/NewProductsSlice.js";
const Product = ({ item, index, droppableId, parent = null }) => {
  const [showVarients, setShowVarients] = useState(false);
  const dispatch = useDispatch();

  const handleVarientButton = useCallback(() => {
    setShowVarients((prev) => !prev);
  }, []);
  const editProduct = useCallback((itemPosition) => {
    dispatch(hangleModalVisibility({ visibility: true, itemPosition }));
  }, []);

  return (
    <Draggable key={`${item.id}`} draggableId={`${item.id}`} index={index}>
      {(provided) => (
        <>
          <div
            className={`flex items-center justify-between ${
              droppableId !== "productList"
                ? "w-[90%] my-[1rem]"
                : "w-full my-[1rem]"
            }`}
            style={{ ...provided.draggableProps.style }}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div className="w-[60%] flex items-center gap-x-[1rem]">
              <img
                src={dragIcon}
                alt="dragIcon"
                className="w-[0.5rem] cursor-move"
                {...provided.dragHandleProps}
              />

              {droppableId === "productList" && (
                <span className="text-[0.9rem]">{index + 1}.</span>
              )}

              <div
                className={`${
                  droppableId === "productList"
                    ? "w-[70%]"
                    : "w-[70%] rounded-2xl"
                } py-[0.3rem] px-[1rem] bg-[#fff] flex items-center justify-between`}
                style={{ boxShadow: "0px 2px 4px 0px #0000001A" }}
              >
                <span className="text-[0.9rem] text-[#000] opacity-[0.5] font-[400]">
                  {item?.title?.length > 20
                    ? `${item?.title?.substring(0, 20)}...`
                    : item?.title}
                </span>
                {droppableId === "productList" && (
                  <img
                    src={editIcon}
                    alt="editPencil"
                    className="w-[1rem] cursor-pointer"
                    onClick={() => editProduct(index)}
                  />
                )}
              </div>
            </div>
            <div className="w-[40%]">
              <AddDiscount
                item={item}
                droppableId={droppableId}
                multiplevarients={item?.length}
                mainProduct={parent}
              />
            </div>
          </div>
          {droppableId === "productList" && item?.variants?.length ? (
            <ShowVarient
              showVarients={showVarients}
              handleVarientButton={handleVarientButton}
            />
          ) : (
            <></>
          )}
          <div
            className={`w-full overflow-hidden transition-all duration-[0.2s] ease-linear ${
              showVarients ? "max-h-[1000px]" : "max-h-0"
            }`}
          >
            <ProductList
              parent={item}
              products={item?.variants}
              droppableId={item.id}
              type="variant"
            />
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Product;
