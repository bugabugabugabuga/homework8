const { isValidObjectId } = require("mongoose");

function checkDirectorHeader(req, res, next) {
  const directorId = req.headers["director-id"];

  if (!directorId || !isValidObjectId(directorId)) {
    return res.status(400).json({ message: "Valid director-id header is required" });
  }

  req.directorId = directorId;

  next();
}

module.exports = checkDirectorHeader;
