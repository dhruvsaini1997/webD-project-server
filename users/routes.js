import { model } from "mongoose";
import * as dao from "./dao.js";
function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
      };

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
      const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);};



    const findUserById = async (req, res) => {
        // const id = req.params.id;
        const { userId } = req.params;
        console.log(userId)
        const user = await dao.findUserById(userId);
        res.json(user);
        };
    const findUserByUsername = async (req, res) => {
        const { username } = req.params;
        const user = await dao.findUserByUsername(username);
        res.json(user);
    };
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        const currentUser = await dao.findUserById(userId);
        req.session['currentUser'] = currentUser;
        res.json(status);
      };
    
      const signup = async (req, res) => {
        const user = await dao.findUserByUsername(
          req.body.username);
        if (user) {
          res.status(400).json(
            { message: "Username already taken" });
        }
        const currentUser = await dao.createUser(req.body);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
      };
    

      const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
      };
    
    const account = async (req, res) => {
        res.json(req.session['currentUser']);
      };
    

    const signout = (req, res) => {
        req.session.destroy();
        res.json(200);
      };
    
      
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.post("/api/users/signin", signin);
    app.post("/api/users/account", account);
    app.get("/api/users/:userId", findUserById);
    app.get("/api/users/username/:username", findUserByUsername);
    app.post("/api/users", createUser);    
    //   app.get("/api/users/:username/:password", findUserByCredentials);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    //   app.post("/api/users/signup", signup);
    //   app.post("/api/users/signin", signin);
      app.post("/api/users/signout", signout);
    //   app.post("/api/users/account", account);
}
export default UserRoutes;

