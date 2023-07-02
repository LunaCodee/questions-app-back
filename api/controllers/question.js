const QuestionModel = require("../models/questionModel");
const UserModel = require("../models/userModel");
const uniqid = require("uniqid");

module.exports.CREATE_QUESTION = async (req, res) => {
   try {
    const question = new QuestionModel({
      id: uniqid(),
        question_text:req.body.question_text,
    })

    const createdQuestion = await question.save();

    UserModel.updateOne(
        { id: req.body.userId },
        { $push: { asked_questions_ids: question.id } }
      ).exec();
  
      return res.status(200).json({ response: "Question was created" });
    } catch (err) {
      console.log("err", err);
      return res.status(500).json({ response: "ERROR" });
    }
  };
  

module.exports.GET_ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find().sort({ name: 1 });;
    res.status(200).json({ questions: questions });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "ERROR, please try later" });
  }
};

module.exports.GET_QUESTION_BY_ID = async (req, res) => {
  try {
    const questionId = req.params.id; 
    const question = await QuestionModel.findById(questionId); 
    if (!question) {
      return res.status(404).json({ response: "Question not found" });
    }
    res.status(200).json({ question });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "ERROR, please try later" });
  }
};



module.exports.DELETE_QUESTION_BY_ID = async (req, res) => {
  try {
    const question = await QuestionModel.deleteOne({ id: req.params._id });
    res.status(200).json({ question: question });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "ERROR, please try later" });
  }
};
