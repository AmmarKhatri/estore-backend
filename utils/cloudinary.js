const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "empressapp",
  api_key: 281543638922563,
  api_secret: "fQrqowQRyyk6UfeAGboFquSPIss",
});

module.exports = cloudinary;