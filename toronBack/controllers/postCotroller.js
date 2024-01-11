const cors = require('cors');
const express = require('express');
const app = express();
let connection = require('../config/db').init();
const path = require('path');

app.use(express.json());
app.use(cors());
const fs = require('fs').promises;


app.use(express.json());
app.use(cors());

const cronJob = async () => {
    try{
        
        const jsonData = await fs.readFile(path.join(__dirname, '..', 'models', 'postdata.json'), 'utf-8');
        const data = JSON.parse(jsonData);
        console.log(data);
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
        console.log('error inserting data', error);
    }finally{
        
    }

};
   
connection = require('../config/db').init();
module.exports = cronJob;