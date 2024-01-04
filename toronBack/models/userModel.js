//user table을 DB에서 가져와 저장하는 로직 

const mysql = require('mysql2');
//config/db에서 연동한 데베 가져옴 (module.exports의 return문)
const db = require('../config/db');


//회원가입 데이터 저장 모델
const User = {
    save : (data, callback) => {
        db.query('INSERT INTO user SET provider_id=?', data.id, callback);
        db.query('INSERT INTO user SET provider=?', data.provider, callback);
        db.query('INSERT INTO user SET provider_email=?', data.email, callback);
    }
}
module.exports = User;