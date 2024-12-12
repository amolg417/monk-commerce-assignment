import React, { useCallback, useState } from "react";
import NewProductVarient from "./NewProductVarient";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../slices/NewProductsSlice";

const NewProduct = ({
  item,
  index,
  handleAddMainProductCheckbox,
  productsToAdded,
}) => {
  const [variantsChecked, setVariantsChecked] = useState(new Set());
  const dispatch = useDispatch();

  const handleVariantToggle = useCallback((id) => {
    setVariantsChecked((prevSet) => {
      const newSet = new Set(prevSet); 
      if (newSet.has(id)) {
        newSet.delete(id); 
      } else {
        newSet.add(id); 
      }
      return newSet; 
    });
  }, []);

  const handleCheckBox = useCallback(
    (e, product_id, variant_id, currentItemIndex, newVariantsChecked) => {
      const isVariantsChecked = e.target.checked;
      const updatedChecked = new Set(newVariantsChecked);
      let updatedProductChecked = new Set(productsToAdded);
      
      handleAddMainProductCheckbox(product_id, isVariantsChecked);
      
      if (
        isVariantsChecked &&
        updatedChecked.size === 0 &&
        product_id &&
        !variant_id
      ) {
        setVariantsChecked(
          new Set(item?.variants?.map((variant) => variant.id))
        );
      } else if (
        !isVariantsChecked &&
        updatedChecked.size <= item?.variants?.length &&
        product_id &&
        !variant_id
      ) {
        setVariantsChecked(new Set());
      }
      if(updatedChecked.size===0){
        updatedProductChecked=new Set([])
      }
      dispatch(
        addProductToCart({
          product_id,
          variant_id,
          currentItemIndex,
          selectedVariants: updatedChecked,
          selectedProducts: updatedProductChecked,
        })
      );
    },
    [item?.variants,productsToAdded]
  );

  return (
    <div className="w-full ">
      <div className="w-full flex items-center gap-x-[1rem] border-b py-[0.5rem] px-[1.5rem]">
        <label className="container mr-[1rem]">
          <input
            type="checkbox"
            checked={productsToAdded.has(item.id)}
            onChange={(e) => handleCheckBox(e, item.id, null, index)}
          />
          <span className="checkmark"></span>
        </label>
        <img
          src={
            item?.image?.src ||
            "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
          }
          className="w-[2rem] aspect-square rounded-md object-cover"
        />
        <span className="text-[1rem] text-[#000]">{item?.title}</span>
      </div>
      <div className="w-full">
        {item?.variants?.map((item, itemIndex) => (
          <NewProductVarient
            key={item.id + itemIndex}
            variant={item}
            handleMainItemCheckBox={handleCheckBox}
            mainProductIndex={index}
            handleVariantToggle={handleVariantToggle}
            variantsChecked={variantsChecked}
          />
        ))}
      </div>
    </div>
  );
};

export default NewProduct;
