import React, { useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ProductList from "./ProductList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addEmptyProduct,
  updateCartProducts,
} from "../../slices/ProductsSlice";

const ProductListWrapper = () => {
  const products = useSelector((state) => state.cart.productsInCart);
  const dispatch = useDispatch();
  const handleAddEmptyProduct = useCallback(() => {
    const emptyProduct = {
      id: (products.length + 1).toString(),
      title: "Select Product",
      discount: 0,
      type: "% Off",
      varients: [],
    };
    dispatch(addEmptyProduct(emptyProduct));
  }, [products]);

  const handleOnDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      const { source, destination, type } = result;

      const updatedProducts = products.map((product) => ({
        ...product,
        variants: [...product?.variants], 
      }));

      if (type === "product") {
        const [movedProduct] = updatedProducts.splice(source.index, 1);
        updatedProducts.splice(destination.index, 0, movedProduct);
      } else if (type === "variant") {
        const sourceProduct = updatedProducts.find(
          (p) => p.id.toString() === source.droppableId
        );

        if (sourceProduct) {
          const updatedVariants = [...sourceProduct?.variants];
          const [movedVariant] = updatedVariants.splice(source.index, 1);
          updatedVariants.splice(destination.index, 0, movedVariant);

          sourceProduct.variants = updatedVariants;
        }
      }

      dispatch(updateCartProducts(updatedProducts));
    },
    [products, dispatch]
  );

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="w-[30rem]">
        <ProductList
          products={products}
          droppableId="productList"
          type="product"
        />
        <button
          onClick={handleAddEmptyProduct}
          className="float-right py-[0.5rem] px-[2rem] border-[0.1rem] border-[#008060] text-[#008060] font-[500] rounded-sm mt-[2rem] duration-100 hover:bg-[#008060] hover:text-[#fff]"
        >
          Add Product
        </button>
      </div>
    </DragDropContext>
  );
};

export default ProductListWrapper;
