import db from "../Database/index.js";
// import { model } from "mongoose";
// import * as dao from "./dao.js";

function AssignmentsRoutes(app) {

  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    console.log("CID IS " + cid);
    // const modules = db.modules
    //   .filter((m) => console.log(m.course));//m.course === cid);
    const filteredModules = db.assignments.filter(assignment => assignment.course === cid);
    console.log(filteredModules);
    res.send(filteredModules);
  });

    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });


  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.modules.push(newAssignment);
    res.send(newAssignment);
  });


app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = db.assignments.findIndex(
    (a) => a._id === aid);
    db.assignments[assignmentIndex] = {
    ...db.modules[assignmentIndex],
    ...req.body
    };
    res.sendStatus(204);
});

}
export default AssignmentsRoutes;

