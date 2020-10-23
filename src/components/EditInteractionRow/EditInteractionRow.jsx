import React, { useState } from 'react';

//redux imports
import { connect } from 'react-redux'
import { removeSelectedInteraction } from '../../redux/interactions/interactions.actions';

//component imports
import SaveButton from '../SaveButton/SaveButton'
import DiscardChangesButton from '../DiscardChangesButton/DiscardChangesButton'

//bootstrap imports
import Form from "react-bootstrap/Form"

class EditInteractionRow extends React.Component {
   state = {
      date: "",
      type: "",
   }

   componentDidMount(){
      if(this.props.interaction){
         const { date, type } = this.props.interaction
         this.setState({
            date, type 
         })
      }
   }
   handleChange = e => {
      const {name, value} = e.target
      this.setState({[name]: value})
   }

   render(){
      const { date, type } = this.state
      return (
         <tr>
            <td><Form.Control value={date} onChange={this.handleChange}></Form.Control></td>
            <td><Form.Control value={type} onChange={this.handleChange}></Form.Control></td>
            <td>
               {/* need an update interactions firebase util here */}
               <SaveButton/>
               <DiscardChangesButton onClick={this.props.discardChanges}/>
            </td>
         </tr>
      );
   }
};
function mapStateToProps(state) {
   return {
      interaction: state.interactions.selectedInteraction
   }
}
function mapDispatchToProps(dispatch) {
   return {
      discardChanges: () => dispatch(removeSelectedInteraction())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditInteractionRow);