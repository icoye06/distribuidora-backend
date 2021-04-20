const supertest = require("supertest");
const { app, server } = require("../index");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const api = supertest(app);

const initialProducts = [
  {
    barsCode: 2134214152,
    name: "Name 1",
    creationDate: new Date(),
    description: "Desc 1",
    price: 20,
  },
  {
    barsCode: 21342144242,
    name: "Name 2",
    creationDate: new Date(),
    description: "Desc 2",
    price: 40,
  },
];

beforeEach(async () => {
  await Product.deleteMany({});

  const note1 = new Product(initialProducts[0]);
  note1.save();
  const note2 = new Product(initialProducts[1]);
  note2.save();
});

test("Products are returned as json", async () => {
  await api
    .get("/api/products")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Products are returned as json", async () => {
  const response = await api.get("/api/products");
  expect(response.body).toHaveLength(2);
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
