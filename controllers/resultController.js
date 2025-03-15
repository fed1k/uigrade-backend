const Result = require('../models/result');
const Question = require('../models/question');
const Hardness = require("../models/hardness")
const Grade = require("../models/grade")

const { Op } = require("sequelize")

// Submit an answer and calculate score
exports.submitAnswer = async (req, res) => {
  
};

exports.checkAnswer = async (req, res) => {
  const { question_id, answer, result_id } = req.body;

  console.log(question_id, answer, result_id)

  try {
    // Run both queries in parallel
    const [questiono, resulto] = await Promise.all([
      Question.findByPk(question_id),
      Result.findByPk(result_id),
    ]);

    // Check if both question and result are found
    if (!questiono) {
      return res.status(404).json({ error: 'Question not found' });
    }
    if (!resulto) {
      return res.status(404).json({ error: 'Result not found' });
    }

    if (answer === questiono.correct_answer) {
      
      const hardnessRecord = await Hardness.findOne({
        where: {
          name: questiono.level
        }
      });


      resulto.correct_count += 1
      resulto.score += hardnessRecord.point

      const properGrade = await Grade.findOne({
        where: {
          min_point: {
            [Op.lte]: resulto.score // Ensure that yourValue is greater than or equal to min_point
          },
          max_point: {
            [Op.gte]: resulto.score // Ensure that yourValue is less than or equal to max_point
          }
        }
      });

      resulto.grade = properGrade.name

      const maxQuestionId = await Question.max('id'); // Get the max question_id
      if (question_id === maxQuestionId) {
        // If it's the last question, mark the result as complete
        resulto.status = 'complete';
      }


      await resulto.save();

      res.json({ status: 200, correct: true });
    } else {
      resulto.wrong_count += 1
      await resulto.save();

      res.status(200).json({ status: 200, correct: false, correct_one: questiono.correct_answer });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createResult = async (req, res) => {
  try {
    const result = await Result.create();
    res.status(200).json({ status: 200, id: result.id });
  } catch (err) {
    res.status(500).json({ error: 'Error creating result' });
  }
}

exports.markInComplete = async(req, res) => {
  
  const {result_id} = req.body
  try {
    const result = await Result.findByPk(result_id)
    result.status = "incomplete"

    await result.save();
  } catch (err) {
    res.status(500).json({error: "Error marking incomplete"})
  }
}

exports.getResult = async(req, res) => {
  const {result_id} = req.params

  try {
    const result = await Result.findByPk(result_id)

    if (!result) {
      return res.status(404).json({ error: 'Result not found' });
    }

    res.status(200).json({status: 200, data: result})


  } catch (err) {
    res.status(500).json({error: "Error getting final result"})
  }
}