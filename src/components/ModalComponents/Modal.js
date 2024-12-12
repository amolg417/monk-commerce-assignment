import React, { useCallback, useEffect, useState } from "react";
import closeIcon from "../../assest/crossIcon.svg";
import searchIcon from "../../assest/searchIcon.svg";
import NewProduct from "./NewProduct";
import { useDispatch } from "react-redux";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import {
  fetchProductList,
  hangleModalVisibility,
  resetProductsToBeAddedInCart,
} from "../../slices/NewProductsSlice";
import { useSelector } from "react-redux";
import { addOrReplaceItem } from "../../slices/ProductsSlice";
import Loader from "../Loader";
import Actions from "./Actions";
import { message } from "antd";
const Modal = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [productsToAdded, setproductsToAdded] = useState(new Set([]));
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [isInitialFetching, setIsInitialFetching] = useState(true);
  const [searchQuery, setSerachQuery] = useState("");

  const dispatch = useDispatch();
  const newProducts = useSelector((state) => state.newProducts.productList);
  const productsToBeAddedInCart = useSelector(
    (state) => state.newProducts.productsToBeAddedInCart
  );
  const productToBeReplacedIndex = useSelector(
    (state) => state.newProducts.productToBeReplacedIndex
  );
  const { loading, error } = useSelector((state) => state.newProducts);

  const handleAddMainProductCheckbox = useCallback(
    (product_id, isVariantsChecked) => {
      console.log("isVariantsChecked",isVariantsChecked)
      setproductsToAdded((prev) => {
        const newCheckedProducts = new Set(prev);
        console.log(prev,newCheckedProducts)
        if (newCheckedProducts.has(product_id) && !isVariantsChecked) {
          console.log("removed")
          newCheckedProducts.delete(product_id);
        } else {
          newCheckedProducts.add(product_id);
        }
        return newCheckedProducts;
      });
    },
    []
  );

  const addProducts = useCallback(() => {
    dispatch(
      addOrReplaceItem({
        productIndex: productToBeReplacedIndex,
        UpdatedProducts: productsToBeAddedInCart,
      })
    );
    dispatch(resetProductsToBeAddedInCart());
    handleCloseButton();
  }, [productToBeReplacedIndex, productsToBeAddedInCart]);

  const handleCloseButton = useCallback(() => {
    dispatch(hangleModalVisibility(false));
  }, []);

  const handleScroll = useCallback(
    ({ scrollTop, scrollHeight, clientHeight }) => {
      const threshold = scrollHeight - clientHeight - 50;
      if (!isFetching && scrollTop >= threshold) {
        setIsFetching(true);
        setCurrentPage((prev) => prev + 1);
      }
    },
    [isFetching]
  );

  useEffect(() => {
    if (isFetching && !searchQuery) {
      dispatch(fetchProductList({ page: currentPage })).finally(() => {
        setIsFetching(false);
      });
    }
  }, [isFetching, currentPage, searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      dispatch(fetchProductList({ search: "", page: 1, limit: 10 })).finally(
        () => {
          setIsInitialFetching(false);
        }
      );
    }
    return ()=>{
      dispatch(resetProductsToBeAddedInCart());
    }
  }, [searchQuery]);

  useEffect(() => {
    let timer;
    if (searchQuery) {
      timer = setTimeout(() => {
        dispatch(fetchProductList({ search: searchQuery, page: 1, limit: 10 }));
      }, 1000);
    } else {
      setCurrentPage(1);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const cache = new CellMeasurerCache({
    defaultHeight: 200,
    fixedWidth: true,
  });

  const renderRow = ({ index, key, parent, style }) => {
    const item = newProducts[index];
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {() => (
          <div style={style}>
            <NewProduct
              key={item.id}
              item={item}
              index={index}
              handleAddMainProductCheckbox={handleAddMainProductCheckbox}
              productsToAdded={productsToAdded}
            />
          </div>
        )}
      </CellMeasurer>
    );
  };

  if (error) {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
    return;
  }

  return (
    <div className="w-[65%] aspect-square bg-[#ffff]">
      <div className="w-full py-[0.5rem] px-[1.5rem] flex items-center justify-between border-b">
        <h5 className="text-[1.2rem]">Select Products</h5>
        <img
          src={closeIcon}
          alt="closeIcon"
          className="w-[1rem] cursor-pointer"
          onClick={handleCloseButton}
        />
      </div>
      <div className="w-full py-[0.5rem] flex items-center justify-center border-b relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSerachQuery(e.target.value)}
          placeholder="Search product"
          className="w-[91%] text-[0.9rem] border outline-none px-[2.8rem] py-[0.2rem]"
        />
        <img
          src={searchIcon}
          alt="searchIcon"
          className="w-[1rem] absolute left-[3rem]"
        />
      </div>
      <div className="w-full h-[77%] border-b overflow-hidden">
        {(loading && searchQuery) || (loading && isInitialFetching) ? (
          <Loader />
        ) : (
          <List
            className="custom-scrollbar"
            width={590}
            height={500}
            rowHeight={cache.rowHeight}
            rowRenderer={renderRow}
            rowCount={newProducts?.length}
            overscanRowCount={10}
            onScroll={handleScroll}
          />
        )}
      </div>
      <Actions
        productsToBeAddedInCart={productsToBeAddedInCart}
        handleCloseButton={handleCloseButton}
        addProducts={addProducts}
      />
      {contextHolder}
    </div>
  );
};

export default Modal;
