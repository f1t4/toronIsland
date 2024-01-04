//로그인 및 인증 관련 로직
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mysql = require('../models/userModel');

const socialRes = (req, res, err, user) => {
    //에러 발생 시 400 코드
    if(err) res.status(400);
    //사용자 정보 없을 시(로그인 실패) 200 코드와 json 반환
    if(!user){
        // return res.status(200).json({ success : false });
        return res.status(200).send('fail');
    }
    //passport의 req.login 메소드 사용해 로그인 시킴 ~> 성공 시 콜백함수 실행
    req.login(user, { session : false }, err => {
        if(err) res.send(err);

        const token = jwt.sign({ id: user.social_id }, process.env.JWT_SECRET);
        // return res.status(200).json({ userToken: token, success: true });
        return res.status(200).send('succeed');
    });
}

exports.googleLogin = (req, res, next) => {
    passport.authenticate('google', {scope : ['profile', 'email']})(req, res, next);
}
exports.googleCallback = (req, res, next) => {
    passport.authenticate('google', (err, user) => {
        socialRes(req, res, err, user)
    })(req, res, next);
}
    // passport.authenticate('google', {
    // failureRedirect : '/',  //실패 시 :3000 으로, 즉 처음 로그인 화면
    // successRedirect : '/main'   //성공 시, :3000/main으로, 메인 화면으로
    // });