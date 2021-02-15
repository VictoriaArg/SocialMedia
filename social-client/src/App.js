import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import './App.css'

import { AuthProvider } from './context/auth'
import AuthRoute from './util/AuthRoute'

import Intro from './pages/Intro'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MenuBar from './components/MenuBar'
import SinglePost from './pages/SinglePost'

function App() {
  return (
    <AuthProvider>
      <Router>
      <Container>
      <Route path={['/home', '/login', '/register', '/posts/:postId']} component={MenuBar} />
      <Route exact path='/' component={Intro} />
      <Route exact path='/home' component={Home} />
      <AuthRoute exact path='/login' component={Login} />
      <AuthRoute exact path='/register' component={Register} />
      <Route exact path='/posts/:postId' component={SinglePost} />
      </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
