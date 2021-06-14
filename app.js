require("dotenv").config();
require("./mongoose/config");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const pathName = path.join(__dirname + "/uploads");
const authRoutes = require("./routers/authRoutes");
const TrainRoutes = require("./routers/trainRoutes");
const corsOptions = {
  exposedHeaders: "Authorization",
};

app.use(express.static(pathName));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
process.env.NODE_ENV || ("development" && app.use(morgan("tiny")));

// app.get("/", (req, res) => {
//   return res.status(200).json({ message: "hello world !!" });
// });

app.use("/", authRoutes);
app.use("/train", TrainRoutes);

module.exports = { server };
