import User from "../model/user.model.js";
import jwt from "jsonwebtoken";


export const register = async (req,res) => {
    try{
        let { name,email, password } = req.body;
        // console.log(req.body);
        let user = await User.findOne({email:email});
        // console.log(user);
        if(user.email){
            return res.status(400).json({message:"User already exists"});
        }else{
            let newUser = new User({
                name,
                email,
                password
            });
            newUser.save();
            return res.status(201).json(newUser);
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Something went wrong in register API"});
    }
}

export const login = async (req,res) => {
    try{
        let { email, password } = req.body;
        let user = await User.findOne({email:email});
        if(!user){
            res.status(400).json({message:"User not found"});
        }else{
            if(user.password!== password){
                res.status(400).json({message:"Wrong password"});
            }else{
                let token = jwt.sign({_id: user._id, name: user.name, email:user.email, password: user.password},process.env.JWT_SECRET,{expiresIn:"1h"});
                res.status(200).json({token});
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong in login API"});
    }
}

export const getAllUsers = async (req,res) => {
    try{
        let users = await User.find();
        res.status(200).json(users);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong in getAllUsers API"});
    }
}

export const getProfile = async (req,res) => {
    try{
        console.log(req.params);
        let user = await User.findById(req.params.id);
        console.log(user);
        if(!user){
            res.status(400).json({message:"User not found"});
        }else{
            res.status(200).json(user);
        }

    }catch(err){
        console.log(err)
        res.status(500).send({message:"Something went wrong in getProfile API"});
    }
}

export const calculate = async(req,res) => {
    try{
        let data = await User.findById({_id:req.params.id});
        if(!req.body.interestRate || !req.body.years || !req.body.installmentAmt){
            res.status(400).json({message:"Incomplete data"});
        }else{
            data.interestRate = req.body.interestRate;
            data.installmentAmt = req.body.installmentAmt;
            data.years = req.body.years;
            data.interestRate = data.interestRate/100;
            data.maturityValue = data.installmentAmt*((((1+data.interestRate)**data.years)-1)/data.interestRate);
            data.investmentAmt = data.installmentAmt*data.years;
            data.interestAmt = data.maturityValue-data.investmentAmt;
            await data.save();
            res.status(200).send(data);
        }
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Something went wrong in calculate API"});
    }
}