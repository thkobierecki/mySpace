import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
// import Button from '../components/atoms/Button/Button';
import store from '../Store';
import MainTemplate from '../templates/MainTemplate';
import Note from './Note';
import Articles from './Articles';
import Twitters from './Twitters';
import DetailsPage from './DetailsPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/" render={() => <Redirect to="/notes" />} />
          <Route exact path="/notes" component={Note} />
          <Route path="/notes/details/:id" component={DetailsPage} />
          <Route exact path="/twitters" component={Twitters} />
          <Route path="/twitters/details/:id" component={DetailsPage} />
          <Route exact path="/articles" component={Articles} />
          <Route path="/articles/details/:id" component={DetailsPage} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
