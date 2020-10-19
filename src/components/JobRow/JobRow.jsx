import React, {useState} from 'react'
import './JobRow.scss'
import JobDetailModal from '../JobDetailModal/JobDetailModal'

function JobRow(props) {
   const [modalShow, setModalShow] = useState(false)
   return(
      <>
      <tr onClick={() => setModalShow(true)}>
         <td>{props.companyName}</td>
         <td>{props.jobTitle}</td>
         <td>{props.lastContacted}</td>
         <td>{props.jobStatus}</td>
      </tr>
      <JobDetailModal jobTitle={props.jobTitle} jobID={props.jobID} companyName={props.companyName} show={modalShow} onHide={()=> setModalShow(false)}></JobDetailModal>
      </>
   )
}

export default JobRow;
