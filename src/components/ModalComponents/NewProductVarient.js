import React, { useCallback, useMemo } from "react";

const NewProductVarient = ({
  variant,
  handleMainItemCheckBox,
  mainProductIndex,
  handleVariantToggle,
  variantsChecked,
}) => {
  const handleVarientCheckbox = useCallback(
    (variant_id, index) => {
      handleVariantToggle(variant_id);
      const updatedChecked = new Set(variantsChecked);
      if (updatedChecked.has(variant_id)) {
        updatedChecked.delete(variant_id);
      } else {
        updatedChecked.add(variant_id);
      }
      const isAnyVariantChecked = updatedChecked.size > 0;
console.log({isAnyVariantChecked})
      handleMainItemCheckBox(
        { target: { checked: isAnyVariantChecked } },
        variant.product_id,
        variant_id,
        index,
        updatedChecked
      );
    },
    [variantsChecked]
  );

  const isChecked = useMemo(() => {
    return variantsChecked.has(variant?.id);
  }, [variantsChecked, variant?.id]);

  return (
    <div className="w-full flex items-center justify-between border-b py-[0.7rem] pl-[4.5rem] pr-[1.5rem]">
      <div className="flex items-center gap-x-[1rem]">
        <label className="container mr-[1rem]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleVarientCheckbox(variant.id, mainProductIndex)}
          />
          <span className="checkmark"></span>
        </label>
        <span className="text-[1rem] text-[#000]">{variant?.title}</span>
      </div>
      <div className="flex items-center gap-x-[1rem]">
        <span className="text-[1rem] text-[#000]">99 available</span>
        <span className="text-[1rem] text-[#000]">${variant?.price}</span>
      </div>
    </div>
  );
};

export default NewProductVarient;
