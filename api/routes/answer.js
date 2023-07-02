const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  CREATE_ANSWER,
  LIKE_ANSWER,
  DISLIKE_ANSWER,
  GET_ALL_QUESTION_ANSWERS,
  GET_ANSWER_BY_ID,
  DELETE_ANSWER_BY_ID, 
} = require("../controllers/answer");

router.post("/question/:id/answers", authMiddleware, CREATE_ANSWER);
router.post("/answer/:id/like", authMiddleware, LIKE_ANSWER);
router.post("/answer/:id/dislike", authMiddleware, DISLIKE_ANSWER);
router.get("/question/:id/answers", GET_ALL_QUESTION_ANSWERS);
router.get("/answer/:id",  GET_ANSWER_BY_ID);
router.delete("/answer/:id", authMiddleware, DELETE_ANSWER_BY_ID);

module.exports = router;