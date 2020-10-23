//react imports
import React from 'react'

//component imports
import InteractionRow from '../InteractionRow/InteractionRow'

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
               </tr>
            </thead>
            <tbody>
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
function mapDispatchToProps(dispatch) {
   return {
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractionTable);