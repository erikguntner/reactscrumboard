const Task = require('../models/task');
const db = require('../db/index.js');


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

    const query = 'INSERT INTO task (name, board_id, status) VALUES($1, $2, $3) RETURNING *';
    const values = [`${req.body.name}`, `${req.body.boardId}`, `${req.body.status}`];
    db.query(query, values, (err, results) => {
      if (err) console.log('THIS IS ERROR ', err);
      else {
        res.json(results.rows[0]);
      }
    });
  },

  updateTask: (req, res) => {
    Task.findOneAndUpdate({ _id: req.body._id }, { status: req.body.status }, { new: true }, (err, task) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  }
}

module.exports = taskController;