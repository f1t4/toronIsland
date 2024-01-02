
const mysql = require('mysql2');
const axios = require('axios'); // axios 라이브러리 추가
// const cors = require('cors');
const express = require('express');
const app = express();

const db = require('../config/db');
const connection = db.init();

// const post = require('../../../toronBack/models/post');
const PORT = 3001;

app.listen(PORT, ()=>{
    console.log(`server is &{PORT}`);
})