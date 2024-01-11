const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');

const app = express();
// const port = process.env.PORT || 3000;
const port = 3001;

// app.use(bodyPdcdarser.json());
app.use(cors());

const comments = [];

app.get('/', (req, res) => {
  console.log('200');
  res.send('Hello World!')
});

//User google log-in logic start

// app.get('/login/auth/google', (req, res) => {
//   console.log(req);
//   res.redirect('/login/auth/google/callback');
// });
// app.use(session({secret : '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', resave: true, saveUninitialized: true}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/login', userRoutes);

//User google log-in logic fin



//[채원] PretoronScreen

// GET route to fetch topics
// app.get('/getTopics', (req, res) => {
//   const sql = 'SELECT * FROM board';
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.json(result);
//     }
//   });
// });

//[채원] searchBar 
// 데이터베이스에서 검색 수행하는 함수
// const performSearch = async (query) => {
//   return new Promise((resolve, reject) => {
//     // 예시: 주제 제목에서 키워드를 검색
//     const sql = 'SELECT * FROM board WHERE board_content LIKE ?';
//     const keyword = `%${query}%`;

//     db.connect.query(sql, [keyword], (err, result) => {
//       if (err) {
//         console.error('Error executing search query:', err);
//         reject('검색 중 오류 발생');
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };

//[채원 프로필 사진 저장]
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { email } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length === 0) {
        // 사용자가 존재하지 않으면 프로필 선택 화면으로 이동
        res.json({ shouldSelectProfile: true });
      } else {
        // 사용자가 이미 존재하면 홈 화면으로 이동
        res.json({ shouldSelectProfile: false });
      }
    }
  });
});

app.post('/selectProfile', (req, res) => {
  const { email, profileNumber } = req.body;

  db.query('UPDATE users SET profileNumber = ? WHERE email = ?', [profileNumber, email], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.affectedRows > 0) {
        console.log(`Profile updated successfully for email: ${email}`);
        res.json({ success: true });
      } else {
        console.log(`No profile updated for email: ${email}`);
        res.json({ success: false });
      }
    }
  });
});

//이 밑에 코드 res 객체가 어디서 나온 객체인지 모르겠어서 주석 쳐뒀습니다 _감
  //  const newComment = {
  //    id: comments.length + 1,
  //    username,
  //    content,
  //    createdAt: new Date(),
  //  };

  //  comments.push(newComment);

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const { username, content } = req.body;

  if (!username || !content) {
    return res.status(400).json({ error: 'Username and content are required' });
  }
  const newComment = {
    id: comments.length + 1,
    username,
    content,
    createdAt: new Date(),
  };

  comments.push(newComment);

  res.json(newComment);
});

// //지현
// const commentController = require('./controllers/commentController');
// app.use('/api', commentController);

// 하경
app.get('/board_data', async(req, res, next)=>{
  try{
      const [postData] = await connection.query('select * from board;');
      res.json(postData);
      console.log(postData);
  }catch(error){
      console.log('Error!!!!!!', error);
      res.status(500).json({error: 'Error~~~!!'})
  }
});

app.listen(port, () => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});