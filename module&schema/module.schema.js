const mongoose = require("mongoose");

const UserInfoSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: String,
    url: [],
    shortURL: [],
  },
  {
    timestamps: true,
  }
);

const UserInfoModel = mongoose.model("URL_ShortEnd", UserInfoSchema);

module.exports = UserInfoModel;
