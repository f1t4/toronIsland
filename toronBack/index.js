const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');
const connection = db.init();

// 하경 스케줄링 기능 - 주기적으로 실행되는 작업이 필요하기 때문
const schedule = require('node-schedule');
const cronjob = require('./models/postCotroller')

db.connect(connection);


const app = express(); 


app.use(express.json());
// const port = process.env.PORT || 3000;
const port = 3000;

// app.use(bodyPdcdarser.json());
app.use(cors({
  credentials: true,
}));


const comments = [];

app.get('/', (req, res) => {
  console.log('200');
  res.send('Hello World!')
});

//User google log-in logic start

// app.get('/login/au /google', (req, res) => {
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


  
//지현
// comments의 엔드 포인트 
app.get('/comments', (req, res) => {
  res.json(comments);
});


const commentController = require('./controllers/commentController');
app.use('/comments', commentController);


app.post('/comments', (req, res) => {
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ error: 'Username and content are required' });
  }
  const newComment = {
    id: comments.length + 1,
    userId,
    content,
    createdAt: new Date(),
  };

  comments.push(newComment);

  res.json(newComment);
});


// 하경
// postContorller.js에서 요청 받고 응답하는 로직
// 성공 시 postData(데베 쿼리 결과)를 json 형태로 응답
app.get('/board_data', async (req, res, next) => {
  try {
    // 가장 최근 데이터(order by)를 응답으로 보냄 
    const [postData] = await connection.promise().query('SELECT * FROM board ORDER BY board_create DESC LIMIT 1');
    // console.log(postData); // 데이터 확인용 로그

    res.json(postData);
  } catch (error) {
    console.error('Error!!!!!!', error);
    res.status(500).json({ error: 'Error~~~!!', details: error.message });
  }
});

// 하경 
// 00: 00 밤 12시가 되면 실행되는 코드 -> 하루 지나면~의 가정이 되는 것임 
// */1 * * * * : 1분 간격 insert 
// * * * * * : 12시마다 insert 
// const job = schedule.scheduleJob('* * * * *', cronjob);


// 하경
// 홈 화면에 보여줄 데이터 정렬 코드 
// 오늘의 게시물은 /board_data의 응답 결과로 동적 업데이트 하고
// 이전 세 개의 게시물은 /post_sort_data의 응답 결과로 동적 업데이트 함 
app.get('/post_sort_data', async(req, res)=>{
  try{
    // 가장 최근 데이터는 건너뛰고 그 다음 세 개 데이터만 반환 
    const [postSortData] = await connection.promise().query('SELECT * FROM board ORDER BY board_create DESC LIMIT 4');
    res.json(postSortData)
    console.log(postSortData);
  }catch(error){
    console.log('error', error);
    res.status(500).json({error: 'error 발생 => ', details: error.message});
  }
})

app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});