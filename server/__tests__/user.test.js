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

describe("GET /api/users/me", () => {
  let token;

  beforeEach(async () => {
    const response = await request(app).post("/api/users/register").send({
      username: "meuser",
      email: "me@example.com",
      password: "Password!1",
    });

    token = response.body.token;
  });

  it("should return current user with valid token", async () => {
    const response = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      username: "meuser",
      email: "me@example.com",
    });
  });

  it("should return 401 if token is missing", async () => {
    const response = await request(app).get("/api/users/me");

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Unauthorized: No token provided"
    );
  });

  it("should return 401 if token is invalid", async () => {
    const response = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer badtoken123`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});

describe("PATCH /api/users/me (update password)", () => {
  let token;
  const email = "update@example.com";
  const oldPassword = "OldPass!1";
  const newPassword = "NewPass!2";

  beforeEach(async () => {
    const response = await request(app).post("/api/users/register").send({
      username: "updateuser",
      email,
      password: oldPassword,
    });

    token = response.body.token;
  });

  it("should update the password with correct old password", async () => {
    const response = await request(app)
      .patch("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ oldPassword, newPassword });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Password updated successfully");

    // Try logging in with old password (should fail)
    const oldLogin = await request(app).post("/api/users/login").send({
      email,
      password: oldPassword,
    });
    expect(oldLogin.statusCode).toBe(401);

    // Try logging in with new password (should succeed)
    const newLogin = await request(app).post("/api/users/login").send({
      email,
      password: newPassword,
    });
    expect(newLogin.statusCode).toBe(200);
    expect(newLogin.body).toHaveProperty("token");
  });

  it("should return 401 if old password is wrong", async () => {
    const response = await request(app)
      .patch("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ oldPassword: "WrongPass!1", newPassword });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Old password is incorrect");
  });

  it("should return 400 if new password is missing", async () => {
    const response = await request(app)
      .patch("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ oldPassword });

    expect(response.statusCode).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].msg).toMatch(/password/i);
  });
});

describe("DELETE /api/users/me", () => {
  let token;
  const email = "delete@example.com";
  const password = "DeletePass!1";

  beforeEach(async () => {
    const response = await request(app).post("/api/users/register").send({
      username: "deleteuser",
      email,
      password,
    });

    token = response.body.token;
  });

  it("should delete user with correct password", async () => {
    const response = await request(app)
      .delete("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ password });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User deleted successfully");

    // Check that user no longer exists
    const loginAttempt = await request(app).post("/api/users/login").send({
      email,
      password,
    });
    expect(loginAttempt.statusCode).toBe(401);
  });

  it("should return 401 with wrong password", async () => {
    const response = await request(app)
      .delete("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ password: "WrongPass!1" });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });

  it("should return 401 if no token is provided", async () => {
    const response = await request(app)
      .delete("/api/users/me")
      .send({ password });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Unauthorized: No token provided");
  });
});
