import React, { Component } from 'react';
import './sign-in.styles.scss'
import {connect} from 'react-redux'
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleSubmit = async e => {
        e.preventDefault();
        const {email, password} = this.state
        const {emailSignInStart} = this.props
        emailSignInStart(email, password)
    }

    render() {
        const {googleSignInStart} = this.props
        const {email, password} = this.state
        const{handleSubmit, handleChange} = this
        return (
            <div className='sign-in'>
                <h2>I Already Have an Account</h2>
                <span>Sign in withyour email and password</span>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required name='email' type="text" value={email} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required name='password' type="password" value={password} onChange={handleChange}/>
                    </Form.Group>
                    <div className='buttons'>
                    <Button onClick={(e) => handleSubmit(e)}>Sign In</Button>
                    <Button type='button' onClick={googleSignInStart} >Sign In With Google</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

const mdp = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mdp)(SignIn);
