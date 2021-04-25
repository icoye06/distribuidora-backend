const productsRouter = require("express").Router();
const Product = require("../models/Product");

productsRouter.get("/", ({}, res, next) => {
  Product.find({})
    .then((products) => {
      res.json(products);
    })
    .catch((err) => next(err));
});

productsRouter.get("/:id", (req, res, next) => {
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

productsRouter.post("/", (req, res) => {
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

productsRouter.put("/:id", (req, res, next) => {
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

productsRouter.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  Product.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = productsRouter;
