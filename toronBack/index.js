const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');

// const Board = require('./models/post');


const app = express();
// const port = process.env.PORT || 3000;
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const comments = [];

app.get('/', (req, res) => {
  console.log('200');
  res.send('Hello World!')
});

app.get('/login/auth/google', (req, res) => {
  console.log(req);
  res.redirect('/login/auth/google/callback');
});

//User google log-in logic start
// app.use(session({secret : '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', resave: true, saveUninitialized: true}));
// app.use(passport.initialize());
// app.use(passport.session());
console.log('!');
app.use('/login', userRoutes);
app.use((err, req, res, next) => {
  if(err){
    console.error(err.stack);
  }
  else{
    res.send('No Error');
  }
})
//User google log-in logic fin



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

//이 밑에 코드 res 객체가 어디서 나온 객체인지 모르겠어서 주석 쳐뒀습니다 _감
  //  const newComment = {
  //    id: comments.length + 1,
  //    username,
  //    content,
  //    createdAt: new Date(),
  //  };

  //  comments.push(newComment);

  //  res.json(newComment);

//지현
// const commentController = require('./controllers/commentController');
// app.use('/api', commentController);

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

app.listen(port, () => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});