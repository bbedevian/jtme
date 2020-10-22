import React from 'react';

//styling import
import './DiscardChangesButton.scss'

//bootstrap imports
import Button from 'react-bootstrap/Button'
import { XSquareFill } from 'react-bootstrap-icons'

const DiscardChangesButton = () => {
   return (
      <Button variant='light'><XSquareFill color='red'/></Button>
   );
};

export default DiscardChangesButton;