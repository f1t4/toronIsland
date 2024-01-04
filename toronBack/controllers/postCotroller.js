
const mysql = require('mysql2');
const cors = require('cors');
const express = require('express');
const app = express();
const db = require('../config/db');
const connection = db.init();
const port = 3000;
db.connect(connection);
app.use(express.json());
app.use(cors());

app.get('/', function(req, res, next){
    res.send('hello');
});

// 엔드 포인트 정의 
// AgreeContainer에서 요청이 들어오면 해당 함수가 실행됨 
// app.get('/board_data', function(req, res, next){
//     connection.query('SELECT * FROM board', function(err, results, fields){
//         if(err) {
//           console.error('Error executing query:', err);
//           res.status(500).json({ error: 'Internal Server Error' });
//           return;
//         }
//         // res.setHeader('Content-Type', 'application/json');
//         console.log(results);
//         res.json(results);
//       });
// });

app.get('/board_data', async(req, res, next)=>{
    try{
        const [postData] = await connection.query('SELECT * FROM board');
        res.json(postData);
    }catch(error){
        console.log('Error!!!!!!', error);
        res.status(500).json({error: 'Error~~~!!'})
    }
});

app.listen(port, (err)=>{
    console.log(`server running at ${port} port`);
})