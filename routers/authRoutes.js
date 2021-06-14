const express = require("express");
const router = express.Router();
const { authenticate, adminAuth } = require("../middlewares");
const {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  getUser,
  getAllClient,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/edit/:id", authenticate, updateUser);
router.delete("/delete/:id", authenticate, deleteUser);
router.get("/:id", authenticate, getUser);
router.get("/client", adminAuth, getAllClient);

module.exports = router;
