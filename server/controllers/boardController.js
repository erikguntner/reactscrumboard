const db = require('../db/index.js');

const boardController = {
  getBoards: (req, res) => {

  },

  deleteBoard: (req, res) => {
    Board.deleteOne({ _id: req.body._id }, (err, task) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },

  addBoard: (req, res) => {
    console.log(req.body);
    const query = 'INSERT INTO board (user_id, title) VALUES($1, $2) RETURNING *';
    const values = [`${req.body.userId}`, `${req.body.title}`];
    db.query(query, values, (err, results) => {
      if (err) console.log('THIS IS ERROR ', err);
      else {
        res.json(results.rows[0]);
      }
    });

  },

  getAllBoards: (req, res) => {
    console.log(res);
    Board.find({}, (err, tasks) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  }
}

module.exports = boardController;
