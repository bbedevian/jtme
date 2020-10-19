import React from 'react'
import SaveJobChangesButton from '../SaveJobChangesButton/SaveJobChangesButton'
import './EditRow.scss'

//bootstrap imports
import Form from 'react-bootstrap/Form'

function EditRow(props){
   console.log("EditRow Props", props)
   return(
      <tr>
         <td><Form.Control type="text" defaultValue={props.companyName}/></td>
         <td><Form.Control type="text" defaultValue={props.jobTitle}/></td>
         <td><Form.Control type="text" defaultValue={props.lastContacted}/></td>
         <td className="status-td"><Form.Control custom as='select' defaultValue={props.status}>
               <option disabled selected></option>
               <option value="saved">Saved</option>
               <option value="applied">Applied</option>
               <option value="interviewing">Interviewing</option>
               <option value="closed">Closed</option>
            </Form.Control>
            <SaveJobChangesButton/>
            </td>
      </tr>
   )
}

export default EditRow;