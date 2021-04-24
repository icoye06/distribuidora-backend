require("dotenv").config();
require("./mongo");

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");

const Product = require("./models/Product");
const notFound = require("./middlewares/notFound");
const handleErrors = require("./middlewares/handleErrors");

app.use(cors());
app.use(express.json());

app.get("/api/products", ({}, res, next) => {
  Product.find({})
    .then((products) => {
      res.json(products);
    })
    .catch((err) => next(err));
});

app.get("/api/products/:id", (req, res, next) => {
  const id = req.params.id;

  Product.findById(id)
    .then((product) => {
      if (product) {
        return res.json(product);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

app.post("/api/products", (req, res) => {
  const product = req.body;

  if (!product.name) {
    return res.status(400).json({
      error: "Name is requiered for product creation",
    });
  }

  const newProduct = new Product({
    barsCode: product.barsCode,
    name: product.name,
    creationDate: new Date(),
    description: product.description,
    price: product.price,
  });

  newProduct
    .save()
    .then((savedProduct) => {
      res.status(200).json(savedProduct);
    })
    .catch((err) => {
      console.log("There was an error: " + err);
    });
});

app.put("/api/products/:id", (req, res, next) => {
  const { id } = req.params;
  const product = req.body;

  Product.findByIdAndUpdate(id, product, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});

app.delete("/api/products/:id", (req, res, next) => {
  const { id } = req.params;

  Product.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});

app.use(notFound);

app.use(handleErrors);

const server = app.listen(PORT, () => {
  console.log("App listening on port: " + PORT);
});

module.exports = { app, server };
