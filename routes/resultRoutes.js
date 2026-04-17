const router = require("express").Router();
const Result = require("../models/Result");
const Quiz = require("../models/Quiz");
const auth = require("../middleware/auth");

router.post("/submit", auth, async (req, res) => {
  const { quizId, answers } = req.body;

  const quiz = await Quiz.findById(quizId);

  let score = 0;

  quiz.questions.forEach((q, i) => {
    if (q.correctAnswer === answers[i]) score++;
  });

  await new Result({
    userId: req.user.id,
    quizId,
    score
  }).save();

  res.json({ score });
});

module.exports = router;