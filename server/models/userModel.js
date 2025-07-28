const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * User schema for MongoDB using Mongoose.
 *
 * Fields:
 * - `username`: A unique username, required, min 3 characters, letters/numbers/underscores only.
 * - `email`: A unique email address, required, lowercase.
 * - `password`: A hashed password, required, min 8 characters, must include uppercase and special character.
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "User name can only contain letters, numbers and underscores",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      match: [
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
        "Password must contain at least one special character and one uppercase letter",
      ],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook to hash the user's password.
 * @function
 * @memberof User
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>}
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Compares a plain text password with the hashed password stored in the database.
 * @async
 * @function matchPassword
 * @memberof User
 * @param {string} enteredPassword - Password entered by the user.
 * @returns {Promise<boolean>} True if the passwords match, false otherwise.
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
