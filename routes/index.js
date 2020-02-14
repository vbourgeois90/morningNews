var express = require('express');
var router = express.Router();
let userModel=require('../models/users');
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var uid2 = require("uid2");


// USER SIGN-UP \\

router.post('/signup', async function(req, res, next) {
  
  let result='error';

  // CHECK IF EMAIL IS ALREADY IN DB
  let isEmail=await userModel.findOne({email: req.body.email});
  if(isEmail){
    result='email already used'
  }

  // CHECK FOR EMPTY INPUT
  let isEmpty=true;
  if(req.body.username && req.body.email && req.body.password){
    isEmpty=false
  } else {
    result='empty input'
  }

  // REGISTER USER IN DB
  let salt = uid2(32);
  if(isEmail===null && isEmpty===false){
    let newUser = new userModel ({
      username: req.body.username,
      email: req.body.email,
      password: SHA256(req.body.password + salt).toString(encBase64),
      salt: salt,
      token: uid2(32)
    });
    let user = await newUser.save();
    if(user!==undefined){
      result='success'
      res.json({result, token: user.token})
    }
  }
  res.json({result});
});


// USER SIGN-IN \\

router.post('/signin', async function(req, res, next) {

  let result='error'

  // CHECK FOR EMPTY INPUT
  let isEmpty=true;
  if(req.body.email && req.body.password){
    isEmpty=false
  } else {
    result='empty input'
  }

  // CHECK LOGIN USER
  let user = await userModel.findOne({email: req.body.email}).exec(function(err, user) {
    if(user!==null){
      let hash=SHA256(req.body.password + user.salt).toString(encBase64);
      if (hash===user.password){
        result='success';
      }
    }
    res.json({result, user});
    
  });

});

module.exports = router;
