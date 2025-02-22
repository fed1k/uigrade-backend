const formatObject = (Key) => `${process.env.S3_API_ENDPOINT}/${process.env.S3_BUCKET}/${Key}`;

module.exports = { formatObject };