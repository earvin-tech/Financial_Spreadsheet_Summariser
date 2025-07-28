// server/jest.config.js
module.exports = {
  testEnvironment: "node",
  testTimeout: 15000,
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
};
