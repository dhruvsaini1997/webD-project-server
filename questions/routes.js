import db from "../Database/index.js";
// import { model } from "mongoose";
// import * as dao from "./dao.js";

function QuestionsRoutes(app) {

  app.get("/api/quizzes/:qid/questions", (req, res) => {
    const { qid } = req.params;
    console.log("Question for QUIZID IS " + qid);
    console.log(db.questions);
    const filteredQuestions = db.questions.filter(questions => questions.quiz === qid);
    console.log(filteredQuestions);
    res.send(filteredQuestions);
  });


  app.get("/api/questions/:quid", (req, res) => {
    const { quid } = req.params;
    const question = db.questions
      .find((q) => q._id === quid);
    if (!question) {
      res.status(404).send("Question not found");
      return;
    }
    res.send(question);
  });

    app.delete("/api/questions/:qid", (req, res) => {
        const { qid } = req.params;
        db.questions = db.questions.filter((q) => q._id !== qid);
        res.sendStatus(200);
    });

  app.post("/api/quizzes/:qid/questions", (req, res) => {
    const { qid } = req.params;
    const newQuestion = {
      ...req.body,
      quiz: qid,
      _id: new Date().getTime().toString(),
    };
    db.questions.push(newQuestion);
    res.send(newQuestion);
  });

app.put("/api/questions/:qid", (req, res) => {
    const { qid } = req.params;
    const questionIndex = db.questions.findIndex(
    (q) => q._id === qid);
    db.questions[questionIndex] = {
    ...db.questions[questionIndex],
    ...req.body
    };
    res.sendStatus(204);
});

}
export default QuestionsRoutes;

