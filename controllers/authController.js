const _ = require("lodash");
const User = require("../model/user");

exports.registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = await newUser.generateAuthToken();
    return res.header("x-auth", token).status(200).json({
      email: newUser.email,
      _id: newUser._id,
      token,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const body = _.pick(req.body, ["email", "password"]);

  try {
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    return res.header("x-auth", token).status(200).json({
      email: user.email,
      _id: user._id,
      token,
    });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

exports.updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

exports.getAllClient = async (req, res) => {
  try {
    const user = await User.find({ role: "client" });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
