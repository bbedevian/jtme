import React from 'react';
import JobsTable from '../..//components/JobsTable/JobsTable'
import AddJob from '../../components/AddJob/add-job.component';
import AddInteraction from '../../components/AddInteraction/add-interaction.component'
import {connect} from 'react-redux'


const HomePage = (props) => {
    return (
        <div>
            <AddJob/>
            <JobsTable></JobsTable>
            {props.selectedJob ? <AddInteraction /> : null}
        </div>
    );
}

const msp = ({jobs}) => ({
    selectedJob: jobs.selectedJob
  })

export default connect(msp)(HomePage);
