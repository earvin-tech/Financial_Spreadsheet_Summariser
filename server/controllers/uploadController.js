/**
 * Controller to handle file uploads.
 *
 * Currently just returns metadata of uploaded file.
 * @param {import("express").Request} request - Express request object containing the file.
 * @param {import("express").Response} response - Express response object used to return the result.
 * @param {import("express").NextFunction} next - Express next function to pass errors.
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
const handleUpload = (request, response, next) => {
  if (!request.file) {
    return response.status(400).json({ message: "No file uploaded" });
  }

  response.status(200).json({
    message: "File uploaded successfully",
    file: {
      originalname: request.file.originalname,
      mimetype: request.file.mimetype,
      size: request.file.size,
    },
  });
};

module.exports = { handleUpload };
