const mongoose = require("mongoose");

const FileUploadSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  photo: String, // base64
  signature: String, // base64
  results: [String] // array of base64 strings
});

module.exports = mongoose.model("FileUpload", FileUploadSchema);
