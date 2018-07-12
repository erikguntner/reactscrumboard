const Task = require('../models/task');

const taskController = {

  getAllTasks: (req, res) => {
    Task.find({}, (err, tasks) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },

  deleteTask: (req, res) => {
    Task.deleteOne({ _id: req.body._id }, (err, task) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },

  getTasks: (req, res) => {
    Task.find({ boardId: req.query.id }, (err, tasks) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },

  addTask: (req, res) => {

  },

  updateTask: (req, res) => {
    Task.findOneAndUpdate({ _id: req.body._id }, { status: req.body.status }, { new: true }, (err, task) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  }
}

module.exports = taskController;