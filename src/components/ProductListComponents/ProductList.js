import React from "react";
import Product from "./Product";
import { Droppable } from "@hello-pangea/dnd";

const ProductList = React.memo(({ products, droppableId, type, parent }) => {
  return (
    <Droppable droppableId={`${droppableId}`} direction="vertical" type={type}>
      {(provided) => (
        <div
          className={`${
            droppableId === "productList" ? "w-full" : "w-full"
          } h-full flex-col flex items-end overflow-y-auto overflow-x-hidden`}
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
});

export default ProductList;
