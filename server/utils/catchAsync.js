module.exports = function (fn) {
  return function (request, response, next) {
    Promise.resolve(fn(request, response, next)).catch(next);
  };
};
