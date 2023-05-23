// WatchHistory.js

import React from 'react';

const WatchHistory = ({ watchHistory }) => {
  return (
    <div>
      <h2>Watch History</h2>
      {watchHistory.map((item) => (
        <p key={item._id}>
          Product ID: {item.productId}, Viewed at: {item.timestamp}
        </p>
      ))}
    </div>
  );
};

export default WatchHistory;
