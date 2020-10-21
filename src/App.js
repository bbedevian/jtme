import React from 'react';
import './App.css'
import JobsTable from './components/JobsTable/JobsTable'
import AddJob from './components/AddJob/add-job.component';
import AddInteraction from './components/AddInteraction/add-interaction.component'
import {connect} from 'react-redux'

function App(props) {
  return (
    <div className="App">

      <h1>This is going to be the main page?</h1>
      <AddJob/>
      <JobsTable></JobsTable>
      {props.selectedJob ? <AddInteraction /> : null}
    </div>
  );
}

const msp = ({jobs}) => ({
  selectedJob: jobs.selectedJob
})

export default connect(msp)(App);
