import React from 'react';
import './App.css'
import JobsTable from './components/JobsTable/JobsTable'

import AddJob from './components/AddJob/add-job.component';

function App() {
  return (
    <div className="App">

      <h1>This is going to be the main page?</h1>
      <AddJob/>
      <JobsTable></JobsTable>

    </div>
  );
}

export default App;
