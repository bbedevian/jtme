//React imports
import React, {useState} from 'react'
//component imports
import InteractionTable from '../InteractionTable/InteractionTable'
//bootstrap imports
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
//styling imports
import './JobDetailModal.scss'


function JobDetailModal(props) {
   
   return(
      <Modal id="fullscreenModal" show={props.show} onHide={props.onHide}>
         <Modal.Header closeButton>
            <Modal.Title>{props.jobTitle} @ {props.companyName}</Modal.Title>
         </Modal.Header>
            <Modal.Body>
            <InteractionTable/>
            </Modal.Body>
            <Modal.Footer>
               <Button variant='success' onClick={props.onHide}>Save Changes</Button>
               <Button variant='secondary' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
      </Modal>
   )
}
export default JobDetailModal