const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    minLength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not vallid email`,
    },
    unique: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },

  trains: [{ type: mongoose.Schema.Types.ObjectId, ref: "Train" }],

  userName: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  file: {
    type: String,
  },

  role: {
    type: String,
  },

  token: [
    {
      access: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
UserSchema.methods.toJSON = function () {
  const user = this;
  const UserObject = user.toObject();
  return _.pick(UserObject, [
    "email",
    "_id",
    "firstName",
    "lastName",
    "userName",
    "file",
    "trains",
  ]);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = "auth";
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, "123abc")
    .toString();
  if (user.token.length) {
    user.token.splice(0, 1);
  }
  user.token.push({ access, token });
  return user.save().then(() => token);
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decode;

  try {
    decode = jwt.verify(token, "123abc");
  } catch (err) {
    return Promise.reject(err);
  }

  return User.findOne({
    _id: decode._id,
    "token.token": token,
    "token.access": "auth",
  });
};

UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hashed) => {
        user.password = hashed;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findByCredentials = function (email, password) {
  const User = this;
  return User.findOne({ email }).then((result) => {
    if (!email) return Promise.reject();
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, result.password, (err) => {
        if (err) return reject();
        return resolve(result);
      });
    });
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
