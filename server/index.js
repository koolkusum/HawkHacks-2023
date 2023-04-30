require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const cors = require('cors');

app.use(express.json());
app.use(cors());
const port = process.env.PORT 
const mongodb_url = process.env.MONGODB_URL;

mongoose.connect(
    mongodb_url
);

function checkDate(datetime)
{
    const now = new Date();
    const unlockDate = new Date(datetime);
    if (now.getTime() === unlockDate.getTime()) {
      return true;
    } 
    else {
      return false;
    }
};


app.post("/users/createUser", async (req,res) =>{

    try {
        const user = req.body;
        const newUser = new UserModel(user);
        await newUser.save();
        res.status(200).json(user);

    }
    catch(error) {
        res.status(500).json({message:"Failed to create user", error:error});
    }

}
);

app.get("/users/getUser/:email/:password", async (req, res) => {
    const { email, password } = req.params;
    const user = await UserModel.findOne({ email, password }).exec();
    if (!user) {
      return res.status(404).json({message: "User not found or password is incorrect." });
    }
    res.status(200).json({user});
});

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

app.put('/users/initializeCourse/:email/:password', async(req,res) => {
    const {email, password} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user)
    {
        return res.status(404).json({message: 'User not found'});
    }
    const course = {
        name: "Data Structures",
        instructor: "Dr. Centeno",
        //topics: [],
        courseid: 8113
    }
    user.courses.push(course);
    await user.save();
    res.status(200).json(user);
});

app.put('/users/initializeCourseTopics/:email/:password', async(req,res) => {
    const {email, password} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user)
    {
        return res.status(404).json({message: 'User not found'});
    }
    const topic1 = {
        name: "Arrays",
        unlocked:false,
        date: '04/30/2023 5:00 AM'
    }
    const topic2 = {
        name: "Linked-Lists",
        unlocked: false,
        date: '09/20/2023 12:00 AM'
    }
    const topic3 = {
        name: "Stacks and Queues",
        unlocked: false,
        date: '09/25/2023 1 2:00 AM'
    }
    const topic4 = {
        name: "Hashmap and Hashset",
        unlocked: false,
        date: '09/27/2023 12:00 AM'
    }
    const topic5 = {
        name: "Trees",
        unlocked: false,
        date: '10/02/2023 12:00 AM'
    }
    const topic6 = {
        name: "Searching/Sorting Algorithms",
        unlocked: false,
        date: '10/04/2023 12:00 AM'
    }
    user.courses[0].topics.push(topic1,topic2,topic3,topic4,topic5,topic6);
    //user.topics.push(topic1,topic2,topic3,topic4, topic5, topic6);
    await user.save()
    res.status(200).json(user);
});



app.put("/users/unlockTopic/:email/:password", async(req,res) => {
    const {email, password} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    for (let i = 0; i < user.topics.length; i++)
    {
        let thisTopic = user.courses[0].topics[i];
        if (checkDate(thisTopic.date) === true)
        {
            thisTopic.unlocked = true;
            await user.save();
            res.status(200).json(user);
            }
        }
        return res.status(404).json({message: 'Topic not found'});
});

// app.put("/users/rateTopic/:email/:password/:rateValue", async (req, res) => {
//     const {email, password} = req.params;
//     const user = await UserModel.findOne({email, password}).exec();
//     if (!user) {
//         return res.status(404).json({message: 'User not found'});
//     }
//     const rateValue = getElementByI

//     if (user.admin != true) //only a student without admin access should be able rate a topic
//     {
        
//     }
//     await user.save();
//     res.status(200).json(user);
// });

app.get("/users/getCourseID/:email/:password", async (req, res) => {
    const {email, password} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    const courseid = user.courses[0].courseid;
    res.status(200).json(courseid);
});

app.get("/users/getCourse/:email/:password", async (req, res) => {
    const {email, password} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    const courses = user.courses;
    res.status(200).json(courses);
});

app.get("/users/getTopics/:email/:password", async (req, res) => {
    const {email, password, courseid} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    const topics = user.courses[0].topics;
    res.status(200).json(topics);
});

app.listen(port, () => {
    console.log("SERVER RUNS")
});


