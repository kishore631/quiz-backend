const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: String,
  quizId: String,
  score: Number
});

module.exports = mongoose.model("Result", resultSchema);