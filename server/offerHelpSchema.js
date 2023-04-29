
const mongoose = require('mongoose')

const offerHelpSchema = new mongoose.Schema({

    
})

const topicSchema = new mongoose.Schema({
    
})

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 40
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: props =>`${props.value} is not a valid email.`  
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 20
    },
    courseID: {
        type: Number,
        required: true,
    },
    submittedRating: {
        type: Boolean,
        required: true,
        default: false
    },
    tasks: {
        type: [TaskSchema],
        default: []
    },
    goal: {
      title: {
        type: String,
        minlength: 1,
        maxlength: 40,
        default: "No Goal"
      },
      completed: {
        type: Boolean,
        default: false
      }
    },
    completedGoals: [GoalSchema],
    animals: [animalsSchema],
    completedAnimals: [animalsSchema]
});