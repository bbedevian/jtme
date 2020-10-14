import React, {useState} from 'react'
//bootstrap imports
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"


function JobDetailModal(props) {
   
   return(
      <Modal show={props.show} onHide={props.onHide}>
         <Modal.Header closeButton>
            <Modal.Title>{props.jobTitle} @ {props.companyName}</Modal.Title>
         </Modal.Header>
            <Modal.Body>Let's get it started in hah</Modal.Body>
            <Modal.Footer>
               <Button variant='success' onClick={props.onHide}>Save Changes</Button>
               <Button variant='secondary' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
      </Modal>
   )
}
export default JobDetailModal