const { Schema, model } = require("mongoose");

const phonebookSchema = new Schema(
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

const contacts = model("contact", phonebookSchema);

module.exports = contacts;
