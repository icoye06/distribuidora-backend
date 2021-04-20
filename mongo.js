const mongoose = require("mongoose");

const connectionString = process.env.MONGO_DB_URI;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error(err);
  });
