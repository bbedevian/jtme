import React, { Component } from 'react';
import {connect} from 'react-redux'
import {addJobToUserJobsCollection} from '../../firebase/firebase.utils'
import { fetchJobsStart } from '../../redux/jobs/jobs.actions';

class AddJob extends Component {

    state = {
        company: '',
        status: '',
        jobTitle: '',
        lastContacted: ''
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
            status: '',
            jobTitle: '',
            lastContacted: ''
        })
    }

    componentDidMount(){
        const {fetchJobsStart, user} = this.props
        console.log('this.props.user :>> ', user);
        fetchJobsStart(user)
    }

    render() {
        const {company, status, jobTitle, lastContacted } = this.state
        return (
            <div className='add-job'>
                <form onSubmit={this.handleSubmit}>
                <label>
                    Company:
                    <input name='company' value={company} onChange={this.handleChange}/>
                </label>
                <label>
                    Job Title:
                    <input name='jobTitle' value={jobTitle} onChange={this.handleChange}/>
                </label>
                <label>
                    Last Contacted:
                    <input name='lastContacted' type="date" value={lastContacted} onChange={this.handleChange}/>
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

const msp = ({user, jobs}) => ({
    user: user.currentUser,
    jobs: jobs.jobs
})

const mdp = (dispatch) => {
    return {
      fetchJobsStart: (user) => dispatch(fetchJobsStart(user))
    }
  }

export default connect(msp, mdp)(AddJob);

