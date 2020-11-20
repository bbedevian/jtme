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
	 const [ dateValidated, setDateValidated ] = useState(true)
	 const [ typeValidated, setTypeValidated ] = useState(true)

   const [ nextSteps, setNextSteps ] = useState('')

	const handleSubmit = () => {
			if (date && type) {
					let interaction = { date, type, nextSteps }
					addInteractionToJob(interaction);
					props.changeShowAddInteraction();
			}
			if (!date) setDateValidated(false)
			else setDateValidated(true)

			if (!type) setTypeValidated(false)
			else setTypeValidated(true)
	};
	return (
		<tr>
			<td>
				<Form.Control 
					className={dateValidated ? '' : 'is-invalid'} 
					type="date" 
					value={date} 
					onChange={(e) => setDate(e.target.value)}
				/>
			</td>
			<td>
				<Form.Control 
					className={typeValidated ? '' : 'is-invalid'} 
					as='select' 
					value={type} 
					onChange={(e) => setType(e.target.value)}
				>
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
