import React, { Component } from 'react';
import {connect} from 'react-redux'
import {addJobToUserJobsCollection} from '../../firebase/firebase.utils'

class AddJob extends Component {

    state = {
        company: '',
        status: '',
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleSubmit = e => {
        e.preventDefault();
        addJobToUserJobsCollection(this.props.user, this.state)
        this.setState({
            company: '',
            status: ''
        })
    }

    componentDidMount(){
        console.log('checking user redux', this.props.user)
    }

    render() {
        const {company, status } = this.state
        return (
            <div className='add-job'>
                <form onSubmit={this.handleSubmit}>
                <label>
                    Company:
                    <input name='company' value={company} onChange={this.handleChange}/>
                </label>
                <label>
                    Status:
                    <input name='status' value={status} onChange={this.handleChange}/>
                </label>
                    <input type='submit'/>
                </form>
            </div>
        ); 
    }
}

const msp = ({user}) => ({
    user: user.currentUser,
})

export default connect(msp)(AddJob);

