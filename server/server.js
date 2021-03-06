const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");

const request = require('request');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const taskController = require('./controllers/taskController');
const boardController = require('./controllers/boardController');
const storyController = require('./controllers/storyController');
const userController = require('./controllers/userController');
const invitesController = require('./controllers/invitesController');

const Router = require('express-promise-router');
// const router = new Router();

// const fetchMongoData = require('./mongo.js');

const app = express();
const port = process.env.PORT || 3000;
// var index = require('./routes/index');
const publicPath = path.join(__dirname, '..', 'public', 'dist');


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(publicPath));



app.listen(port, () => console.log(`server running on port ${port}`));


/// TASK ROUTES
app.post('/tasksid', taskController.getTasks);
app.post('/tasks', taskController.addTask);
app.post('/updatetasks', taskController.updateTask);
app.delete('/tasks', taskController.deleteTask);
app.get('/alltasks', taskController.getAllTasks);

/// STORY ROUTES
app.post('/storiesid', storyController.getStories);
app.post('/stories', storyController.addStory);
app.post('/updatestories', storyController.updateStory);
app.delete('/stories', storyController.deleteStory);
app.get('/allstories', storyController.getAllStories);

//BOARD ROUTES
app.post('/boardsid', boardController.getBoards);
app.post('/boards', boardController.addBoard);
app.delete('/boards', boardController.deleteBoard);
//app.get('/allboards', boardController.getAllBoards);

//INVITES ROUTES
app.post('/sendInvite', boardController.sendInvite);
app.post('/acceptInvite', boardController.acceptInvite);
app.delete('/rejectInvite', boardController.rejectInvite);
app.post('/getinvites', invitesController.getInvites);

// USER ROUTES
app.post('/authuser', userController.authenticateUser);
app.get('/getusers', (req, res, next) => {
  console.log('got here')
  next()
}, userController.getUsers);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// USER ROUTES
// app.get('/getusers', fetchMongoData, (req, res) => {
//   SimpleUser.find({}, (err, resMongo) => {
//     res.json(resMongo);
//   });
// });

// app.post('/signup', (req, res) => {
//   SimpleUser.find({ name: req.body.username }, (err, resMongo) => {
//     if (resMongo.length) {
//       res.send({ error: 'user exists' });
//     } else {
//       SimpleUser.create(
//         { name: req.body.username, password: req.body.password, isLoggedIn: true },
//         (err, resMongo) => {
//           res.send(resMongo);
//         }
//       );
//     }
//   });
// });

// app.post('/logout', (req, res) => {
//   SimpleUser.findOneAndUpdate({ _id: req.body._id }, { isLoggedIn: false }, (err, resMongo) => {
//     res.send('logged-out');
//   });
// });

// app.post('/login', (req, res) => {
//   SimpleUser.find({ name: req.body.username, password: req.body.password }, (err, resMongo) => {
//     if (resMongo.length) {
//       const userData = resMongo[0];
//       SimpleUser.update(
//         { name: req.body.username, password: req.body.password },
//         { isLoggedIn: true },
//         (err, resMongo) => {
//           console.log(resMongo);
//           res.send(userData);
//         }
//       );
//     } else {
//       res.send({ error: 'username or password incorrect' });
//     }
//   });
// });


// const uri = 'mongodb://scrum:scrum1@ds229701.mlab.com:29701/scrum';

// mongoose
//   .connect(uri)
//   .then(() => console.log('conencted to mongoose'))
//   .catch(e => {
//     response.locals.error = {
//       error: { message: 'mongoose connection error', e },
//       statusCode: 503,
//     };
//     next();
//   });