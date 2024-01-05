const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phonebookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      maxlength: 170,
    },
    phone: {
      type: String,
      maxlength: 170,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const contacts = mongoose.model("contact", phonebookSchema);

module.exports = contacts;
