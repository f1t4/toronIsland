//authenticating module
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
//router 작업할 때 밑에 두 줄 라우터로 옮겨두기
const jwt = require('jsonwebtoken');
const session = require('express-session');

passport.use('google', new GoogleStrategy({
    clientID : '',
    clientSecret : '',
    callbackURL : 'https://887c-59-154-5-58.ngrok-free.app/login/auth/google/callback'
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

// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use('google', new GoogleStrategy({
//     clientID: "1082978828191-vnceo5l0ff6c00kki89ta54nh3rsvfs0.apps.googleusercontent.com",
//     clientSecret: "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",
//     callbackURL: "https://887c-59-154-5-58.ngrok-free.app/login/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));