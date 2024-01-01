
const mysql = require('mysql2');
const axios = require('axios'); // axios 라이브러리 추가
// const cors = require('cors');
const express = require('express');
const app = express();
const db = require('../config/db');
const connection = db.init();

const post = require('../../../toronBack/models/post');
const PORT = 3001;
// 로직 1
// 오늘 날짜가 어제 날짜에서 +1이 되면 새로운 포스트 생성 (아래 코드)
// 해당 포스트 생성 날짜 +7가 되면 댓글 종료 (아직 ㄴㄴ)
const dt = new Date();
dt.setHours(0, 0, 0, 0); // Date는 시간도 포함함 필요 X -> 시간 데이터 제거
const formatDate = (date) => date.toISOString().split('T')[0]; 
// 날짜를 문자열로 지정해 주는 함수 formatDate 
const today = formatDate(dt);
const yesterday = formatDate(new Date(dt.setDate(dt.getDate() - 1)));

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

app.get('/AgreeContainer', async(req, res)=>{
    if (daysDifference === 1){
        try{
            // 실제로 DB에 새로운 포스트를 생성하는 코드 옴
            const newPost = await post.create({
                // 새로운 포스트의 데이터 설정 
            }); 
            res.json({message: '새로운 포스트 생성 완료'})
        }
        catch(error){
            console.log('포스트 생성 중 오류', error);
            res.status(500).json({error: '포스트 생성 중 오류'})
        }
    } else{
        res.json({message:'글 생성 시점 X'})
    }
});

app.listen(PORT, ()=>{
    console.log(`server is &{PORT}`);
})