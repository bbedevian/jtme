import React from 'react'

//bootstrap imports
import Table from "react-bootstrap/Table"

function InteractionTable(){
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
            <tr>
               <td>10/09/2020</td>
               <td>Phone Call</td>
               <td>Send Thank You Email</td>
            </tr>
         </tbody>
      </Table>
   )
}
export default InteractionTable;