import React, {useState} from "react";

//component immports
import SaveButton from "../SaveButton/SaveButton";
import DiscardChangesButton from "../DiscardChangesButton/DiscardChangesButton";

//firebase import
import { addInteractionToJob } from '../../firebase/firebase.utils'

//bootstrap imports
import Form from "react-bootstrap/Form";

const AddInteractionRow = (props) => {
   const [ date, setDate ] = useState('')
   const [ type, setType ] = useState('')
   const [ nextSteps, setNextSteps ] = useState('')

	const handleSubmit = () => {
      let interaction = {
         date, type, nextSteps
      }
      addInteractionToJob(interaction);
      props.changeShowAddInteraction();
	};
	return (
		<tr>
			<td>
				<Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)}></Form.Control>
			</td>
			<td>
				<Form.Control as='select' value={type} onChange={(e) => setType(e.target.value)}>
                  <option disabled defaultValue></option>
						<option value="emailed">Emailed</option>
						<option value="call">Call</option>
						<option value="code challenge">Code challenge</option>
						<option value="interviewed">Interviewed</option>
            </Form.Control>
			</td>
			<td>
				<Form.Control type="text" value={nextSteps} onChange={(e) => setNextSteps(e.target.value)}></Form.Control>
			</td>
			<td>
				<SaveButton onClick={handleSubmit} />
				<DiscardChangesButton onClick={props.changeShowAddInteraction} />
			</td>
		</tr>
	);
};

export default AddInteractionRow;
