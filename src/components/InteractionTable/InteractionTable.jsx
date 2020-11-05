//react imports
import React from 'react'

//component imports
import InteractionRow from '../InteractionRow/InteractionRow'
import AddInteractionRow from '../AddInteractionRow/AddInteractionRow'

//redux imports
import { connect } from 'react-redux'

//bootstrap imports
import Table from "react-bootstrap/Table"

function InteractionTable(props){
   return(
         <Table>
            <thead>
               <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Next Steps</th>
               </tr>
            </thead>
            <tbody>
               {props.show? <AddInteractionRow changeShowAddInteraction={props.changeShowAddInteraction}/> : null }
               
            {props.interactions? props.interactions.map((interaction) => {
                                 return (
                                    <>
                                       <InteractionRow
                                       interaction={interaction}
                                       />
                                    </>
                                 )
                           }) : null}
            </tbody>
         </Table>
   )
}

function mapStateToProps(state) {
   return {
      interactions: state.interactions.interactions
   }
}

export default connect(mapStateToProps)(InteractionTable);