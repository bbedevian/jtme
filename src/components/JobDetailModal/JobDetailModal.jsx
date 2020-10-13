import React, {useState} from 'react'
//bootstrap imports
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"


function JobDetailModal(props) {
   
   return(
      <Modal show={props.show} onHide={props.onHide}>
         <Modal.Header closeButton>
            <Modal.Title>Title</Modal.Title>
            <Modal.Body>Let's get it started in hah</Modal.Body>
            <Modal.Footer>
               <Button onClick={props.onHide}>Save Changes</Button>
            </Modal.Footer>
         </Modal.Header>
      </Modal>
   )
}
export default JobDetailModal