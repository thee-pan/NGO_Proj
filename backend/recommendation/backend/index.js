// server.js

const express = require("express");
const WatchHistory = require("./models/watchHistory");
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB
try {
  mongoose.connect("mongodb://localhost:27017/hackathon", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected");
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

// Middleware
app.use(express.json());

// Fetch watch history for a certain user
app.get("/api/watch-history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const watchHistory = await WatchHistory.find({ userId }).populate(
      "productId"
    );
    res.json(watchHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
