import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
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
        const {handleChange, handleSubmit} = this
        return (
            <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up below</span>

            <Form className='sign-up-form' onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicDisplayName">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control required name='displayName' type="text" value={displayName} onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required name='email' type="text" value={email} onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required name='password' type="password" value={password} onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required name='confirmPassword' type="password" value={confirmPassword} onChange={handleChange}/>
                </Form.Group>
                <Button type='submit'>Sign Up</Button>
            </Form>
                
            </div>
        );
    }
}

const mdp = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
  });

export default connect(null, mdp)(SignUp);
