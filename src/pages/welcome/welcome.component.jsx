import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import './welcome.styles.scss'

const WelcomePage = ({currentUser, history}) => {
    return (
        <div>
            <div className='headline'>
                <h1>Welcome to JTME</h1>
                <h4>(Job Tracking Made Easy)</h4>  
            </div>
            {currentUser ? 
            <span onClick={() => history.push('/home')} className='faux-button'>
                Go to my Console
            </span>
            :
            <span onClick={() => history.push('/signin')} className='faux-button'>
                Sign in or Sign Up
            </span>
            }
            <div className="notes">
                <h3>v.1 Notes:</h3>
                <p>We have created a chrome extension which can be downloaded 
                <a href="https://drive.google.com/drive/folders/11usDbxUbPIb5IwX9P_fglX8tPBLFrrVq?usp=sharing"> here </a>
                </p>
                <p>Note you MUST create your JTME account with the sign in with google option to use this</p>
                <p>See projects ReadMe 
                <a href="https://github.com/bbedevian/jtme"> here </a>
                for details on how to hook up the extension</p>
                
                <p>This project was created for Code With Friends Fall 2020 by </p>
                <p>Robert Keller and Brett Bedevian </p>
                <p>We'd love to hear your feedback! </p>
            </div>
            
        </div>
    );
}

const msp = ({user}) => ({
    currentUser: user.currentUser
})

export default withRouter(connect(msp)(WelcomePage));
