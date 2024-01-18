//toronBack/controllers/commentController.js
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const router = express.Router();

const connection = require('../config/db').init();

router.use(cors());
router.use(bodyParser.json());


// // 댓글 목록 조회
router.get('/comments', getComments);

// 댓글 추가
router.post('/comments', bodyParser.json(), addComment);

// 사용자 목록 조회
router.get('/users', getUsers);

// 사용자 추가
router.post('/users', bodyParser.json(), addUser);



async function getComments(req, res) {
  try {
    console.log('Handling getComments request...')
    const [results] = await connection.query('SELECT comment_id, board_id, id, comment_content, DATE_FORMAT(comment_create, "%Y-%m-%dT%H:%i:%s.000Z") AS createdAt FROM user_activity');
    res.json(results);
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ error: 'Error getting comments' });
  }
}


async function addComment(req, res) {
  await connection.promise().beginTransaction();

  try {
    console.log('Handling addComment request...');
    const { boardId, userId, content } = req.body;

    if (!boardId || !userId || !content) {
      return res.status(400).json({ error: 'boardId, userId, content are required' });
    }

    // user_activity 테이블에 댓글 추가
    const [result] = await connection.query(
      'INSERT INTO user_activity (board_id, id, comment_content, comment_create) VALUES (?, ?, ?, NOW())',
      [boardId[0], userId, content]
    );

    await connection.promise().commit();
    console.log('Transaction committed.');
    
    const newComment = {
      id: result.insertId,
      boardId,
      userId,
      content,
      createdAt: new Date(), 
    };


    res.json(newComment);
  
  } catch (error) {
    await connection.promise().rollback();
    console.error('Transaction rolled back:', error);
    res.status(500).json({ error: '댓글 추가 실패' });
    throw error; 
  }
}


async function getUsers(req, res) {
  try {
    console.log('Handling getUsers request...');
    const [results] = await connection.query('SELECT * FROM user');
    res.json(results);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Error getting users' });
  }
}

async function addUser(req, res) {
  try {
    console.log('Handling addUser request...');
    const { password, email, provider, provider_id, nickname } = req.body;

    const [result] = await connection.query(
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
}

module.exports = router;