// ProductList.js

import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, addToWatchHistory }) => {
  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => (
        <ProductItem
          key={product._id}
          product={product}
          addToWatchHistory={addToWatchHistory}
        />
      ))}
    </div>
  );
};

export default ProductList;
