//React imports
import React, { useState, useEffect } from "react";
// Redux  imports
import { connect } from "react-redux";
import { fetchInteractionsStart } from "../../redux/interactions/interactions.actions";
//component imports
import InteractionTable from "../InteractionTable/InteractionTable";
import EditButton from "../EditButton/EditButton";
//bootstrap imports
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//styling imports
import "./JobDetailModal.scss";
import { render } from "@testing-library/react";

class JobDetailModal extends React.Component {
	state = {
		editing: false
	}
	componentDidMount(){
		this.props.fetchInteractionsStart()

	}
	render(){
		// const [editing, setEditing] = useState(false);
		let title;
		if (this.state.editing) {
			title = (
				<>
					<Modal.Header>
						<Modal.Title>Edit this Job</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Job Id #: {this.props.selectedJob.id}</p>
						<Form.Label>Company Name:</Form.Label>
						<Form.Control defaultValue={this.props.selectedJob.company} />
						<Form.Label>Job Title:</Form.Label>
						<Form.Control defaultValue={this.props.selectedJob.jobTitle} />
						<Form.Label>Last Updated:</Form.Label>
						<Form.Control defaultValue={this.props.selectedJob.lastContacted} />
						<Form.Label>Status:</Form.Label>
						<Form.Control name="status" as="select" defaultValue={this.props.selectedJob.status}>
							{/* need a way to get the already selected choice and input it */}
							<option value="saved">Saved</option>
							<option value="applied">Applied</option>
							<option value="interviewing">Interviewing</option>
							<option value="closed">Closed</option>
						</Form.Control>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => this.setState({editing:false})}>Stop Editing</Button>
						<Button onClick={() => this.setState({editing:false})}>Save Changes</Button>
					</Modal.Footer>
				</>
			);
		} else {
			title = (
				<>
					<Modal.Header closeButton>
						<Modal.Title>
							{this.props.selectedJob.jobTitle} @ {this.props.selectedJob.company}
							<EditButton clicked={() => this.setState({editing: true})} show={true} />
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<InteractionTable />
					</Modal.Body>
					<Modal.Footer>
					</Modal.Footer>
				</>
			);
		}
		return (
			<Modal
				centered
				id="fullscreenModal"
				show={this.props.show}
				onHide={this.props.onHide}
			>
				{title}
			</Modal>
		);
	}
}

const msp = state => ({
	user: state.user.currentUser,
	selectedJob: state.jobs.selectedJob
});

const mdp = (dispatch) => {
	return {
		fetchInteractionsStart: (user, job) =>
         dispatch(fetchInteractionsStart(user, job))
	};
};

export default connect(msp, mdp)(JobDetailModal);
