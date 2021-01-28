import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, notification } from 'antd';
import 'antd/dist/antd.css';
import blockChain from './assets/blockchain.png';
import facebook from './assets/facebook.svg';
import github from './assets/github.svg';
import linkedin from './assets/linkedin.svg';
import mail from './assets/mail.svg';
import medium from './assets/medium.svg';
import twitter from './assets/twitter.svg';
import './App.css'
// components

import Login from './components/login';
import SignUp from './components/SignUp';
// import Card from './components/Card'
import BlockChainCard from './components/BlockChainCard'

// firebase
import firebase from '../src/config/firebase';

const { Header, Content, Footer } = Layout;

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
          display: 'flex',
          background: 'white',

        }}>
        <Menu
          mode='horizontal'
          theme='white'
          style={{
            display: 'flex',
            flex: 1,
            marginLeft: 10
          }}>
          <div
          >
            CARTEDO ASSIGNMENT
            </div>
          <div style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            marginTop: 80
          }}>
            <img src={blockChain} alt="Blockchain" style={{ height: '60px' }} />
          </div>
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
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '5%' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div class="ant-btn-group" style={{ marginRight: '33px' }}>
              <div style={{ marginRight: '33px' }}>
                <button disabled={true} type="button" class="ant-btn" style={{ color: 'black' }}>
                  <i class="anticon anticon-share-alt"></i>
                  <span>SHARE</span>
                </button>
                <a href="mailto:?subject=Blockchain Demo: Visual demo of blockchain technology&amp;body=Check out this site! https://blockchaindemo.io" target="_blank" class="fa fa-envelope">
                </a>
                <a href="https://plus.google.com/share?url=https://blockchaindemo.io" target="_blank" class="fa fa-google">
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=#url" target="_blank" class="fa fa-facebook">
                </a>
                <a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://blockchaindemo.io&amp;title=Coin%20Demo&amp;summary=Visual%20demo%20of%20blockchain%20technologies&amp;source=SeanJamesHan" target="_blank" class="fa fa-linkedin">
                </a>
                <a href="https://twitter.com/share?url=https%3A%2F%2Fblockchaindemo.io&amp;via=seanjameshan&amp;related=ProductHunt%2CfreeCodeCamp&amp;hashtags=Blockchain%2CBlockchain%2CEducation%2CDemo%2CLearn&amp;text=Blockchain%20Demo%20-%20Visual%20demonstration%20of%20blockchain%20technologies" target="_blank" class="fa fa-twitter">
                </a>
              </div>
              <div >
              
                
                <a href="https://twitter.com/share?url=https%3A%2F%2Fblockchaindemo.io&amp;via=seanjameshan&amp;related=ProductHunt%2CfreeCodeCamp&amp;hashtags=Blockchain%2CBlockchain%2CEducation%2CDemo%2CLearn&amp;text=Blockchain%20Demo%20-%20Visual%20demonstration%20of%20blockchain%20technologies" target="_blank" class="fa fa-twitter">
                </a>
                <a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://blockchaindemo.io&amp;title=Coin%20Demo&amp;summary=Visual%20demo%20of%20blockchain%20technologies&amp;source=SeanJamesHan" target="_blank" class="fa fa-linkedin">
                </a>
                <a href="mailto:?subject=Blockchain Demo: Visual demo of blockchain technology&amp;body=Check out this site! https://blockchaindemo.io" target="_blank" class="fa fa-medium">
                </a>
                <a href="https://plus.google.com/share?url=https://blockchaindemo.io" target="_blank" class="fa fa-github">
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=#url" target="_blank" class="fa fa-envelope">
                </a>
                <button disabled={true} type="button" class="ant-btn" style={{ color: 'black' }}>
                  <span>CONNECT</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  </Router>
})
export default App