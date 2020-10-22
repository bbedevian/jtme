import React from 'react';

//styling import
import './SaveButton.scss'

//Bootstrap Imports
import Button from "react-bootstrap/Button"
import { Check2Circle } from 'react-bootstrap-icons'

const SaveButton = () => {
   return (
      <Button variant='save'><Check2Circle color="green"/></Button>
   );
};

export default SaveButton;