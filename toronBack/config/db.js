//mysql DB 연동

const mysql = require("mysql2");
const db_toron = {
    host: "localhost",
    port: "",
    user: "",
    password: "",
    database: "toron"
}
//module.exports : 하나의 변수나 함수 또는 객체를 직접 할당, 이렇게 할당한 객체 안에 넣어 둔 변수나 함수를 외부 파일에서 불러서 사용
module.exports = {
    init : ()=>{
        return mysql.createConnection(db_toron);
    },
    connect: (db)=>{
        db.connect((err)=>{
            if(err) console.error("Fail to connect the mySql : " + err);
            else console.log("mySql is connected successfully");
        });
    }
}