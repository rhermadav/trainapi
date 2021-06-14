const mongoose = require("mongoose");
const TrainSchema = new mongoose.Schema({
  file: {
    type: String,
  },

  locationName: {
    type: String,
    required: true,
  }, 
  durationTime: {
    type: String,
  },
  destination:{
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },

  destinationArrived: {
    type: Boolean,
    default: false,
  },

  trainId: {
    type: String,
    required: true,
  },
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  createdAt: {
    type: Date,
  },
});
const Train = mongoose.model("Train", TrainSchema);
module.exports = Train;
