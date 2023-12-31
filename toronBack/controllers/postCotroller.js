const db = require('../config/db');
const mysql = require('mysql2');
const axios = require('axios'); // axios 라이브러리 추가
// const cors = require('cors');
const app = express();

const post = require('../../../toronBack/models/post');

// 로직 1
// 오늘 날짜가 어제 날짜에서 +1이 되면 새로운 포스트 생성 (아래 코드)
// 해당 포스트 생성 날짜 +7가 되면 댓글 종료 (아직 ㄴㄴ)
var dt = new Date();
var today =  dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
var splittoday = today.split('-');

function days_between(date1, date2) {
    // 하루의 밀리초 수
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // 밀리초로 차이 계산
    const differenceMs = Math.abs(date1 - date2);

    // 다시 일수로 변환하여 반환
    return Math.round(differenceMs / ONE_DAY);
}

const date1 = new Date(yesterday);
const date2 = new Date(today);
const daysDifference = days_between(date1, date2);
console.log(daysDifference); 

 
if(daysDifference == '1'){
    // DB insert 및 React UI 제공 
}