const cors = require('cors');
const express = require('express');
const app = express();
let connection = require('../config/db').init();
const path = require('path');
const fs = require('fs').promises;

app.use(express.json());
app.use(cors());

let currentIndex = 0;

const cronJob = async () => {
    try{
        // __dirname: 현재 실행 중인 스크립트 파일의 디렉토리 경로를 나타냄 
        // .. : 상위 디렉토리로 이동하는 상대 경로 표시
        const jsonData = await fs.readFile(path.join(__dirname, '..', 'models', 'postdata.json'), 'utf-8');
        const data = JSON.parse(jsonData);

        if(data.length > 0){
            let { id, board_content, state } = data[currentIndex];
    

            if(id === currentIndex + 1){
                const result = await connection.execute('INSERT INTO board (board_content, state) VALUES (?, ?)', [board_content, state]);
                // result.insertId를 통해 삽입된 행의 ID를 가져올 수 있습니다.
                const insertId = result.insertId;
                console.log(`데이터가 성공적으로 board_id ${insertId}와 함께 삽입되었습니다.`);
                // 다음에 삽입할 데이터의 인덱스 업데이트
                currentIndex = (currentIndex + 1) % data.length;
            }else{
                console.log('json id와 currentIndex 값 일치 X');
            }
        } else{
            console.log('삽입할 데이터가 없습니다.');
        } 
      
    } catch(error){
        console.log('error inserting data', error);
    }finally{
        
    }

};
   
module.exports = cronJob;