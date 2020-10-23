import React, { Component } from 'react';
import './App.css'
import {connect} from 'react-redux'
import SignInSignUp from './pages/signin-signup/signin-signup.component'
import {Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './pages/home/home.component'
import Header from './components/Header/header.component'

import {checkUserSession} from './redux/user/user.actions'

class App extends Component {
  unsubscribeFromAuth = null
  componentDidMount(){
    const {checkUserSession} = this.props
    checkUserSession()
  }

  render() {
    const {currentUser} = this.props
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/home' />) : (<SignInSignUp/>)}/>
          <Route exact path='/home' render={() => currentUser ? (<HomePage/>): (<Redirect to='/signin' />)}/>
          <Route path='/' render={() => currentUser ? (<Redirect to='/home' />) : (<Redirect to='/signin' />)}/>
        </Switch>
      </div>
    );
  }
}

const msp = ({user}) => ({
  currentUser: user.currentUser
})

const mdp = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
})

export default connect(msp, mdp)(App);
