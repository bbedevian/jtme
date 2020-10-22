import React, {Component} from 'react';
import FormInput from '../form-input/form-input.component';
import Button from 'react-bootstrap/Button'
import { signUpStart } from '../../redux/user/user.actions';
import {connect} from 'react-redux'

import './sign-up.styles.scss';

class SignUp extends Component {

    state = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    handleSubmit = async event => {
            event.preventDefault();
            const { signUpStart } = this.props;
            const { displayName, email, password, confirmPassword } = this.state;
        
            if (password !== confirmPassword) {
              alert("passwords don't match");
              return;
            }
            signUpStart({ displayName, email, password });
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state
        return (
            <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up below</span>

            <form className='sign-up-form' onSubmit={this.handleSubmit}>
                <FormInput onChange={this.handleChange} type='text' name='displayName' value={displayName} label='name' required/>
                <FormInput onChange={this.handleChange} type='email' name='email' value={email} label='email' required/>
                <FormInput onChange={this.handleChange} type='password' name='password' value={password} label='password' required/>
                <FormInput onChange={this.handleChange} type='password' name='confirmPassword' label='confirm password' value={confirmPassword} required/>
                <Button type='submit' >Sign Up </Button>
            </form>
                
            </div>
        );
    }
}

const mdp = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
  });

export default connect(null, mdp)(SignUp);
