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

app.put('/users/initializeCourseTopics/:email/:password/:courseid', async(req,res) => {
    const {email, password, courseid} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user)
    {
        return res.status(404).json({message: 'User not found'});
    }
    if (courseid == "8113")
    {
        const topic1 = {
            name: "Arrays",
            unlocked:true
        }
        const topic2 = {
            name: "Linked-Lists",
            unlocked: false
        }
        const topic3 = {
            name: "Stacks and Queues",
            unlocked: false
        }
        const topic4 = {
            name: "Hashmap and Hashset",
            unlocked: false
        }
        const topic5 = {
            name: "Trees",
            unlocked: false
        }
        const topic6 = {
            name: "Searching/Sorting Algorithms",
            unlocked: false
        }
        const course = {
            name: "Data Structures",
            instructor: "Dr. Centeno",
            topics: [topic1, topic2, topic3, topic4, topic5, topic6],
            courseid: 8113
        }
    }
    user.courses.push(course);
    user.topics.push(topic1,topic2,topic3,topic4, topic5, topic6);
    await(user.save);
    res.status(200).json(user);
});

app.put("/users/unlockTopic/:email/:password/:topicname", async(req,res) => {
    const {email, password, topicname} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    if (user.admin === true)
    {
        for (let i = 0; i < user.topics.length; i++)
        {
            let thisTopic = user.topics[i];
            if (topicname === thisTopic)
            {
                thisTopic.unlocked = true;
                await user.save();
                res.status(200).json(user);
            }
        }
        return res.status(404).json({message: 'Topic not found'});
    }
    return res.status(403).json({message: 'Unauthorized access'});
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
    const topics = user.courses.topics;
    res.status(200).json(topics);
});

app.listen(port, () => {
    console.log("SERVER RUNS")
});


