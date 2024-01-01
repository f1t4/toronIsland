// config > db.js에서 DB와 연결 
// init -> mysql.createConnection db랑 연결
// db_toron -> 연결 정보 전달  
// connect -> 연결 객체 전달 받음 
const mysqlModule = require('../config/db');
// 말 그대로 내 DB랑 연결하고 있음 연결 초기화 같은 건가 
const connection = mysqlModule.init();

// 데베 데이터 insert 후 가져올 때 board_id를 기준으로 order by 필수
// 아래 id 값은 임시 테스트를 위한 값 실제로는 DB에서 자동 count
let toronData = [
    {id: 1, text: '송강호 떡 사주기 \n vs \n송강 떡 사주기', state: 0},
    {id: 2, text: '정대만이랑 연애 \n vs \n 이명헌이랑 연애', state: 0}
];

// function addPost(newItem){
//     data = [...data, newItem];
// }

// function updatePost(index, updateItem){
//     data[index] = updateItem;
// }

// function getPost(){
//     return data;
// }

module.exports ={
    toronData
}

// sql에 쿼리문 전송 

connection.query('SELECT * FROM board', (err, result)=> {
    if(err) throw err;
    console.log(result);
});

// 위의 쿼리문 로직 내 내용을 전송? 
mysqlModule.connect(connection);