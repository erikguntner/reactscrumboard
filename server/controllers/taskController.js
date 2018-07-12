const Task = require('../models/task');

const taskController = {

  getAllTasks: (req, res) => {
    Task.find({}, (err, tasks) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },

  deleteTask: (req, res) => {
    const query = `DELETE  FROM task WHERE task_id =  ${req.body.task_id}`;
    db.query(query, '', (err, results) => {
      if (err) res.send(err);
      res.json(results.rows);
    })
  },

  getTasks: (req, res) => {
    console.log('inside getboards', req.body.board_id);
    const query = `SELECT * FROM task WHERE board_id=${req.body.board_id} RETURNING *`;
    db.query(query, '', (err, results) => {
      if (err) res.send(err);
      res.json(results.rows);
    })
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