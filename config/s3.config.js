const { S3 } = require("@aws-sdk/client-s3");

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  endpoint: process.env.S3_API_ENDPOINT,
  region: "auto",
});

module.exports = { s3 };