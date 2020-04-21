import React , {useState, useEffect} from 'react';
import './App.css';
import { List, Card, Icon, Modal} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const { Meta } = Card;

function ScreenArticlesBySource(props) {

  const [articleList, setArticleList] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [itemTitle, setItemTitle] = useState('');
  const [itemContent, setItemContent] = useState('');

  //GET ARTICLES BY SOURCE FROM API
  useEffect(() => {
    async function getArticlesBySource() {
      let rawResponse = await fetch(`https://newsapi.org/v2/top-headlines?sources=${props.match.params.id}&apiKey=10cba8ad2bfd4273a738e30fd174a2b6`);
      let response = await rawResponse.json();
      setArticleList(response.articles);
    }
    getArticlesBySource();
  }, [props.match.params.id]);
  
  //ADD ARTICLE TO DB
  let addArticleToDB = async (item) => {
    await fetch('/addarticle', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `title=${item.title}&desc=${item.description}&img=${item.urlToImage}&content=${item.content}&token=${props.token}`
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
          
          dataSource={articleList}
          renderItem={item => (
  
            <List.Item>
              <div className="Card">
                <div  style={{display:'flex'}}>
                <Card
                  style={{ 
                  width: 300,
                  height: 450,
                  margin:'15px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                  cover={
                    <div className='imgFrame'>
                      <img className='articleImg' alt="article img" src={item.urlToImage} />
                    </div>
                  }
                  actions={[
                      <Icon type="read" onClick={() => showModal(item.title, item.content)}  key="ellipsis2" />,
                      <Icon type="like" onClick={() => {
                                                        props.addToWhishList(item.title, item.description, item.urlToImage, item.content);
                                                        addArticleToDB(item)
                                                        }} key="ellipsis"/>
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
    );

  }

  
}

function mapDispatchToProps(dispatch) {
  return {
    addToWhishList: function(title, description, image, content) {
      dispatch({type: 'addArticle', title, description, image, content});
    }
  }
}

function mapStateToProps(state){
  return{token: state.token}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource);
