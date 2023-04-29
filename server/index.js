require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/Users');
const cors = require('cors');


app.post("/users/createUser",async (req,res) =>{

    try {
        const user = req.body;
        const newUser = new UserModel(user);
        await newUser.save();
        res.status(200).json(user);

    }
    catch(error){
        res.status(500).json({message:"Failed to create user", error:error});
    }

}
);


app.get("/users/getUsers", (req, res) => {
    UserModel.find({}, (err,result) => {
        if (err){
            res.status(404).json(err);
        }
        else{
            res.statusCode(200).json(result);
        }
    });
}
);