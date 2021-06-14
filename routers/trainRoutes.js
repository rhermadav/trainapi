const express = require("express");
const router = express.Router();
const { authenticate, adminAuth, upload } = require("../middlewares");
const {
  createTrain,
  getAllTrain,
  subscribeToATrain,
  deleteTrain,
  UpdateTrain,
  UnsubscribeToATrain,
  getSingleTrainAndSubscribers,
} = require("../controllers/trainControllers");

router.post("/create", adminAuth, upload, createTrain);
router.patch("/subscribe", authenticate, subscribeToATrain);
router.patch("/unsubscribe", authenticate, UnsubscribeToATrain);
router.patch("/update/:id", adminAuth, UpdateTrain);
router.delete("/delete/:id", adminAuth, deleteTrain);
router.get("/all", authenticate, getAllTrain);
router.get("/:id", adminAuth, getSingleTrainAndSubscribers);
module.exports = router;