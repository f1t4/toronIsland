// config > db.js에서 DB와 연결 
// init -> mysql.createConnection db랑 연결
// db_toron -> 연결 정보 전달  
// connect -> 연결 객체 전달 받음 
const mysqlModule = require('../config/db');
// 말 그대로 내 DB랑 연결하고 있음 연결 초기화 같은 건가 
const connection = mysqlModule.init();

const express = require('express');
const app = express();

// sql에 쿼리문 전송 
connection.query('SELECT * FROM board', (err, result)=> {
    if(err) throw err;
    console.log(result);
});

// 위의 쿼리문 로직 내 내용을 전송? 
mysqlModule.connect(connection);