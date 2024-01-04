const { Schema, model } = require("mongoose");

// const { handleMongoose } = require("../helpers/handleMongoose");

const usersSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});

// usersSchema.post("save", handleMongoose);
const Users = model("users", usersSchema);

module.exports = Users;
