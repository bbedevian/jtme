import React, {useState} from 'react';
import JobsTable from '../..//components/JobsTable/JobsTable'
import AddJob from '../../components/AddJob/add-job.component';
import {connect} from 'react-redux'
import { signOutStart } from '../../redux/user/user.actions';
import Button from 'react-bootstrap/Button'
import FeedbackForm from '../../components/FeedbackForm/FeedbackForm'

import './home.styles.scss'


const HomePage = (props) => {
    const [displayAddJob, setDisplayAddJob] = useState(true)
    const [displayFeedback, setDisplayFeedback] = useState(false)

    const handleAddJobsDisplay = () => {
        setDisplayAddJob(!displayAddJob)
        if(displayFeedback){
            setDisplayFeedback(false)
        }
    }

    const handleFeedbackDisplay = () => {
        setDisplayFeedback(!displayFeedback)
        if(displayAddJob){
            setDisplayAddJob(false)
        }
    }

    return (
        <div className='home-page'>
            <div className='side-bar'>
                <AddJob isOpen={displayAddJob} handleDisplay={handleAddJobsDisplay}/>
                <FeedbackForm isOpen={displayFeedback} handleDisplay={handleFeedbackDisplay}/>
            </div>
            <div className='job-stuffs'>
                <JobsTable></JobsTable>
                <Button variant='outline-light' onClick={() => props.signOutStart()} className='sign-out'>Sign Out</Button>
            </div>
        </div>
    );
}

const msp = ({jobs}) => ({
    selectedJob: jobs.selectedJob
})

const mdp = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(msp, mdp)(HomePage);
