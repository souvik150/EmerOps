const mongoose = require("mongoose");
const slugify = require("slugify");

const reportSchema = new mongoose.Schema(
  {
    repImg: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    hosName: {
      type: String,
    },
    docName: {
      type: String,
    },
    slug: String,
    diagonsis: {
      type: String,
    },
    bp: {
      type: String,
    },
    pr: {
      type: String,
    },
    weight: {
      type: String,
    },
    diet: {
      type: String,
    },
    nextVisit: {
      type: String,
    },
    followUpPhy: {
      type: String,
    },
    medicine: [
      {
        type: String,
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
