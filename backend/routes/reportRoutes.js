const express = require("express");

const reportController = require("./../controllers/reportController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(reportController.getAllReports)
  .post(reportController.upload, reportController.uploadReports);

router
  .route("/:id")
  .get(reportController.getReport)
  .patch(authController.protect, reportController.updateReport)
  .delete(reportController.deleteReport);

module.exports = router;
