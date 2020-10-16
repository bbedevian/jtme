import React from 'react'

//bootstrap imports
import Form from 'react-bootstrap/Form'

function EditRow(props){
   console.log("EditRow Props", props)
   return(
      <tr>
         <td><Form.Control type="text" defaultValue={props.companyName}/></td>
         <td><Form.Control type="text" defaultValue={props.jobTitle}/></td>
         <td><Form.Control type="text" defaultValue={props.lastContacted}/></td>
         <td><Form.Control type="text" defaultValue={props.status}/></td>
      </tr>
   )
}

export default EditRow;