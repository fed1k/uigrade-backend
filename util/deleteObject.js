const { s3 } = require("../config/s3.config");

const deleteObject = (Key) =>
  new Promise((resolve, reject) => {
    s3.deleteObject({
      Bucket: process.env.S3_BUCKET,
      Key,
    }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

module.exports = { deleteObject };