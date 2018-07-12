const db = require('../db/index.js');

const boardController = {
  getBoards: (req, res) => {
    console.log('inside getboards', req.body);
    const query = `SELECT * FROM board WHERE user_id=${req.body.userId}`;
    db.query(query, '', (err, results) => {
      if (err) res.send(err);
      res.json(results.rows);
    })
  },

  deleteBoard: (req, res) => {
    const query = `DELETE  FROM board WHERE board_id =  ${req.query.id}`;
    db.query(query, '', (err, results) => {
      if (err) res.send(err);
      res.send(results.rows[0]);
    })
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
