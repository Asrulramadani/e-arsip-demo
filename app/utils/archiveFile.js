const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileStorege = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "app/public/uploads/archives");
  },
  filename: (req, file, cb) => {
    const fileName = `${new Date().getTime()}${new Date().getHours()}.pdf`;

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    req.fileValidationError = true;
    cb(null, false);
  }
};

function deleteFile(filename) {
  fs.rmSync(path.join("app/public/uploads/archives", filename))
  return
}

module.exports = {
  upload: multer({
    storage: fileStorege,
    fileFilter,
  }),
  deleteFile
};
