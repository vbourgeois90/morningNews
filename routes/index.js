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
      language: 'fr',
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


// ADD FAVORITE ARTICLE TO USER BDD \\
router.post('/addarticle', async function(req, res, next){

  let error=[];
  
  let article={
    title: req.body.title,
    desc: req.body.desc,
    img: req.body.img,
    content: req.body.content,
  }
  
  let user = await userModel.findOne({token: req.body.token});
  if(user){
    let index=user.article.findIndex(article => article.title===req.body.title);
    console.log('index :', index);
    if(index===-1){
      user.article.push(article);
      let userSaved = await user.save();
    }
  } else {
    error.push("Can't find user")
  }

  res.json({error})
})


// REMOVE FAVORITE ARTICLE FROM USER BDD \\
router.delete('/removearticle/:user/:title', async function(req, res, next){

  let error=[];

  let user = await userModel.findOne({token: req.params.user});
  let index=user.article.findIndex(article => article.title === req.params.title);
  user.article.splice(index, 1);
  let userSaved = await user.save();

  res.json({error});
})


// SAVE USER FAVORITE LANGUAGE - A FAIRE EN PUT (à update côté front également)
router.put('/language', async function(req, res, next){

  let error=[];

  console.log(req.body)

  let user = await userModel.findOne({token: req.body.token}); 
  if(user){
    user.language=req.body.language;
    let userSaved = await user.save();
  } else {
    error.push("Can't find user")
  }

  res.json({error})
})


module.exports = router;
