const mongoose = require("mongoose");
const password = require("./credentials");

const connectionString = `mongodb+srv://yeico06:${password}@cluster0.qg1tl.mongodb.net/distribuidora?retryWrites=true&w=majority`;

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

const productSchema = new mongoose.Schema({
  barsCode: Number,
  name: String,
  creationDate: Date,
  description: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

const product = new Product({
  barsCode: 313134124,
  name: "Product 1 ",
  creationDate: new Date(),
  description: "Description product 1",
  price: 20,
});

product
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });
