//React imports
import React, {useState, useEffect} from 'react'
// Redux  imports
import {connect} from 'react-redux'
import { fetchInteractionsStart } from '../../redux/interactions/interactions.actions';
//component imports
import InteractionTable from '../InteractionTable/InteractionTable'
//bootstrap imports
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
//styling imports
import './JobDetailModal.scss'


function JobDetailModal(props) {

  useEffect(() => {
      fetchInteractionsStart(props.user, props.jobID)
  })
   
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

const msp = ({user}) => ({
   user: user.currentUser,
})

const mdp = (dispatch) => {
   return {
     fetchInteractionsStart: (user, job) => dispatch(fetchInteractionsStart(user, job))
   }
 }

export default connect(msp, mdp)(JobDetailModal)