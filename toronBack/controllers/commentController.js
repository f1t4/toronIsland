// toronBack/controllers/commentController.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const router = express.Router();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Jiok0116!',
  database: 'Toron',
});

//MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

router.get('/comments', (req, res) => {
  connection.query('SELECT * FROM comments', (err, results) => {
    if (err) {
      console.error('Error getting comments:', err);
      res.status(500).json({ error: 'Error getting comments' });
    } else {
      res.json(results);
    }
  });
});

router.post('/comments', bodyParser.json(), (req, res) => {
  const { username, content } = req.body;

  connection.query(
    'INSERT INTO comments (username, content) VALUES (?, ?)',
    [username, content],
    (err, result) => {
      if (err) {
        console.error('Error adding comment:', err);
        res.status(500).json({ error: 'Error adding comment' });
      } else {
        const newComment = {
          id: result.insertId,
          username,
          content,
        };
        res.json(newComment);
      }
    }
  );
});

router.get('/users', (req, res) => {
    connection.query('SELECT * FROM user', (err, results) => {
      if (err) {
        console.error('Error getting users:', err);
        res.status(500).json({ error: 'Error getting users' });
      } else {
        res.json(results);
      }
    });
  });
  
  router.post('/users', bodyParser.json(), (req, res) => {
    const { password, email, provider, provider_id, nickname } = req.body;
  
    connection.query(
      'INSERT INTO user (password, email, provider, provider_id, nickname) VALUES (?, ?, ?, ?, ?)',
      [password, email, provider, provider_id, nickname],
      (err, result) => {
        if (err) {
          console.error('Error adding user:', err);
          res.status(500).json({ error: 'Error adding user' });
        } else {
          const newUser = {
            id: result.insertId,
            password,
            email,
            provider,
            provider_id,
            nickname,
          };
          res.json(newUser);
        }
      }
    );
  });

module.exports = router;