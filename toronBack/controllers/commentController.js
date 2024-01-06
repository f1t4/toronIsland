// toronBack/controllers/commentController.js

const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../config/db'); 
const router = express.Router();

router.get('/comments', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM user_activity');
    res.json(results);
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ error: 'Error getting comments' });
  }
});

router.post('/comments', bodyParser.json(), async (req, res) => {
    try {
      const { username, content } = req.body;

      const boardState = '11';
      const boardContent = 's111';
      const userId = 1;
      
      console.log('Attempting to insert into board table...');
      const [boardResult] = await pool.query(
        'INSERT INTO board (state, board_content) VALUES (?, ?)',
        [boardState, boardContent]
      );
  
      console.log('Attempting to insert into user_activity table...');
      const [result] = await pool.query(
        'INSERT INTO user_activity (board_id, id, comment_content) VALUES (?, ?, ?)',
        [boardResult.insertId, userId, content]
      );
  
      const newComment = {
        id: result.insertId,
        username,
        content,
      };
      res.json(newComment);
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Error adding comment' });
    }
  });

router.get('/users', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM user');
    res.json(results);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Error getting users' });
  }
});

router.post('/users', bodyParser.json(), async (req, res) => {
  try {
    const { password, email, provider, provider_id, nickname } = req.body;

    const [result] = await pool.query(
      'INSERT INTO user (password, email, provider, provider_id, nickname) VALUES (?, ?, ?, ?, ?)',
      [password, email, provider, provider_id, nickname]
    );

    const newUser = {
      id: result.insertId,
      password,
      email,
      provider,
      provider_id,
      nickname,
    };
    res.json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Error adding user' });
  }
});

module.exports = router;