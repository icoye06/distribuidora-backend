const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const productSchema = new Schema({
  barsCode: Number,
  name: String,
  creationDate: String,
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

// Product.find({})
//   .then((result) => {
//     console.log(result);
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// const product = new Product({
//   barsCode: 313134124,
//   name: "Product 1 ",
//   creationDate: new Date(),
//   description: "Description product 1",
//   price: 20,
// });

// product
//   .save()
//   .then((result) => {
//     console.log(result);
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.error(err);
//   });
