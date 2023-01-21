import express from "express";
import { calculate, getAllUsers, getProfile, login, register } from "../controller/user.controller.js";

const user = express.Router();

user.post("/register", register);
user.post("/login", login);

user.get('/', getAllUsers);
user.get('/getProfile', getProfile);
user.patch("/calc", calculate);



export default user;