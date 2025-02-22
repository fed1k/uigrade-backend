const Result = require('../models/result');
const Question = require('../models/question');

// Submit an answer and calculate score
exports.submitAnswer = async (req, res) => {
  const { answers } = req.body; // { question_id: selected_answer }

  let score = 0;
  let levelStatistics = { easy: 0, medium: 0, hard: 0 };

  for (let [questionId, userAnswer] of Object.entries(answers)) {
    const question = await Question.findByPk(questionId);

    if (!question) {
      continue; // If no question found, skip
    }

    const isCorrect = question.correct_answer === userAnswer;
    if (isCorrect) {
      score++;
      levelStatistics[question.level] = (levelStatistics[question.level] || 0) + 1;
    }
  }

  try {
    const result = await Result.create({ score, level_statistics: levelStatistics });
    res.json({ result: 'success', score, correct_answers: levelStatistics });
  } catch (err) {
    res.status(500).json({ error: 'Error submitting answers' });
  }
};

exports.checkAnswer = async (req, res) => {
  const { question_id, answer } = req.body;

  try {

    const question = await Question.findByPk(question_id);
    if (answer === question.correct_answer) {
      res.json({ status: 200, correct: true })
    } else {
      res.json({ stauts: 200, correct: false, correct_one: question.correct_answer })
    }
  } catch (err) {
    res.status(500).json({ error: 'Error checking the question' });
  }
}
