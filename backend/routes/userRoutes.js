const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const reportController = require("./../controllers/reportController");

const reportRouter = require("./../routes/reportRoutes");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

router.patch("/updateMe", authController.protect, userController.updateMe);
router.delete("/deleteMe", authController.protect, userController.deleteMe);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router
  .route("/pics")
  .get(
    authController.protect,
    authController.restrictTo("doctor"),
    userController.getAllPics
  );

router.route("/").get(userController.getAllUsers);

router.route("/:id").get(userController.getUser);

router
  .route("/:userId/reports")
  .get(authController.protect, reportController.getAllReports)
  .post(
    authController.protect,
    reportController.upload,
    reportController.uploadReports
  )
  .patch(authController.protect, reportController.updateReport);

router
  .route("/:userId/prof")
  .get(authController.protect, userController.getProf)
  .post(
    authController.protect,
    userController.upload,
    userController.uploadImgs
  );

module.exports = router;
