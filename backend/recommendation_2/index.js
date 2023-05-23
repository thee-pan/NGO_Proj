const express = require("express");
const WatchHistory = require("./models/watchHistory");
const bodyParser = require("body-parser");
const User = require("./models/User");
const Video = require("./models/Video");
const mongoose = require("mongoose");
const ejs = require("ejs");

const DB =
  "mongodb+srv://admin-dipanwita:test123@cluster0.hbgrp17.mongodb.net/hackathon?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => console.log(err));

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// try {
//   mongoose.connect("mongodb://localhost:27017/hackathon", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log("MongoDB connected");
// } catch (err) {
//   console.error(err.message);
//   process.exit(1);
// }

app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/signin");
});

var loggedUser = "";

app
  .route("/signin")
  .get((req, res) => {
    res.render("signin");
  })
  .post(async (req, res) => {
    console.log(req.body.email);
    try {
      const check = await User.findOne({
        email: req.body.email,
      });

      console.log(check.password);
      if (check.password === req.body.password) {
        console.log("Password check completed");
        loggedUser = check;
        res.redirect("/products");
      } else {
        res.send("Password is incorrect");
      }
    } catch (error) {
      console.log(error);
      res.send("Wrong Details");
    }
  });

app.route("/products").get(async (req, res) => {
  const video = await Video.find().populate("title");

  console.log(video[0].title);
  res.render("products", {
    items: video,
  });
});

var product_id, video;
app.get("/product/:product_id", async (req, res) => {
  product_id = req.params.product_id;
  video = await Video.find({ _id: product_id }, null).populate("title");
  console.log(video[0]._id);
  console.log(loggedUser._id);
  res.render("product", {
    product: video[0],
  });

  const watchHistory = await WatchHistory.create({
    userId: loggedUser._id,
    productId: video[0]._id,
    productName: video[0].title,
  });
});

//const searchRecommendation =

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
