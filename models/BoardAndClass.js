const mongoose = require('mongoose');
const boardandclassSchema = new mongoose.Schema({
  education_board : {
    type: String
  },
  medium : {
    type: String
  },
  class_category : {
    type: String
  }
})

const BoardAndClass = mongoose.model('board_and_class', boardandclassSchema);

module.exports = BoardAndClass;