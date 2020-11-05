import React, { Component } from 'react';
import {connect} from 'react-redux'
import {addJobToUserJobsCollection} from '../../firebase/firebase.utils'
import { fetchJobsStart } from '../../redux/jobs/jobs.actions';

//BootStrap Imports
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ArrowUpCircle, ArrowDownCircle } from 'react-bootstrap-icons'


//css import
import './add-job.scss'

class AddJob extends Component {

    state = {
        company: '',
        status: '',
        jobTitle: '',
        lastContacted: '',
        isOpen: true
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleDropDown = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    handleSubmit = e => {
        e.preventDefault();
        const {company, status, jobTitle, lastContacted} = this.state
        const newJob = {company, status, jobTitle, lastContacted}
        addJobToUserJobsCollection(newJob)
        this.setState({
            company: '',
            status: '',
            jobTitle: '',
            lastContacted: ''
        })
    }

    componentDidMount(){
        this.props.fetchJobsStart()
    }

    render() {
        const {company, status, jobTitle, lastContacted, isOpen } = this.state
        const {handleDropDown, handleSubmit, handleChange} = this
        return (
            <Container className='add-job'>
                <div className='add-job-header' onClick={() =>  handleDropDown()}>
                    Add a new Job {isOpen ? <ArrowUpCircle/> : <ArrowDownCircle/>}
                </div>
               { isOpen ? 
                <Form id='add-job-form' onSubmit={handleSubmit}>
                    <Form.Group controlId="companyForm">
                        <Form.Label>Company:</Form.Label>
                        <Form.Control required name='company' value={company} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="jobTitleForm">
                        <Form.Label>Job Title:</Form.Label>
                        <Form.Control required name='jobTitle' value={jobTitle} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="lastContactForm">
                        <Form.Label>Last Contacted:</Form.Label>
                        <Form.Control required type="date" name='lastContacted' value={lastContacted} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="statusForm">
                        <Form.Label>Status:</Form.Label>
                        <Form.Control required name="status" as="select" value={status} onChange={handleChange} >
                            <option disabled defaultValue></option>
                            <option value="saved">Saved</option>
                            <option value="applied">Applied</option>
                            <option value="interviewing">Interviewing</option>
                            <option value="closed">Closed</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant='success' type='submit'>Add Job</Button>
                </Form>
                :
                null
                }
            </Container>
        ); 
    }
}

const msp = ({jobs}) => ({
    jobs: jobs.jobs
})

const mdp = (dispatch) => {
    return {
      fetchJobsStart: () => dispatch(fetchJobsStart()),
    }
  }

export default connect(msp, mdp)(AddJob);

