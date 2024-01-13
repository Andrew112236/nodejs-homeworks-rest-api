const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRouter = require("./routes/api/auth.js");
const routerApi = require("./routes/api/index.js");
const passport = require("passport");
const path = require("path");
const sgMail = require("@sendgrid/mail");

const app = express();

dotenv.config();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// cors
app.use(morgan(formatsLogger));

app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use("/api/users", authRouter);
app.use("/api/contacts", routerApi);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
