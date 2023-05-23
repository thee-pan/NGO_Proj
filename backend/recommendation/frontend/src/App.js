// App.js

import React, { useEffect, useState } from "react";
import ProductList from "../src/components/ProductList";
import WatchHistory from "../src/components/WatchHistory";

const App = () => {
  const [products, setProducts] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);

  // Simulating API call to fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace with your API endpoint to fetch products
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const addToWatchHistory = async (productId) => {
    try {
      // Replace with your API endpoint to add to watch history
      await fetch("/api/watch-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      // Refresh watch history
      await fetchWatchHistory();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWatchHistory = async () => {
    try {
      // Replace with your API endpoint to fetch watch history for the current user
      const response = await fetch("/api/watch-history");
      const data = await response.json();
      setWatchHistory(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWatchHistory();
  }, []);

  return (
    <div>
      <ProductList products={products} addToWatchHistory={addToWatchHistory} />
      <WatchHistory watchHistory={watchHistory} />
    </div>
  );
};

export default App;
