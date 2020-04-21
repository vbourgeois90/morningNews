import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import {Menu, Icon} from 'antd';
import {connect} from 'react-redux';

function Nav(props) {

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        
        <Menu.Item key="mail">
          <Link to='/source'>
            <Icon type="home" />
            Sources
          </Link>
        </Menu.Item>
        
        
        <Menu.Item key="test">
          <Link to='/myarticles'>
            <Icon type="read" />
            My Articles
          </Link>
        </Menu.Item>
        

        <Menu.Item key="app">
          <Link to='/' onClick={() => {props.resetToken(); props.resetWishList()}}>
            <Icon type="logout" />
            Logout
          </Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    resetToken: function(){
      dispatch({type: 'resetToken'})
    },
    resetWishList: function(){
      dispatch({type: 'resetWishList'})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Nav);
