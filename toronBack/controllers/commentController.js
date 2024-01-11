//toronBack/controllers/commentController.js
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const db = require('../config/db');
const connection = db.init();

db.connect(connection);
const app = express();

const cors = require('cors');
app.use(cors());


// // 댓글 목록 조회
// router.get('/comments', getComments);

// 댓글 추가
router.post('/comments/:boardId', bodyParser.json(), addComment);

// 사용자 목록 조회
router.get('/users', getUsers);

// 사용자 추가
router.post('/users', bodyParser.json(), addUser);



async function getComments(req, res) {
  try {
    const [results] = await connection.query('SELECT * FROM user_activity');
    res.json(results);
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ error: 'Error getting comments' });
  }
}


async function addComment(req, res) {
  try {
    const { userId, content } = req.body;
    const boardId = 1;

    // const connection = db.init();

    await connection.promise().beginTransaction();

    // user_activity 테이블에 댓글 추가
    const [result] = await connection.query(
      'INSERT INTO user_activity (board_id, id, comment_content) VALUES (?, ?, ?)',
      [boardId, userId, content]
    );

    console.log('Comment insertion result:', result);

    if (result.affectedRows === 1) {
      // 새로 추가된 댓글을 다시 읽어옴
      const [commentsResult] = await connection.query('SELECT * FROM user_activity WHERE id = ?', [result.insertId]);

      if (commentsResult.length > 0) {
        const updatedComment = commentsResult[0];
        res.json(updatedComment);
      } else {
        console.error('댓글 추가 후 읽기 실패');
        res.status(500).json({ error: '댓글 추가 후 읽기 실패' });
      }
    } else {
      await connection.promise().rollback();
      
      console.error('댓글 추가 실패: 영향 받은 행이 1이 아님');
      res.status(500).json({ error: '댓글 추가 실패' });
    }
  } catch (error) {
    console.error('댓글 추가 오류:', error);
    res.status(500).json({ error: '댓글 추가 오류', details: error.message });
  }
}


async function getUsers(req, res) {
  try {
    const [results] = await connection.query('SELECT * FROM user');
    res.json(results);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Error getting users' });
  }
}

async function addUser(req, res) {
  try {
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