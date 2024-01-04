//authenticating module
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
//router 작업할 때 밑에 두 줄 라우터로 옮겨두기
const jwt = require('jsonwebtoken');
const session = require('express-session');

passport.use('google', new GoogleStrategy({
    clientID : '1082978828191-bhh1rrdv4preg21gtsvkhbtn2pafahnt.apps.googleusercontent.com',
    clientSecret : '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',
    callbackURL : 'http://localhost:3000/login/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
      const data = {
          id : profile.id,
          email : profile.email[0].value,
          provider : profile.provider
      }
      User.save(data, (err, result) =>{
          if(err) throw err;
          console.log('[RESULT] ' + result);
      });
      return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
  
  passport.deserializeUser((user, done) => {
    done(null, user);
});
/**
 * done function
 * 인증 프로세스 완료 위한 콜백함수
 * 보통 인증에 성공했는지 못했는지 가리키는데 사용, 인증 유저에 대한 정보 제공
 * done(error, user, info); 의 형태
 */

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };
  
module.exports = isAuthenticated;