import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, notification } from 'antd';
import 'antd/dist/antd.css';
// components

import Login from './components/login';
import SignUp from './components/SignUp';
// import Card from './components/Card'
import BlockChainCard from './components/BlockChainCard'

// firebase
import firebase from '../src/config/firebase';

const { Header, Content } = Layout;

const App = (() => {
  const [user, setUser] = useState(null);

  // firebase auth listener
  useEffect(() => {
    firebase.auth().onAuthStateChanged((usr) => {
      if (usr) {
        setUser({ email: usr.email })
      } else {
        setUser(null)
      }
    })
  }, []);


  const _rendserRoutes = () => {
    return <Switch>
      <Route exact path="/login" component={Login} />
      {user === null ? (<Route exact path="/" component={Login} />) : <Route exact path="/" component={BlockChainCard} />}
      {user != null ? (<Route exact path="/BlockChainCard" component={BlockChainCard} />) : <Route exact path="/BlockChainCard" component={Login} />}
      <Route exact path="/signup" component={SignUp} />
    </Switch>
  }

  return <Router>
    <Layout style={{
      background: '#fff'
    }}>
      <Header
        style={{
          display: 'flex'
        }}>
        <div
          style={{
            color: 'white'
          }}>
          CARTEDO ASSIGNMENT
            </div>
        <Menu
          mode='horizontal'
          theme='dark'
          style={{
            display: 'flex',
            flex: 1,
            marginLeft: 120
          }}>
          <Menu.Item
            style={{
              marginLeft: 'auto',
            }}>
          </Menu.Item>
          {
            user === null ?
              <Fragment>
                <Menu.Item>
                  <Link to='/login'>
                    LOGIN
                                    </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to='/signup'>
                    SIGNUP
                                    </Link>
                </Menu.Item>
              </Fragment> :
              <Menu.Item
                onClick={
                  () => {
                    firebase.auth().signOut();
                    localStorage.clear();
                    notification.open({
                      type: 'success',
                      message: 'Logged out successfully'
                    })
                  }
                }>
                <Link>
                  LOGOUT
                                </Link>
              </Menu.Item>
          }

        </Menu>
      </Header>
      <Content>
        {_rendserRoutes()}
      </Content>
    </Layout>
  </Router>
})
export default App