const supertest = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const orderRouters = require("../routers/orderRoute");
app.use("/order", orderRouters);

describe("ORDER ROUTE", () => {
  it("Should Create a new order", async () => {
    // const response = await supertest(app).post("/post").send({ body });
    // expect(response.statusCode).toEqual(201);
  });
});
