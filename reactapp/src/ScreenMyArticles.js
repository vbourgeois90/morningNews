import React, {useState} from 'react';
import './App.css';
import { Card, Icon, List, Modal} from 'antd';
import Nav from './Nav';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


const { Meta } = Card;

function ScreenMyArticles(props) {

  const [isVisible, setIsVisible] = useState(false);
  const [itemTitle, setItemTitle] = useState('');
  const [itemContent, setItemContent] = useState('');

  let deleteArticle = async (title) => {
    await fetch(`/removearticle/${props.token}/${title}`, {
      method: 'DELETE'
    });
  }

  //TOGGLE ARTICLE POP-UP
  let showModal = (title, content) => {
    setIsVisible(true);
    setItemTitle(title);
    setItemContent(content);
  };

  //HIDE ARTICLE POP-UP
  let handleCancel = e => {
    setIsVisible(false)
  }

  if(props.token===null){
    return(
      <Redirect to='/' />
    );

  } else if(props.articleToDisplay.length===0){
    return(
      <div>

        <Nav/>
        <div className="Banner"/>
        <h1 className='noArticlesFound'>No articles found</h1>

      </div>
      
    )
  } else {

  return (
    <div>
         
      <Nav/>

      <div className="Banner"/>

          <List
          grid={{
            gutter: 4,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          
          dataSource={props.articleToDisplay}
          renderItem={item => (

            <List.Item>
              <div className="Card">
                <div  style={{display:'flex'}}>
                  <Card
                    style={{  
                      width: 300, 
                      margin:'15px', 
                      display:'flex',
                      flexDirection: 'column',
                      justifyContent:'space-between' }}
                    cover={
                      <div className='imgFrame'>
                        <img className='articleImg' alt="my article" src={item.img}/>
                      </div>
                    }
                    
                    actions={[
                      <Icon type="read" onClick={() => showModal(item.title, item.content)}  key="ellipsis2" />,
                      <Icon type="delete" onClick={() => {
                                                          props.RemoveFromWhishList(item.title);
                                                          deleteArticle(item.title);
                                                          }} key="ellipsis" />
                    ]}
                    >
                      
                    <Meta
                      title={item.title}
                      description={item.description}
                    />

                  </Card>
                </div>
              </div> 
            </List.Item>

          )}
        />

      <Modal
        title={itemTitle}
        visible={isVisible}
        onCancel={handleCancel}
        okButtonProps={{hidden:true}}
      >
        <p>{itemContent}</p>

      </Modal>
    
    </div>
  );}
}

function mapStateToProps(state){
  return { 
    articleToDisplay: state.article,
    token: state.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    RemoveFromWhishList: function(title) {
      dispatch({type: 'removeArticle', title});
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMyArticles);
