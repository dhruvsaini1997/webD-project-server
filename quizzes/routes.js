import db from "../Database/index.js";

function QuizzesRoutes(app) {

  app.get("/api/courses/:cid/quizzes", (req, res) => {
    const { cid }  = req.params;
    const filteredQuizzes = db.quizzes.filter(quizzes => quizzes.course === cid);
    console.log(filteredQuizzes);
    res.send(filteredQuizzes);
  });

  app.get("/api/quizzes/:qid", (req, res) => {
    const { qid }  = req.params;
    const filteredQuizzes = db.quizzes.find(quizzes => quizzes._id === qid);
    console.log(filteredQuizzes);
    res.send(filteredQuizzes);
  });

    app.delete("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        db.quizzes = db.quizzes.filter((q) => q._id !== qid);
        res.sendStatus(200);
    });

  app.post("/api/courses/:cid/quizzes", (req, res) => {
    const { cid } = req.params;
    const newQuiz = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.quizzes.push(newQuiz);
    res.send(newQuiz);
  });

  app.put("/api/quizzes/:qid", (req, res) => {
    const { qid } = req.params;
    const quizIndex = db.quizzes.findIndex((q) => q._id === qid);
  
    if (quizIndex !== -1) {
      db.quizzes[quizIndex] = {
        ...db.quizzes[quizIndex],
        ...req.body
      };
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: 'Quiz not found' });
    }
  });

app.put('/api/quizzes/:quizId/published', (req, res) => {
  const quizId = req.params.quizId;
  const quizIndex = db.quizzes.findIndex(quiz => quiz._id === quizId);

  if (quizIndex !== -1) {
    db.quizzes[quizIndex].published = !db.quizzes[quizIndex].published;
    res.json({ published: db.quizzes[quizIndex].published });
  } else {
    res.status(404).json({ error: 'Quiz not found' });
  }
});


}
export default QuizzesRoutes;

