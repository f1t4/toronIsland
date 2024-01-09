const express = require('express');
const bodyParser = require('body-parser');
const db_toron = require('../config/db');
const router = express.Router();

// 댓글 목록 조회
router.get('/comments', getComments);

// 댓글 추가
router.post('/comments', bodyParser.json(), addComment);

// 사용자 목록 조회
router.get('/users', getUsers);

// 사용자 추가
router.post('/users', bodyParser.json(), addUser);

module.exports = router;

async function getComments(req, res) {
  try {
    const [results] = await db_toron.query('SELECT * FROM user_activity');
    res.json(results);
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ error: 'Error getting comments' });
  }
}

async function addComment(req, res) {
  try {
    const { username, content, boardId, userId } = req.body;

    console.log('Received request with the following data:');
    console.log('Username:', username);
    console.log('Content:', content);
    console.log('Board ID:', boardId);
    console.log('User ID:', userId);

    console.log('user_activity 테이블에 삽입 시도...');
    const [result] = await db_toron.query(
      'INSERT INTO user_activity (board_id, id, comment_content) VALUES (?, ?, ?)',
      [boardId, userId, content]
    );

    const newComment = {
      id: result.insertId,
      username,
      content,
    };
    res.json(newComment);
  } catch (error) {
    console.error('댓글 추가 오류:', error);
    res.status(500).json({ error: '댓글 추가 오류', details: error.message });
  }
}

async function getUsers(req, res) {
  try {
    const [results] = await db_toron.query('SELECT * FROM user');
    res.json(results);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Error getting users' });
  }
}

async function addUser(req, res) {
  try {
    const { password, email, provider, provider_id, nickname } = req.body;

    const [result] = await db_toron.query(
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