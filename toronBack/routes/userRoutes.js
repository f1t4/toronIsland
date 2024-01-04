const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//google login process, 접근 시 구글 로그인 페이지로 리다이렉션
router.get('/auth/google', userController.googleLogin);
//google login 후 process, 인증 결과에 따라 콜백 실행 ~> 해당 내용에 대해선 controlloer에 선언했음
router.get('/auth/google/callback', userController.googleCallback);

module.exports = router;