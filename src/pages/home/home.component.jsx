import React from 'react';
import JobsTable from '../..//components/JobsTable/JobsTable'
import AddJob from '../../components/AddJob/add-job.component';
import {connect} from 'react-redux'
import { signOutStart } from '../../redux/user/user.actions';
import Button from 'react-bootstrap/Button'
import FeedbackForm from '../../components/FeedbackForm/FeedbackForm'

import './home.styles.scss'


const HomePage = (props) => {
    return (
        <div className='home-page'>
            <div className='side-bar'>
                <AddJob/>
                <FeedbackForm/>
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
