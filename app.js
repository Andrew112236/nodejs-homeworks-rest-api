const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const routerApi = require("./routes/api");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

// cors
app.use(cors());
app.use(morgan("short"));
app.use(express.json());

app.use("/api", routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "The requested route is not available",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

app.listen(PORT, function () {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
