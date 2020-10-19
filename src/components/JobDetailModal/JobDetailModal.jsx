//React imports
import React, {useState} from 'react'
import connect from "react-redux"
//component imports
import InteractionTable from '../InteractionTable/InteractionTable'
import EditButton from '../EditButton/EditButton'
//bootstrap imports
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form'
//styling imports
import './JobDetailModal.scss'


function JobDetailModal(props) {
   const [editing, setEditing] = useState(false)
   const {jobId, companyName, jobTitle, lastContacted} = props.job
   console.log(jobId)
   let title;
   if(editing) {
      title = (
         <>
         <Modal.Header>
            <Modal.Title>Edit this Job</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <p>Job Id #: {jobId}</p>
            <Form.Label>Company Name:</Form.Label>
            <Form.Control defaultValue={companyName}/>
            <Form.Label>Job Title:</Form.Label>
            <Form.Control defaultValue={jobTitle}/>
            <Form.Label>Last Updated:</Form.Label>
            <Form.Control defaultValue={lastContacted}/>
            <Form.Label>Status:</Form.Label>
            <Form.Control name="status" as='select'>
               {/* need a way to get the already selected choice and input it */}
               <option value="saved">Saved</option>
               <option value="applied">Applied</option>
               <option value="interviewing">Interviewing</option>
               <option value="closed">Closed</option>
            </Form.Control>
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={() => setEditing(false)}>Stop Editing</Button>
         </Modal.Footer>
         </>
      )
   } else {
      title = (
         <>
         <Modal.Header closeButton>
            <Modal.Title>
               {jobTitle} @ {companyName}<EditButton clicked={() => setEditing(true)} show={true}/>
            </Modal.Title>
         </Modal.Header>
            <Modal.Body>
            <InteractionTable/>
            </Modal.Body>
         <Modal.Footer>
               <Button variant='success' onClick={props.onHide}>Save Changes</Button>
         </Modal.Footer>
         </>
      )
   }
   return(
      <Modal centered id="fullscreenModal" show={props.show} onHide={props.onHide}>
         {title}
      </Modal>
   )
}

//get this single job and map to props? 
const mapStateToProps = state => {

}

export default JobDetailModal