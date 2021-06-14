const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/train', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error('could not connect to mongodb '));

module.exports = mongoose;
