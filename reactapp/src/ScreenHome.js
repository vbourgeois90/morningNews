import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import './App.css';
import {Input,Button} from 'antd';
import {connect} from 'react-redux';

function ScreenHome(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [isSignUpError, setIsSignUpError] = useState();
  const [isSignInError, setIsSignInError] = useState();

  let handleClickSignUp = async () => {
    let rawRes=await fetch('/signup', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `username=${signUpUsername}&email=${signUpEmail}&password=${signUpPassword}`
    });
    let res= await rawRes.json();
    console.log('res :', res);

    if(res.result==='success'){
      props.onSignUp(res.token);
      props.getLanguage(res.language);
      setIsLogin(true);
    } else if(res.result==='email already used'){
      setIsSignUpError('Email already used. Please sign-in');
    } else if(res.result==='empty input'){
      setIsSignUpError('Empty input');
    }
  }


  let handleClickSignIn = async () => {
    let rawRes = await fetch('/signin', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `email=${signInEmail}&password=${signInPassword}`
    });

    let res=await rawRes.json();

    let myArticlesList=res.user.article;
    
    if(res.result==='success'){
      props.onSignUp(res.user.token);
      props.getWishList(myArticlesList);
      props.getLanguage(res.user.language);
      setIsLogin(true);
    } else if(res.result==='empty input'){
      setIsSignInError('Empty input');
    } else {
      setIsSignInError('Invalid password / email')
    }
  }

  if(!isLogin){
    return (
      <div className="Login-page" >

            {/* SIGN-IN */}

            <div className="Sign">
                    
              <Input
                className="Login-input" 
                placeholder="arthur@lacapsule.com"
                onChange={(e) => setSignInEmail(e.target.value)}
                value={signInEmail}
              />

              <Input.Password
                className="Login-input"
                placeholder="password"
                onChange={(e) => setSignInPassword(e.target.value)}
                value={signInPassword}
              />

              <h5>{isSignInError}</h5>

              <Button onClick={() => handleClickSignIn()} style={{width:'80px'}} type="primary">Sign-in</Button>

            </div>

            {/* SIGN-UP */}

            <div className="Sign">
                    
              <Input
                className="Login-input" 
                placeholder="Arthur"
                onChange={(e) => setSignUpUsername(e.target.value)}
                value={signUpUsername}
              />

              <Input
                className="Login-input" 
                placeholder="arthur@lacapsule.com"
                onChange={(e) => setSignUpEmail(e.target.value)}
                value={signUpEmail}
              />

              <Input.Password
              className="Login-input"
              placeholder="password"
              onChange={(e) => setSignUpPassword(e.target.value)}
              value={signUpPassword}
              />
              
              <h5>{isSignUpError}</h5>

              <Button onClick={() => handleClickSignUp()} style={{width:'80px'}} type="primary">Sign-up</Button>

            </div>

        </div>
    );

  } else {
    
    return(
      <Redirect to='/source' />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSignUp: function(token){
      dispatch({type: 'saveToken', token})
    },
    getWishList: function(list) {
      dispatch({type: 'getList', list});
    },
    getLanguage: function(lang){
      dispatch({type: 'changeLanguage', lang})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ScreenHome);


