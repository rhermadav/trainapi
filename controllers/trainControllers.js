const User = require("../model/user");
const Train = require("../model/train");

exports.createTrain = async (req, res) => {
  try {
    const train = await Train.create(req.body);
    return res.status(200).json({ message: "success", train });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.UpdateTrain = async (req, res) => {
  try {
    await Train.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
exports.deleteTrain = async (req, res) => {
  try {
    await Train.findByIdAndRemove(req.params.id);
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.getAllTrain = async (req, res) => {
  try {
    const trains = await Train.find();
    return res.status(200).json(trains);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.getSingleTrainAndSubscribers = async (req, res) => {
  try {
    const trains = await Train.findById(req.params.id)
      .populate({ path: "subscribers" })
      .exec();
    return res.status(200).json(trains);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.subscribeToATrain = async (req, res) => {
  const { user_id, train_id } = req.query;
  try {
    await Train.findByIdAndUpdate(train_id, {
      $addToSet: { subscribers: user_id },
    });
    await User.findByIdAndUpdate(user_id, {
      $addToSet: { trains: train_id },
    });
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.UnsubscribeToATrain = async (req, res) => {
  const { user_id, train_id } = req.query;
  try {
    await Train.findByIdAndUpdate(train_id, {
      $unset: { subscibers: user_id },
    });

    await User.findByIdAndUpdate(user_id, {
      $unset: { trains: train_id },
    });
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
