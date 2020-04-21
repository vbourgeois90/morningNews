import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';

function ScreenSource(props) {

  const[sourceList, setSourceList]=useState([]);

  useEffect(() => {
    async function fetchData() {
      let rawResponse = await fetch(`https://newsapi.org/v2/sources?country=${props.language}&apiKey=10cba8ad2bfd4273a738e30fd174a2b6`);
      let response = await rawResponse.json();
      setSourceList(response.sources);
    }
    fetchData();
  }, [props.language]);

  let saveLanguage = async (language) => {
    await fetch('/language', {
      method:'PUT',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${props.token}&language=${language}`
    });
  }

  if(props.token===null){
    return(
      <Redirect to='/' />
    );
  } else {

    return (
      <div>
        <Nav/>
         
        <div className="Banner">
          <img src='../images/fr.png' alt='french flag' className='flagPicto' onClick={()=>{props.changeLanguage('fr'); saveLanguage('fr')}} />
          <img src='../images/uk.png' alt='uk flag' className='flagPicto' onClick={()=>{props.changeLanguage('gb'); saveLanguage('gb')}} />
        </div>
  
         <div className="HomeThemes">
            
          <List
              itemLayout="horizontal"
              dataSource={sourceList}
              renderItem={item => (
                <Link to={`/articlesbysource/${item.id}`}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={item.category==='sports'? <Avatar src="../images/sports.png" /> : item.category==='general'? <Avatar src="../images/general.png" /> : <Avatar src="../images/business.png" /> }
                      title={<p style={{marginBottom: '0'}}>{item.name}</p>}
                      description={item.description}
                    />
                  </List.Item>
                </Link>
              )}
            />
  
          </div>
                   
        </div>
    );
  }

}

function mapStateToProps(state){
  return{
    token: state.token,
    language: state.language
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeLanguage: function(lang){
      dispatch({type: 'changeLanguage', lang})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenSource);
