const request = require("supertest");
const app = require("../index");

describe("Sanity Check", () => {
  it("returns 404 on unknown route", async () => {
    const response = await request(app).get("/api/unknown");
    expect(response.statusCode).toBe(404);
  });
});
