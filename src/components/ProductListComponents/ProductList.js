import React from "react";
import Product from "./Product";
import { Droppable } from "react-beautiful-dnd";

const ProductList = ({ products, droppableId, type, parent }) => {
  return (
    <Droppable droppableId={`${droppableId}`} direction="vertical" type={type}>
      {(provided) => (
        <div
          className={`${
            droppableId === "productList" ? "w-full" : "w-full"
          } h-full flex-col flex items-end`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {products?.map((item, index) => (
            <Product
              key={item.id}
              item={item}
              index={index}
              droppableId={droppableId}
              parent={parent}
            />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ProductList;
