const router = require("express").Router();
const Quiz = require("../models/Quiz");
const auth = require("../middleware/auth");

// CREATE QUIZ (ADMIN ONLY)
router.post("/create", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Only admin allowed");
  }

  const quiz = new Quiz(req.body);
  await quiz.save();

  res.send("Quiz Created");
});

// GET ALL QUIZZES
router.get("/", async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

// ✅ GET SINGLE QUIZ BY ID
router.get("/:id", async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  res.json(quiz);
});

module.exports = router;