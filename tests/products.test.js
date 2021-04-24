const mongoose = require("mongoose");
const { server } = require("../index");
const {
  api,
  initialProducts,
  getAllDescriptionsFromProducts,
  getAllProducts,
} = require("./helpers");
const Product = require("../models/Product");

beforeEach(async () => {
  await Product.deleteMany({});

  const note1 = new Product(initialProducts[0]);
  await note1.save();
  const note2 = new Product(initialProducts[1]);
  await note2.save();
});

test("Products are returned as json", async () => {
  await api
    .get("/api/products")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("There are two products", async () => {
  const response = await api.get("/api/products");
  expect(response.body).toHaveLength(initialProducts.length);
});

test("One of the descriptions is: Desc 1", async () => {
  const { descriptions } = await getAllDescriptionsFromProducts();

  expect(descriptions).toContain("Desc 1");
});

test("Individual products can be retrieved", async () => {
  const products = await getAllProducts();

  const product1 = await api
    .get(`/api/products/${products[0].id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(product1.body).toEqual(products[0]);
});

describe("Looking for an individual product with", () => {
  test("bad formated ID hash returns error 400", async () => {
    await api
      .get("/api/products/607f2b22e1d3702bd0")
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("non-existent ID returns error 404", async () => {
    await api.get("/api/products/607f2b22e1d3702bd0238220").expect(404);
  });
});

test("A valid product can be added", async () => {
  const newProduct = {
    barsCode: 21941249,
    name: "Name 3",
    description: "Desc 3",
    price: 60,
  };

  await api
    .post("/api/products")
    .send(newProduct)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const { descriptions, response } = await getAllDescriptionsFromProducts();

  expect(response.body).toHaveLength(initialProducts.length + 1);
  expect(descriptions).toContain(newProduct.description);
});

test("A product without name can't be added", async () => {
  const newProduct = {
    barsCode: 21941249,
    description: "Desc 4",
    price: 60,
  };

  await api
    .post("/api/products")
    .send(newProduct)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/products");

  expect(response.body).toHaveLength(initialProducts.length);
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
