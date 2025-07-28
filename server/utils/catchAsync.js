/**
 * Wraps an asynchronous Express route handler or middleware function
 * and forwards any errors to the global error handler.
 *
 * This eliminates the need to use `try/catch` blocks in every async controller.
 * @function catchAsync
 * @param {Function} fn - The async function (controller or middleware) to wrap.
 * @returns {Function} A new function that automatically catches and forwards errors.
 * @example
 * router.get("/users", catchAsync(async (req, res) => {
 *   const users = await User.find();
 *   res.json(users);
 * }));
 */
module.exports = function (fn) {
  return function (request, response, next) {
    Promise.resolve(fn(request, response, next)).catch(next);
  };
};
