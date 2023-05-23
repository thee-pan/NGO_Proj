// RecentlyViewedProducts.js

import React, { useState, useEffect } from "react";

const RecentlyViewedProducts = ({ userId }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    // Fetch the user's recently viewed products
    const fetchRecentlyViewed = async () => {
      try {
        const response = await fetch(`/api/recently-viewed/${userId}`);
        const data = await response.json();
        setRecentlyViewed(data.recentlyViewed);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecentlyViewed();
  }, [userId]);

  return (
    <div>
      <h2>Recently Viewed Products</h2>
      <ul>
        {recentlyViewed.map((product) => (
          <li key={product._id}>{product.productId}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyViewedProducts;
