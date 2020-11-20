import React, {useState, useEffect} from 'react'
import './JobsTable.scss'

//component imports
import JobRow from '../JobRow/JobRow'
import JobDetailModal from '../JobDetailModal/JobDetailModal'

// redux imports
import {connect} from 'react-redux'
import { removeSelectedJob } from '../../redux/jobs/jobs.actions'
import { removeSelectedInteraction } from '../../redux/interactions/interactions.actions'

// Bootstrap Imports
import Table from 'react-bootstrap/Table'
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'


function JobsTable(props){
   const [jobs, setjobs] = useState(null)
   const [filteredJobs, setFilteredJobs] = useState(null)
   const [modalShow, setModalShow] = useState(false)
   const handleClose = () => {
      props.removeSelectedJob()
      props.removeSelectedInteraction()
      setModalShow(false)
   }

   const handleOpen = () => setModalShow(true)

   useEffect(() => {
      setjobs(props.jobs)
   }, [props.jobs])

   useEffect(() => {
      setFilteredJobs(jobs)
   }, [jobs])

   const filterJobs = (e) => {
      let filteredJobs = jobs.filter(job => job.company.toLowerCase().includes(e.target.value))
      setFilteredJobs(filteredJobs)
   }

   return(
      <>
         <Container>
            <Row className='justify-content-center'>
               <Form>
                  <Form.Label>Search Jobs:</Form.Label>
                  <Form.Control type='text' onChange={filterJobs}></Form.Control>
               </Form>
            </Row>
            <br/>
                  <Table id="jobs-table" striped bordered hover>
                     <thead id="job-table-header">
                        <tr>
                           <th>Company Name</th>
                           <th>Job Title</th>
                           <th>Last Date of Contact</th>
                           <th>Status</th>
                        </tr>
                     </thead>
                        <tbody id="job-table-body">
                           {filteredJobs ? filteredJobs.map((job) => {
                                 return (
                                       <JobRow 
                                       key={job.id} 
                                       handleOpen={handleOpen}
                                       handleClose={handleClose} 
                                       job={job}
                                       />
                                 )
                           }) : null}
                        </tbody>
                  </Table>
                  {props.selectedJob && modalShow ? <JobDetailModal onHide={handleClose}  show={modalShow} job={props.selectedJob}/>
                  : null}
         </Container>
      </>
   )
}

const mapStateToProps = state => ({
   jobs: state.jobs.jobs,
   selectedJob: state.jobs.selectedJob
})

const mapDispatchToProps = dispatch => ({
   removeSelectedJob: () => dispatch(removeSelectedJob()),
   removeSelectedInteraction: () => dispatch(removeSelectedInteraction())
})

export default connect(mapStateToProps, mapDispatchToProps)(JobsTable)