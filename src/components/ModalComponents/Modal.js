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
  selectSelectedProducts,
} from "../../slices/NewProductsSlice";
import { useSelector } from "react-redux";
import { addOrReplaceItem } from "../../slices/ProductsSlice";
import Loader from "../Loader";
import Actions from "./Actions";
import { message } from "antd";
import { AutoSizer } from "react-virtualized";
import NewProductList from "./NewProductList";
const Modal = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [isInitialFetching, setIsInitialFetching] = useState(true);
  const [searchQuery, setSerachQuery] = useState("");

  const dispatch = useDispatch();
  const storeState = useSelector((state) => state.newProducts);
  const newProducts = useSelector((state) => state.newProducts.productList);
  const selectedProducts = useSelector(
    (state) => state.newProducts.selectedProducts
  );
  const productToBeReplacedIndex = useSelector(
    (state) => state.newProducts.productToBeReplacedIndex
  );
  const { loading, error } = useSelector((state) => state.newProducts);

  const addProducts = useCallback(() => {
    const selectedProducts = selectSelectedProducts(storeState);
    if (selectedProducts.length) {
      dispatch(
        addOrReplaceItem({
          productIndex: productToBeReplacedIndex,
          UpdatedProducts: selectedProducts,
        })
      );
      dispatch(resetProductsToBeAddedInCart());
      handleCloseButton();
    } else {
      messageApi.open({
        type: "error",
        content: "please select atleast one product",
      });
    }
  }, [productToBeReplacedIndex, storeState]);

  const handleCloseButton = useCallback(() => {
    dispatch(hangleModalVisibility(false));
  }, []);

  const handleScroll = useCallback(
    ({ scrollTop, scrollHeight, clientHeight }) => {
        const threshold = scrollHeight - clientHeight - 50;
        if (!isFetching && scrollTop >= threshold && !isInitialFetching) {
          console.log("handleScroll");
          setIsFetching(true);
          setCurrentPage((prev) => prev + 1);
        }
    },
    [isFetching,isInitialFetching]
  );

  useEffect(() => {
    // Fetch next page when scrolling down and search query is empty
    console.log(
      "!searchQuery && isFetching",
      { searchQuery },
      isFetching,
      isInitialFetching
    );
    if (!searchQuery && isFetching) {
      dispatch(fetchProductList({ page: currentPage, limit: 10 })).finally(
        () => {
          setIsFetching(false);
        }
      );
    }

    // Fetch next page when scrolling down with search query
    if (searchQuery && isFetching) {
      console.log("searchQuery && isFetching");
      dispatch(
        fetchProductList({ search: searchQuery, page: currentPage, limit: 10 })
      ).finally(() => {
        setIsFetching(false);
      });
    }
  }, [currentPage, isFetching, searchQuery]);

  useEffect(() => {
    // Fetch initial products
    if (isInitialFetching) {
      console.log("initial useefect");
      dispatch(fetchProductList({ page: 1, limit: 10 })).finally(() => {
        setIsInitialFetching(false);
      });
    }
  }, [isInitialFetching]);

  useEffect(() => {
    let timer;
    if (searchQuery) {
      timer = setTimeout(() => {
        console.log("searchQuery useefect");
        dispatch(
          fetchProductList({ search: searchQuery, page: 1, limit: 10 })
        ).finally(() => {
          setCurrentPage(1);
          setIsFetching(false);
        });
      }, 1000);
    } else {
      setCurrentPage(1);
      setIsInitialFetching(true);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  if (error) {
    messageApi.open({
      type: "error",
      content: "Something went wrong, please try again",
    });
  }

  return (
    <div className="w-[40vw] aspect-square bg-[#ffff]">
      <div className="w-full py-[0.5vw] px-[1.5vw] flex items-center justify-between border-b">
        <h5 className="fs-18">Select Products</h5>
        <img
          src={closeIcon}
          alt="closeIcon"
          className="w-[1vw] cursor-pointer"
          onClick={handleCloseButton}
        />
      </div>
      <div className="w-full py-[0.5vw] flex items-center justify-center border-b relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSerachQuery(e.target.value)}
          placeholder="Search product"
          className="w-[91%] fs-14 border outline-none px-[2.8vw] py-[0.2vw]"
        />
        <img
          src={searchIcon}
          alt="searchIcon"
          className="w-[1vw] absolute left-[3.2vw]"
        />
      </div>
      <div className="w-full h-[77%] border-b overflow-hidden">
        {loading && isInitialFetching ? (
          <Loader />
        ) : (
          <NewProductList
            newProducts={newProducts}
            handleScroll={handleScroll}
          />
        )}
      </div>
      <Actions
        selectedProducts={selectedProducts}
        handleCloseButton={handleCloseButton}
        addProducts={addProducts}
      />
      {contextHolder}
    </div>
  );
};

export default Modal;
