
const mysql = require('mysql2');
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http');

const port = 3000;

// post.js의 Board 데이터 가져옴
const { Board } = require('../models/post');
// 스케줄링 기능 why? 주기적으로 실행되는 작업이 필요하기 때문
const cron = require('node-cron');

app.use(express.json());
app.use(cors());

cron.schedule('0 0 * * *', async ()=> {

});



app.listen(port, (err)=>{
    console.log(`server running at ${port} port`);
});