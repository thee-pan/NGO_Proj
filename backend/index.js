const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const cookieParser = require("cookie-parser");
var session = require("express-session");
var morgan = require("morgan");
var path = require("path");
const fs = require("fs");

const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://admin-dipanwita:test123@cluster0.hbgrp17.mongodb.net/hackathon?retryWrites=true&w=majority"; // Replace with your MongoDB URI
const client = new MongoClient(uri);

const {
  NgoRegister,
  PhilanthropyRegister,
  NgoInformation,
  WatchHistory,
} = require("./model/db");
const { address } = require("ip");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

app.set("view engine", "ejs");

mongoose
  .connect(
    "mongodb+srv://admin-dipanwita:test123@cluster0.hbgrp17.mongodb.net/hackathon?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connection Done");
  })
  .catch(() => {
    console.log("Error in establishing Database");
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  session({
    key: "user_sid",
    secret: "somerandomstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/profile");
  } else {
    next();
  }
};

var id = {};
var idUser = "";
var idString = "";
var userType = "";
var loggedUser = "";

app.get("/", sessionChecker, function (req, res) {
  res.redirect("/signup");
});

app.route("/signup").get(sessionChecker, function (req, res) {
  res.render("signup");
});

app.route("/signin").get(sessionChecker, (req, res) => {
  res.render("signin2");
});

app
  .route("/signin_ngo")
  .get(sessionChecker, async (req, res) => {
    res.render("profile");
  })
  .post(async (req, res) => {
    try {
      const check = await NgoRegister.findOne({
        email: req.body.email,
      });

      console.log(check.password);
      if (check.password === req.body.password) {
        console.log("Password check completed");
        loggedUser = check;
        id = { userId: check._id };
        idUser = JSON.stringify(id);
        idString = idUser.substring(11, idUser.length - 2);
        userType = "ngo";
        req.session.user = req.body;
        res.redirect("/profile");
      } else {
        res.send("Password is incorrect");
      }
    } catch (error) {
      console.log(error);
      res.send("Wrong Details");
    }
  });

app
  .route("/signin_phil")
  .get(sessionChecker, async (req, res) => {
    res.render("profile");
  })
  .post(async (req, res) => {
    try {
      const check = await PhilanthropyRegister.findOne({
        email: req.body.email,
      });

      console.log(check.password);
      if (check.password === req.body.password) {
        console.log("Password check completed");
        loggedUser = check;
        id = { userId: check._id };
        idUser = JSON.stringify(id);
        idString = idUser.substring(11, idUser.length - 2);
        userType = "philanthropist";
        req.session.user = req.body;
        res.redirect("/profile");
      } else {
        res.send("Password is incorrect");
      }
    } catch (error) {
      console.log(error);
      res.send("Wrong Details");
    }
  });

app.get("/profile", async (req, res) => {
  idString = String(idString);
  if (req.session.user && req.cookies.user_sid) {
    var name = "",
      tag = "",
      website = "",
      objectives = "",
      purpose = "",
      address = "",
      phone = "",
      mobile = "",
      poc = "";

    if (userType == "ngo") {
      name = await NgoRegister.findOne({ _id: idString }, null).populate(
        "name"
      );

      objectives = await NgoInformation.findOne(
        { name: name.name },
        null
      ).populate("objectives");

      purpose = await NgoInformation.findOne(
        { name: name.name },
        null
      ).populate("purpose");

      phone = await NgoInformation.findOne({ name: name.name }, null).populate(
        "phone"
      );

      mobile = await NgoInformation.findOne({ name: name.name }, null).populate(
        "mobile"
      );

      poc = await NgoInformation.findOne({ name: name.name }, null).populate(
        "poc"
      );

      address = await NgoInformation.findOne(
        { name: name.name },
        null
      ).populate("address");

      website = await NgoInformation.findOne(
        { name: name.name },
        null
      ).populate("website");

      email = await NgoInformation.findOne({ name: name.name }, null).populate(
        "email"
      );

      res.render("profile", {
        userType: userType,
        name: name.name,
        objective: objectives.objectives,
        purpose: purpose.purpose,
        phone: phone.phone,
        mobile: mobile.mobile,
        poc: poc.poc,
        address: address.address,
        website: website.website,
        email: email.email,
      });
    }

    if (userType == "philanthropist") {
      name = await PhilanthropyRegister.findOne(
        { _id: idString },
        null
      ).populate("name");

      tag = await PhilanthropyRegister.findOne(
        { _id: idString },
        null
      ).populate("tag");

      email = await PhilanthropyRegister.findOne(
        { _id: idString },
        null
      ).populate("email");

      res.render("profile", {
        userType: userType,
        name: name.name,
        tag: tag.tag,
        email: email.email,
      });
    }
  } else {
    console.log("Error in loading profile");
    res.redirect("/signin");
  }
});

app
  .route("/philanthropy")
  .get(sessionChecker, (req, res) => {
    res.render("philanthropy");
  })
  .post(async (req, res) => {
    const data = new PhilanthropyRegister(req.body);

    data.save((err, docs) => {
      if (err) {
        res.redirect("/philanthropy");
      } else {
        res.redirect("/signin");
      }
    });
  });

var ngoName = "",
  ngoEmail = "";
app
  .route("/ngo")
  .get(sessionChecker, (req, res) => {
    res.redirect("/profile");
  })
  .post(sessionChecker, async (req, res) => {
    console.log(req.body);
    const data = new NgoRegister(req.body);
    ngoName = req.body.name;
    ngoEmail = req.body.email;

    data.save((err, docs) => {
      if (err) {
        res.redirect("/ngo");
      } else {
        res.redirect("/signup_2");
      }
    });
  });

app
  .route("/philanthropist")
  .get(sessionChecker, (req, res) => {
    res.redirect("/profile");
  })
  .post(sessionChecker, async (req, res) => {
    console.log(req.body);
    const data = new PhilanthropyRegister(req.body);

    data.save((err, docs) => {
      console.log(err);
      if (err) {
        res.redirect("/philanthropist");
      } else {
        res.redirect("/signin");
      }
    });
  });

app
  .route("/signup_2")
  .get(sessionChecker, (req, res) => {
    res.render("signup_ngo2");
  })
  .post(async (req, res) => {
    const reqBody = req.body;
    const data = new NgoInformation({
      website: reqBody.website,
      name: ngoName,
      pin: reqBody.pin,
      mobile: reqBody.mobile,
      phone: reqBody.phone,
      objectives: reqBody.objectives,
      purpose: reqBody.purpose,
      address: reqBody.address,
      email: ngoEmail,
      poc: reqBody.poc,
    });

    data.save((err, docs) => {
      console.log(err);
      if (err) {
        res.redirect("/signup_2");
      } else {
        res.redirect("/signin");
      }
    });
  });

app.route("/products").get(async (req, res) => {
  const ngoList = await NgoInformation.find().populate("name");

  console.log(ngoList.name);

  res.render("products", {
    items: ngoList,
  });
});

var ngo_id, ngo;
app.get("/product/:product_id", async (req, res) => {
  ngo_id = req.params.product_id;
  ngo = await NgoInformation.find({ _id: ngo_id }, null).populate("name");
  console.log(ngo[0]._id);
  console.log(loggedUser._id);

  res.render("product", {
    product: ngo[0],
  });

  const watchHistory = await WatchHistory.create({
    userId: loggedUser._id,
    productId: ngo[0]._id,
    productName: ngo[0].name,
  });
});

app.get("/recommendations", async (req, res) => {
  console.log("first");
  console.log(loggedUser._id);
  //finding out watch history of the logged in user.
  var loggedUserWatchHistory = await WatchHistory.find(
    { userId: loggedUser._id },
    null
  ).populate("productName");

  console.log(loggedUserWatchHistory[0].productName);

  const purposeNgo = await NgoInformation.find(
    {
      _id: loggedUserWatchHistory[loggedUserWatchHistory.length - 1].productId,
    },

    null
  ).populate("purpose");

  console.log(purposeNgo[0].purpose);

  const collection = client.db().collection("ngoinformations"); // Replace with your collection name
  await collection.createIndex({ purpose: "text" });

  const searchQuery = {
    $text: {
      $search: purposeNgo[0].purpose, // Replace with your search term
    },
  };

  const projection = {
    _id: 1,
    name: 1,
    purpose: 1,
    objectives: 1,
  };

  const cursor = collection.find(searchQuery).limit(5).project(projection);
  const result = await cursor.toArray();

  res.render("recommendationPage", {
    product_id:
      loggedUserWatchHistory[loggedUserWatchHistory.length - 1].productId,
    product_name:
      loggedUserWatchHistory[loggedUserWatchHistory.length - 1].productName,
    items: result,
  });

  console.log("Similar documents:");
  result.forEach((doc) => {
    console.log(doc);
  });
});

app.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.redirect("/");
  } else {
    res.redirect("/signin");
  }
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(5000, function () {
  console.log("Server started on port 5000");
});
