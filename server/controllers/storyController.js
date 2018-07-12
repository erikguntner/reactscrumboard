const Story = require('../models/story');
const db = require('../db/index.js');

const storyController = {
  getAllStories: (req, res) => {
    Story.find({}, (err, stories) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },

  getStories: (req, res) => {
    const query = `SELECT * FROM story WHERE board_id=${parseInt(req.body.board_id)}`;
    db.query(query, '', (err, results) => {
      if (err) res.send(err);
      res.json(results.rows);
    })
  },

  addStory: (req, res) => {
    const query = 'INSERT INTO story (board_id, task, completed) VALUES($1, $2, $3) RETURNING *';
    const values = [`${req.body.board_id}`, `${req.body.task}`, `${req.body.completed}`];
    db.query(query, values, (err, results) => {
      if (err) console.log('THIS IS ERROR ', err);
      else {
        res.json(results.rows[0]);
      }
    });
  },

  deleteStory: (req, res) => {
    console.log(req.body);
    const query = `DELETE FROM story WHERE story_id=${req.body.story_id} RETURNING *`;
    db.query(query, '', (err, results) => {
      if (err) res.send(err);
      res.json(results.rows);
    })
  },

  updateStory: (req, res) => {
    Story.findOneAndUpdate({ _id: req.body._id }, { done: req.body.done }, { new: true }, (err, story) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  }
};

module.exports = storyController;
