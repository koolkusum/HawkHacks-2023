
const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1, 
    maxlength: 40
  },
  unlocked: {
    type: Boolean,
    required: true,
    default: false
  },
  avgRating: {
      type: Number,
      required: false
  },
  rateValue: {
      type: Number, //find a way to calculate rating as an average of (rating1 + rating2 +...)/# of ratings
      required: true,
      min: 1,
      max: 5
  },
  completed: {
      type: Boolean,
      required: true,
      default: false,
  }
});

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 40
    },
    instructor: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 40
    },
    topics: {
        type: [topicSchema],
        default: []
    },
    courseRating: {
        type: Number, //average of (topic1rating + topic2rating + ....) / # of topics
        required: true,
        default: 0
    },
    courseID: {
        type: Number,
        required: true
    }
});

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
    courses: {
      type: [courseSchema],
      default: []
    },
    topics: {
        type: [topicSchema],
        default: []
    },
    offerHelp: {
        type: Boolean,
        required: true,
        default: false
    }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel