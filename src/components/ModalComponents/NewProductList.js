import React, { useCallback, useState } from "react";
import { CellMeasurerCache } from "react-virtualized";
import { List } from "react-virtualized";
import { InfiniteLoader } from "react-virtualized";
import { AutoSizer } from "react-virtualized";
import { fetchProductList } from "../../slices/NewProductsSlice";
import { useDispatch } from "react-redux";
import { CellMeasurer } from "react-virtualized";
import NewProduct from "./NewProduct";

const NewProductList = ({ newProducts,handleScroll }) => {
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
            <NewProduct key={item.id} product={item} />
          </div>
        )}
      </CellMeasurer>
    );
  };
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className="custom-scrollbar"
          width={width}
          height={height}
          rowHeight={cache.rowHeight}
          rowRenderer={renderRow}
          rowCount={newProducts?.length}
          overscanRowCount={20}
          onScroll={handleScroll}
        />
      )}
    </AutoSizer>
  );
};

export default NewProductList;
