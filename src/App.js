import React from 'react';
import './App.css'
import JobsTable from '../src/JobsTable/JobsTable'

//css min import for bootstrap components to work as expected
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>This is going to be the main page?</h1>
      <JobsTable></JobsTable>
    </div>
  );
}

export default App;
