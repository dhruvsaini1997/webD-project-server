// const express = require("express");
import session from "express-session";
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import ModuleRoutes from "./modules/routes.js";
import CourseRoutes from "./courses/routes.js";
import AssignmentsRoutes from "./assignments/routes.js";
import QuizRoutes from "./quizzes/routes.js";
import QuestionsRoutes from "./questions/routes.js";

import "dotenv/config";

// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas-cs5610-fa23'
// mongoose.connect(CONNECTION_STRING);


// Connect to MongoDB
mongoose.connect("mongodb+srv://giuseppi:supersecretpassword@cluster0.g1irwku.mongodb.net/kanbas-cs5610-fa23?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log("Mongo is connected.");
});


const app = express();
app.use(
    cors({
      credentials: true,
      origin: "https://main--jolly-basbousa-fa20d1.netlify.app/"
    })
  );
  
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
    };
    if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));
  
app.use(express.json());

QuizRoutes(app);
QuestionsRoutes(app);
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentsRoutes(app);
Lab5(app);
HelloRoutes(app);
// app.listen(4000);
app.listen(process.env.PORT || 4000);

