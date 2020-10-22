import React, { Component } from 'react';
import './sign-in.styles.scss'
import {connect} from 'react-redux'
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'
import Button from 'react-bootstrap/Button'
import FormInput from '../form-input/form-input.component';


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

                <form onSubmit={handleSubmit}>
                    <FormInput handleChange={handleChange} name='email' type='email' value={email} label='email' required/>
                    <FormInput handleChange={handleChange} name='password' type='password' label='password' value={password} required/>
                    <div className='buttons'>
                    <Button onClick={(e) => handleSubmit(e)}  >Sign In</Button>
                    <Button type='button' onClick={googleSignInStart} >Sign In With Google</Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mdp = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mdp)(SignIn);
