const mongoose = require('mongoose');
const standardandsubjectSchema = new mongoose.Schema({
  standard : {
    type: String
  },
  subjects : {
    type: [String],
  }
})

const StandardAndSubject = mongoose.model('subject_and_standards', standardandsubjectSchema);

module.exports = StandardAndSubject;