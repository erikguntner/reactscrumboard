const Task = require('../models/task');
const db = require('../db/index.js');


const taskController = {

  getAllTasks: (req, res) => {
    Task.find({}, (err, tasks) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },

  deleteTask: (req, res) => {
    console.log(req.body);
    const query = `DELETE FROM task WHERE task_id=${parseInt(req.body.task_id)} RETURNING *`;
    db.query(query, '', (err, results) => {
      if (err) res.send(err);
      res.json(results.rows);
    })
  },

  getTasks: (req, res) => {
    const query = `SELECT * FROM task WHERE board_id=${parseInt(req.body.board_id)}`;
    db.query(query, '', (err, results) => {
      if (err) res.send(err);
      res.json(results.rows);
    })
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