const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

const ngoUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const ngoInformationSchema = new mongoose.Schema({
  website: {
    type: String,
  },

  name: {
    type: String,
    required: true,
  },

  pin: {
    type: String,
  },

  mobile: {
    type: String,
  },

  phone: {
    type: String,
  },

  objectives: {
    type: String,
    required: true,
  },

  purpose: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  poc: {
    type: String,
  },
});

const philanthropyUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});

const NgoRegister = mongoose.model("NgoRegister", ngoUserSchema);
const PhilanthropyRegister = mongoose.model(
  "PhilanthropyRegister",
  philanthropyUserSchema
);

const NgoInformation = mongoose.model("NgoInformation", ngoInformationSchema);

const watchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PhilanthropyRegister",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NgoInformation",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const WatchHistory = mongoose.model("WatchHistory", watchHistorySchema);

module.exports = {
  NgoRegister,
  PhilanthropyRegister,
  NgoInformation,
  WatchHistory,
};
