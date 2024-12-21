const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  mobile: {
    type: String
  },
  institute: {
    type: String
  },
  board_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'board_and_classes'
  },
  subject_id : {
    type: mongoose.Schema.ObjectId,
    ref: 'subject_and_standards'
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

userSchema.virtual("boards", {
  ref: "board_and_class",
  foreignField: "_id",
  localField: "board_id"
});

userSchema.virtual("subjects", {
  ref: "subject_and_standards",
  foreignField: "_id",
  localField: "subject_id"
});

const User = mongoose.model('User', userSchema);

module.exports = User;