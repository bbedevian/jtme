import React, {useState} from 'react'
import {connect} from 'react-redux'
import './JobsTable.scss'
// redux imports
import {selectJob} from '../../redux/jobs/jobs.actions'
// Bootstrap Imports
import Table from 'react-bootstrap/Table'
import Container from "react-bootstrap/Container"
import JobRow from '../JobRow/JobRow'
import JobDetailModal from '../JobDetailModal/JobDetailModal'

function JobsTable(props){
   const [modalShow, setModalShow] = useState(false)
   const handleClose = () => {
      props.selectJob(null)
      setModalShow(false)
   }
   const handleOpen = () => setModalShow(true)

   return(
      <>
         <Container>
                  <Table id="jobs-table" striped bordered hover>
                     <thead id="job-table-header">
                        <tr>
                           <th>Company Name</th>
                           <th>Job Title</th>
                           <th>Last Date of Contact</th>
                           <th>Status</th>
                        </tr>
                     </thead>
                     <tbody>
                        {props.jobs ? props.jobs.map((job) => {
                              return (
                                 <>
                                    <JobRow 
                                    key={job.id} 
                                    handleOpen={handleOpen}
                                    handleClose={handleClose} 
                                    job={job}
                                    />
                                    
                                 </>
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
   selectJob: () => dispatch(selectJob(null)),
})

export default connect(mapStateToProps, mapDispatchToProps)(JobsTable)