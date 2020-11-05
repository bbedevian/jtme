import React from 'react';

//bootstrap imports
import Button from 'react-bootstrap/Button'
import { TrashFill } from 'react-bootstrap-icons'


const DeleteButton = () => {
   return (
      <Button variant='light'><TrashFill color='red'/></Button>
   );
};

export default DeleteButton;