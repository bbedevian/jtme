import React from 'react';

//component immports
import SaveButton from '../SaveButton/SaveButton'
import DiscardChangesButton from '../DiscardChangesButton/DiscardChangesButton'

//bootstrap imports
import Form from 'react-bootstrap/Form'

const AddInteractionRow = () => {
   return (
      <tr>
         <td><Form.Control type='text'></Form.Control></td>
         <td><Form.Control type='text'></Form.Control></td>
         <td><Form.Control type='text'></Form.Control></td>
         <td><SaveButton/><DiscardChangesButton/></td>
      </tr>
   );
};

export default AddInteractionRow;