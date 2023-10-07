require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const cors = require('cors');
const EventModel = require('./models/Events');
const { v4: uuidv4 } = require('uuid'); //make sure to import this

app.use(express.json());
app.use(cors());
const port = process.env.PORT 
const mongodb_url = process.env.MONGODB_URL;

mongoose.connect(
    mongodb_url
);

//gives us a list of all users
app.get("/users/getUsers", (req, res) => { 
    UserModel.find({}, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

//creates a new user
app.post("/users/createUser", async (req, res) => {  
    try {
      const user = req.body;
      const newUser = new UserModel(user);
      await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({message: "Failed to create user", error: error });
    }
});

//create event with name, description, etc.
app.post("/events/createEvent/:interest/:activity/:desc/:location/:date_time", async (req, res) => { 
    try {
      const {interest, activity, desc, location, date_time} = req.params;
      const newEvent = new EventModel({
        id: uuidv4(),
        interest, 
        activity, 
        desc, 
        location, 
        date_time
      });
      await newEvent.save();
      res.status(200).json(newEvent);
    } catch (error) {
      res.status(500).json({message: "Failed to create event", error: error });
    }
});

// Fetch and update user events using email/pass
app.put('/users/addUserEvent/:email/:password/:eventName', async (req, res) => { 
    const {email, password, eventName} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found' });
    }
    user.events.push(eventName);
    await user.save();
    res.status(200).json(user);
});

//updates attendees of an event
app.put('/events/addEventAttendees/:email/:password/:id', async (req, res) => {
    const {email, password, id} = req.params;
    const event = await EventModel.findOne({id}).exec(); 
    if (!event) {
        return res.status(404).json({message: 'Event not found'});
    }
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    event.attendees.push(user);
    await event.save();
    res.status(200).json(user);
});

app.listen(port, () => {
    console.log("SERVER RUNS")
});