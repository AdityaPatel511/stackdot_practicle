const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb://localhost:27017/stack-dot';
const bodyParser  = require('body-parser');
const User = require('./models/User');
const BoardAndClass = require('./models/BoardAndClass');
const SubjectAndStandard = require('./models/StandarsAndSubjects');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

app.post('/api/register', async (req, res) => {
    // console.log(req.body);
    try {
        var lowerInstitute = req.body.institute.toLowerCase();
        var boardAndClass;
        var subjectAndStandard;
        if(lowerInstitute == 'school'){
            const boardClassData = {
                "education_board" : req.body.education_board,
                "medium" : req.body.medium,
                "class_category" : req.body.class_category
            };

            boardAndClass = new BoardAndClass(boardClassData);
            boardAndClass.save();
            
            const subjectAndStandardData = {
                "standard" : req.body.standard,
                "subjects" : req.body.subjects 
            }


            // var newCategory = req.body.class_category.replace(/ /g, "_").toLowerCase();
            // if(newCategory == '"higher_secondary'){
            // }
            subjectAndStandard = new SubjectAndStandard(subjectAndStandardData);
            subjectAndStandard.save();
            
        }

        const userData = {
            "name" : req.body.name,
            "email" : req.body.email,
            "mobile" : req.body.mobile,
            "subject_id" : subjectAndStandard._id,
            "board_id" : boardAndClass._id,
        }
        console.log(userData)
        const user = new User(userData);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

app.get('/api/getUsers', async (req,res) => {
    const users = await User.find().populate('boards').populate('subjects');
    res.status(200).send(users)
})
app.listen(3000, () => {
    console.log('Server started on port 3000');
});