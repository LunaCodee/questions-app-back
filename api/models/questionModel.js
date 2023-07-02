const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  id: { type: String, required: true, minlength: 3 },
    // _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    question_text: { type: String, required: true },
    answers_ids: { type: Array, required: true },
  });


module.exports = mongoose.model("Question", questionSchema);