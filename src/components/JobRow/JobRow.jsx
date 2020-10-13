import React from 'react'
import './JobRow.scss'

function JobRow(props) {
   return(
      <tr>
         <td>{props.companyName}</td>
         <td>{props.jobTitle}</td>
         <td>{props.lastContacted}</td>
         <td>{props.jobStatus}</td>
      </tr>
   )
}

export default JobRow;
