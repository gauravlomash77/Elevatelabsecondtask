const request = require("supertest");
const app = require("../app");

describe("Portfolio App", () => {
  it("should return status 200 for the homepage", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  it("should return health check JSON", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("UP");
  });
});
