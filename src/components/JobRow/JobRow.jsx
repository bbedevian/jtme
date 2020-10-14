import React, {useState} from 'react'
import './JobRow.scss'
import JobDetailModal from '../JobDetailModal/JobDetailModal'

function JobRow(props) {
   const [modalShow, setModalShow] = useState(false)
   console.log(modalShow)
   return(
      <>
      <tr onClick={() => setModalShow(true)}>
         <td>{props.companyName}</td>
         <td>{props.jobTitle}</td>
         <td>{props.lastContacted}</td>
         <td>{props.jobStatus}</td>
      </tr>
      <JobDetailModal jobTitle={props.jobTitle} companyName={props.companyName} show={modalShow} onHide={()=> setModalShow(false)}></JobDetailModal>
      </>
   )
}

export default JobRow;
