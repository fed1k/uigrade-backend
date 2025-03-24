const Question = require('../models/question');
const Hardness = require("../models/hardness")
const { deleteObject } = require('../util/deleteObject');
const { formatObject } = require('../util/formatObject');

// Get all questions by level
exports.getQuestionsByLevel = async (req, res) => {
  try {
    // Step 1: Fetch questions without including 'Hardness' model
    let questions = await Question.findAll({
      attributes: {
        exclude: ['correct_answer']
      }
    });

    questions = questions.map((qstn) => qstn.get({ plain: true }));

    let hardnessRecords = await Hardness.findAll()
    hardnessRecords = hardnessRecords.map((hrd) => hrd.get({ plain: true }))

    questions = questions.map((qstn) => {
      const hardLvl = hardnessRecords.find(el => el.id == qstn.level)

      return {
        ...qstn,
        level_id: hardLvl.id,
        level: hardLvl.name,
      }
    })

    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching questions' });
  }
};


// Add a new question
exports.addQuestion = async (req, res) => {
  const { question_text, level, desc } = req.body;

  const image1 = req.files.image1[0].key
  const image2 = req.files.image2[0].key



  try {
    // const levelP = await Hardness.findByPk(level)

    const newQuestion = await Question.create({
      question_text,
      image1,
      image2,
      level: level,
      desc,
      correct_answer: image1,
    });
    res.json({ status: 200, data: newQuestion });
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

    // delete both images from s3
    await deleteObject(question.image1)
    await deleteObject(question.image2)

    await question.destroy();  // Delete the question
    // Delete the image from S3
    // await deleteObject(question.options.image);
    res.json({ status: 200, message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting question' });
  }
};

exports.editQuestion = async (req, res) => {
  const { id, question_text, level, level_id, desc } = req.body;

  try {
    const question = await Question.findByPk(id);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    if (level) {
      const levelP = await Hardness.findByPk(level_id);
      question.level = levelP.id;
    }

    // Delete the old images from S3
    const image1 = req?.files?.image1?.[0]?.key || question.image1;
    const image2 = req?.files?.image2?.[0]?.key || question.image2;

    // Delete the old images from S3 if new images are uploaded
    if (req?.files?.image1 && question.image1) {
      await deleteObject(question.image1);
      question.image1 = image1;
      question.correct_answer = image1
    }
    if (req?.files?.image2 && question.image2) {
      await deleteObject(question.image2);
      question.image2 = image2;
    }

    // Update the question with the new data
    question.question_text = question_text;
    
    question.desc = desc
    
    await question.save();

    res.json({ status: 200, message: 'Question updated successfully', data: question });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};