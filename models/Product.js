const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const productSchema = new Schema({
  barsCode: Number,
  name: String,
  creationDate: Date,
  description: String,
  price: Number,
});

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
