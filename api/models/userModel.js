const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    id: { type: String, required: true, minlength: 3 },
    // _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, minlength: 8 },
    password: { type: String, required: true, minlength: 6 },
    asked_questions_ids: { type: Array, required: true  },
});

module.exports = mongoose.model("User", userSchema);

