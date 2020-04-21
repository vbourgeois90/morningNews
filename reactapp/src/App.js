import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import ScreenHome from './ScreenHome';
import ScreenSource from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';

import article from './reducers/article';
import token from './reducers/token';
import language from './reducers/language';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
const store = createStore(combineReducers({article, token, language}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={ScreenHome} />
          <Route path="/source" component={ScreenSource} />
          <Route path="/articlesbysource/:id" component={ScreenArticlesBySource} />
          <Route path="/myarticles" component={ScreenMyArticles} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
