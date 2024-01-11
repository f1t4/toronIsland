
const mysql = require('mysql2');
const cors = require('cors');
const express = require('express');
const app = express();
const db = require('../config/db');
const connection = require('../config/db').init();

app.use(express.json());
app.use(cors());
const http = require('http');
const fs = require('fs').promises;

const port = 3000;

// post.js의 Board 데이터 가져옴
const { Board } = require('../models/post');
// 스케줄링 기능 why? 주기적으로 실행되는 작업이 필요하기 때문
const cron = require('node-cron');

app.use(express.json());
app.use(cors());

// 00: 00 밤 12시가 되면 실행되는 코드 -> 하루 지나면~의 가정이 되는 것임 
cron.schedule('*5 * * * *', async ()=> {
    try{
        
        const jsonData = await fs.readFile('postdata.json', 'utf-8');
        const data = JSON.parse(jsonData);
        
        for (const item of data) {
            const { id, board_content, state } = item;

            // connection에서 해당 board_id의 데이터를 조회
            const [rows, fields] = await connection.execute('SELECT * FROM board WHERE board_id = ?', [id]);

            // 일치하는 데이터가 있다면 업데이트, 없다면 삽입
            if (rows.length > 0) {
                // UPDATE 문 활용
                await connection.execute('UPDATE board SET board_content = ?, state = ? WHERE board_id = ?', [board_content, state, id]);
                console.log(`Data updated successfully for board_id ${id}`);
            } else {
                // INSERT 문 활용
                await connection.execute('INSERT INTO board (board_id, board_content, state) VALUES (?, ?, ?)', [id, board_content, state]);
                console.log(`Data inserted successfully for board_id ${id}`);
            }
        }
    } catch(error){
        console.log('error inserting data', error.message);
    }finally{
        await connection.end();
    }
});



app.listen(port, (err)=>{
    console.log(`server running at ${port} port`);
});