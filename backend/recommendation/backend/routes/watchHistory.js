const express = require("express");
const router = express.Router();
const WatchHistory = require("../models/WatchHistory");

// ...

// Get the list of recently viewed videos by a user
router.get("/recently-viewed/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const watchHistory = await WatchHistory.find({ userId })
      .sort({ watchedAt: -1 })
      .limit(10)
      .populate("videoId");

    res.json({ recentlyViewed: watchHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ...
