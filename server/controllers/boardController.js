const db = require('../db/index.js');

const boardController = {
  getBoards: (req, res) => {
    const query = `SELECT * FROM board WHERE user_id=${req.body.userId}`;
    db.query(query, '', (err, results) => {
      if (err) res.send(err);
      res.json(results.rows);
    })
  },

  deleteBoard: (req, res) => {
    console.log('inse od deleteBoard ',req.body);
    const query = `BEGIN;
    DELETE FROM story WHERE board_id = ${req.body.board_id}; 
    DELETE FROM task WHERE board_id = ${req.body.board_id};
    DELETE FROM board WHERE board_id=${req.body.board_id} RETURNING *;
    COMMIT;`;
    //const query = `DELETE FROM board WHERE board_id=${req.body.board_id} RETURNING *`;
    db.query(query, '', (err, results) => {
      if (err) res.send(err);
      res.json(results.rows);
    })
  },

  addBoard: (req, res) => {
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
    Board.find({}, (err, tasks) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  }
}

module.exports = boardController;
