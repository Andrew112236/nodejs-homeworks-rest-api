const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "db-contacts",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Database connection error: ${err.message}`);
    process.exit(1);
  });
