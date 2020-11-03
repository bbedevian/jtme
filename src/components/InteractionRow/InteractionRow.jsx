import React, { useState } from 'react';
import EditButton from '../EditButton/EditButton'
import EditInteractionRow from '../EditInteractionRow/EditInteractionRow';

//redux imports
import { connect } from 'react-redux'
import { selectInteraction } from "../../redux/interactions/interactions.actions"

//css import
import './InteractionRow.scss'

const InteractionRow = (props) => {
   const { date, type, nextSteps }  = props.interaction
   const [ showEditBtn, setShowEditBtn ] = useState(false)

   let tableRow;
   if(props.selectedInteraction !== null && props.interaction.id === props.selectedInteraction.id){
      tableRow = <EditInteractionRow interaction={props.selectedInteraction}/>
   }else {
      tableRow = (
         <tr onMouseEnter={()=> setShowEditBtn(true)} onMouseLeave={()=> setShowEditBtn(false)}>
         <td>{date}</td>
         <td>{type}</td>
         <td>{nextSteps}</td>
         <td className="interactionRowBtn">
            <EditButton clicked={()=>props.selectInteraction(props.interaction)} show={showEditBtn} />
         </td>
      </tr>
      )
   }
   return (
      <>
      {tableRow}  
      </>
   );
};
function mapStateToProps({interactions}) {
   return {
      selectedInteraction: interactions.selectedInteraction
   }
}

function mapDispatchToProps(dispatch) {
   return {
      selectInteraction: (interaction) => dispatch(selectInteraction(interaction))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractionRow);