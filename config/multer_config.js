const multer = require("multer");

// storage to store our files/image in the memomry
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;
