require("dotenv").config();
require("./mongo");

const express = require("express");
const app = express();
const cors = require("cors");

const { PORT, NODE_ENV } = process.env;

const port = NODE_ENV === "test" ? 3002 : PORT;

const Product = require("./models/Product");
const notFound = require("./middlewares/notFound");
const handleErrors = require("./middlewares/handleErrors");
const productsRouter = require("./controllers/Products");

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);

app.use(notFound);

app.use(handleErrors);

const server = app.listen(port, () => {
  console.log("App listening on port: " + port);
});

module.exports = { app, server };
