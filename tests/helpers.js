const { app } = require("../index");
const supertest = require("supertest");

const api = supertest(app);

const initialProducts = [
  {
    barsCode: 2134214152,
    name: "Name 1",
    description: "Desc 1",
    price: 20,
  },
  {
    barsCode: 21342144242,
    name: "Name 2",
    description: "Desc 2",
    price: 40,
  },
];

const getAllDescriptionsFromProducts = async () => {
  const response = await api.get("/api/products");

  return {
    descriptions: response.body.map((product) => product.description),
    response,
  };
};

const getAllProducts = async () => {
  const response = await api.get("/api/products");
  return response.body;
};

module.exports = {
  api,
  initialProducts,
  getAllDescriptionsFromProducts,
  getAllProducts,
};
