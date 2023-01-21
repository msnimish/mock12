import express from "express";
import { calculate, getAllUsers, getProfile, login, register } from "../controller/user.controller.js";

const user = express.Router();

user.post("/register", register);
user.post("/login", login);

user.get('/', getAllUsers);
user.get('/getProfile/:id', getProfile);
user.patch("/calc/:id", calculate);



export default user;