const Board = require('../models/board');

const boardController = {
  getBoards: (req, res) => {
      const query = `SELECT * FROM board WHERE user_id =  ${req.query.id}`;
      db.query(query, '', (err, results) =>{
        if (err) res.send(err);
        res.send(results.rows[0]);
      })
      },

  deleteBoard: (req, res) => {
    const query = `DELETE  FROM board WHERE board_id =  ${req.query.id}`;
      db.query(query, '', (err, results) =>{
        if (err) res.send(err);
        res.send(results.rows[0]);
      })
  },

  addBoard: (req, res) => {

  },

  getAllBoards: (req, res) => {
    console.log(res);
    Board.find({}, (err, tasks) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  }
}

module.exports = boardController;
