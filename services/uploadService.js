const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const { s3 } = require("../config/s3.config");

const uploadService = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: "public-read",
    metadata(req, file, callback) {
      callback(null, { fieldName: file.fieldname });
    },
    contentType: function (req, file, cb) {
      cb(null, file.mimetype);
    },
    key: function (req, file, cb) {
      cb(
        null,
        `image-${Math.floor(Math.random() * 100000)}-${file.originalname}`
      );
    },
  }),

  fileFilter(req, file, callback) {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return callback(null, true);
    }

    callback("Invalid file format! Please upload an image.", false);
  },

  limits: { fileSize: 1000000 * 5 }, // 5MB limit
});

module.exports = uploadService;