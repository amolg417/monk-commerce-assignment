import React from 'react'

const Actions = ({productsToBeAddedInCart,handleCloseButton,addProducts}) => {
  return (
    <div className="w-full py-[0.5rem] px-[1.5rem] flex items-center justify-between">
    <span className="text-[1rem]">
      {productsToBeAddedInCart.length} product selected
    </span>
    <div className="h-full flex items-center gap-x-[1rem]">
      <buttun
        className="px-[1.5rem] py-[0.2rem] border border-[#00000066] rounded-sm cursor-pointer"
        onClick={handleCloseButton}
      >
        Cancel
      </buttun>
      <buttun
        className="px-[1.5rem] py-[0.2rem] border bg-[#008060] text-[#fff] rounded-sm cursor-pointer"
        onClick={addProducts}
        disa
      >
        Add
      </buttun>
    </div>
  </div>
  )
}

export default Actions
