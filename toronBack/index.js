const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');

const Board = require('./models/post')


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const comments = [];

//User google log-in logic start
app.use(session({secret : '*', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
console.log('!');
app.use('/', userRoutes);
//User google log-in logic fin

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

//[채원] PretoronScreen
// const db = require('./db'); 

// GET route to fetch topics
app.get('/getTopics', (req, res) => {
  const sql = 'SELECT * FROM board';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});



app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const { username, content } = req.body;

  if (!username || !content) {
    return res.status(400).json({ error: 'Username and content are required' });
  }

//지현
//    //데베에 댓글을 저장하는 코드 추가
//    const sql = 'INSERT INTO user_activity (board_id, comment_content) VALUES (?, ?)';
//    const values = [1, content]; // 임시로 board_id를 1로 설정, 실제로는 게시물 ID를 사용해야 함
 
//    db.query(sql, values, (err, result) => {
//      if (err) {
//        console.error('Error executing query:', err);
//        res.status(500).send('Internal Server Error');
//      } else {
//        // 저장된 데이터베이스에서 마지막으로 추가된 댓글을 가져오는 코드
//        const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as comment_id';
//        db.query(lastInsertIdQuery, (lastInsertIdErr, lastInsertIdResult) => {
//          if (lastInsertIdErr) {
//            console.error('Error getting last insert ID:', lastInsertIdErr);
//            res.status(500).send('Internal Server Error');
//          } else {
//            const newComment = {
//              id: lastInsertIdResult[0].comment_id,
//              username,
//              content,
//              createdAt: new Date(),
//            };
//            comments.push(newComment);
//            res.json(newComment);
//          }
//        });
//      }
//    });
//  });

   const newComment = {
     id: comments.length + 1,
     username,
     content,
     createdAt: new Date(),
   };

   comments.push(newComment);

   res.json(newComment);
 });

//지현
// const commentController = require('./controllers/commentController');
// app.use('/api', commentController);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// 하경
// const query = 'SELECT * FROM board';
// connection.query(query, (err, result, fields)=> {
//     if(err) {
//         console.log('Error excuting query => ', error);
//         return;
//     }

//     console.log(result);

//     Board.findAll()
//     .then(boards => {
//       console.log("result: ", boards);
//     })
//     .catch(error=>{
//       console.log("error~~",error);
//     })
//     .finally(()=>{
//       // DB 연결 종료 
//       db.connect(connection);
//     });
// });

