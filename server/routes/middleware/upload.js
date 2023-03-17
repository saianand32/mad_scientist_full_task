const multer = require("multer");
const MAX_FILE_SIZE = 6 * 1024 * 1024;

const upload = multer({ limits: { fileSize: MAX_FILE_SIZE } });
module.exports = upload