import React, { useState } from "react";

//redux imports
import { connect } from "react-redux";
import { removeSelectedInteraction } from "../../redux/interactions/interactions.actions";
import { updateInteraction } from "../../firebase/firebase.utils";

//component imports
import SaveButton from "../SaveButton/SaveButton";
import DiscardChangesButton from "../DiscardChangesButton/DiscardChangesButton";

//bootstrap imports
import Form from "react-bootstrap/Form";

class EditInteractionRow extends React.Component {
	state = {
		date: "",
		type: "",
		nextSteps: "",
	};

	componentDidMount() {
		if (this.props.interaction) {
			const { date, type, nextSteps } = this.props.interaction;
			this.setState({
				date,
				type,
				nextSteps,
			});
		}
	}
	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleEditSubmit = () => {
		const { date, type, nextSteps } = this.state;
		const job = { date, type, nextSteps };
		updateInteraction(job);
	};

	render() {
		const { date, type, nextSteps } = this.state;
		return (
			<tr>
				<td>
					<Form.Control
						type="date"
						value={date}
						name="date"
						onChange={this.handleChange}
					></Form.Control>
				</td>
				<td>
					<Form.Control
						as="select"
						value={type}
						name="type"
						onChange={this.handleChange}
					>
						<option disabled defaultValue></option>
						<option value="emailed">Emailed</option>
						<option value="call">Call</option>
						<option value="code challenge">Code challenge</option>
						<option value="interviewed">Interviewed</option>
					</Form.Control>
				</td>
				<td>
					<Form.Control
						value={nextSteps}
						name="nextSteps"
						onChange={this.handleChange}
					></Form.Control>
				</td>
				<td>
					<SaveButton onClick={this.handleEditSubmit} />
					<DiscardChangesButton onClick={this.props.discardChanges} />
				</td>
			</tr>
		);
	}
}
function mapStateToProps({ interactions }) {
	return {
		interaction: interactions.selectedInteraction,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		discardChanges: () => dispatch(removeSelectedInteraction()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EditInteractionRow);
