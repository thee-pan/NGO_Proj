// ProductItem.js

import React from 'react';

const ProductItem = ({ product, addToWatchHistory }) => {
  const handleAddToWatchHistory = () => {
    addToWatchHistory(product._id);
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleAddToWatchHistory}>Add to Watch History</button>
    </div>
  );
};

export default ProductItem;
