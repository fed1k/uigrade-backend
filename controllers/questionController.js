const Question = require('../models/question');
const { deleteObject } = require('../util/deleteObject');
const { formatObject } = require('../util/formatObject');

// Get all questions by level
exports.getQuestionsByLevel = async (req, res) => {
  // const { level } = req.params;
  
  try {
    let questions = await Question.findAll({
      attributes: { 
        exclude: ['correct_answer'] 
      }
    });

    // Use map function to loop through each question and format the image key
    // questions = questions.map((question) => formatObject(question.options.image));

    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching questions' });
  }
};

// Add a new question
exports.addQuestion = async (req, res) => {
  const { question_text, level } = req.body;

  const image1 = req.files.image1[0].key
  const image2 = req.files.image2[0].key
  
  // console.log(question_text, level, image1, image2)
  try {
    const newQuestion = await Question.create({
      question_text,
      image1,
      image2,
      level,
      correct_answer: image1,
    });
    res.json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: 'Error adding question' });
  }
};

exports.deleteQuestion = async (req, res) => {
  const { id } = req.body;  // Get the question ID from the request body

  if (!id) {
    return res.status(400).json({ error: 'No question ID provided' });
  }

  try {
    const question = await Question.findByPk(id);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    await question.destroy();  // Delete the question
    // Delete the image from S3
    // await deleteObject(question.options.image);
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting question' });
  }
};
