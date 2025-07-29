const request = require("supertest");
const path = require("path");
const app = require("../index");

describe("POST /api/upload", () => {
  it("should upload a file successfully", async () => {
    const filePath = path.join(__dirname, "fixtures", "sample.csv");

    const response = await request(app)
      .post("/api/upload")
      .attach("file", filePath);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/uploaded successfully/i);
    expect(response.body.file).toBeDefined();
    expect(response.body.file.originalname).toBe("sample.csv");
    expect(response.body.file.mimetype).toMatch(/csv/);
    expect(response.body.file.size).toBeGreaterThan(0);
  });

  it("should fail if no file is provided", async () => {
    const response = await request(app).post("/api/upload");

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/no file uploaded/i);
  });
});
