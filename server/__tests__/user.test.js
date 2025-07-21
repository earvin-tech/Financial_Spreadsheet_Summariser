const request = require("supertest");
const app = require("../index");
const User = require("../models/userModel");

describe("POST /api/users/register", () => {
  it("should register a new user and return token + user info", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "Password!1",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toMatchObject({
      username: "testuser",
      email: "test@example.com",
    });

    // Confirm user is actually saved
    const userInDb = await User.findOne({ email: "test@example.com" });
    expect(userInDb).not.toBeNull();
  });

  it("should return 409 if email is already used", async () => {
    // Register first time
    await request(app).post("/api/users/register").send({
      username: "duplicate",
      email: "dupe@example.com",
      password: "Password!1",
    });

    // Try registering again with same email
    const res = await request(app).post("/api/users/register").send({
      username: "someoneelse",
      email: "dupe@example.com",
      password: "Password!1",
    });

    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty("message", "Email already in use");
  });

  it("should return 400 if password is too weak", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: "badpass",
      email: "badpass@example.com",
      password: "weakpass", // Missing special char + uppercase
    });

    expect(res.statusCode).toBe(400);
  });
});

describe("/api/users/login", () => {
  const userData = {
    username: "loginuser",
    email: "login@example.com",
    password: "Password!1",
  };

  beforeEach(async () => {
    // Register the user first before testing login
    await request(app).post("/api/users/register").send(userData);
  });

  it("should log in with email and return token", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toMatchObject({
      email: userData.email,
      username: userData.username,
    });
  });

  it("should log in with username and return token", async () => {
    const response = await request(app).post("/api/users/login").send({
      username: userData.username,
      password: userData.password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should fail with wrong password", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: userData.email,
      password: "WrongPassword1!",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid credentials");
  });

  it("should fail with non-existent email", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "nonexistent@example.com",
      password: "Password!1",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid credentials");
  });
});
