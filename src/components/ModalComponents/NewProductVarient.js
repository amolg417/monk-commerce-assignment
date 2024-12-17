import React, { useCallback, useMemo } from "react";
import { toggleVariantSelection } from "../../slices/NewProductsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const NewProductVarient = ({
  variant,
  productId,
  allVariants,
  selectedVariants,
}) => {
  const dispatch = useDispatch();
  const handleVariantChange = useCallback((productId, variantId, variants) => {
    dispatch(
      toggleVariantSelection({ productId, variantId, allVariants: variants })
    );
  }, []);

  return (
    <div className="w-full flex items-center justify-between border-b py-[0.7vw] pl-[4.8vw] pr-[1.5vw]">
      <div className="flex items-center gap-x-[1vw]">
        <label className="container mr-[1vw]">
          <input
            type="checkbox"
            checked={selectedVariants.has(variant.id)}
            onChange={() =>
              handleVariantChange(productId, variant.id, allVariants)
            }
          />
          <span className="checkmark"></span>
        </label>
        <span className="fs-16 text-[#000]">{variant?.title}</span>
      </div>
      <div className="flex items-center gap-x-[1vw]">
        <span className="fs-16 text-[#000]">99 available</span>
        <span className="fs-16 text-[#000]">${variant?.price}</span>
      </div>
    </div>
  );
};

export default NewProductVarient;
