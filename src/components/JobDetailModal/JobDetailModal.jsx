//React imports
import React from "react";
// Redux  imports
import { connect } from "react-redux";
import { fetchInteractionsStart, resetInteractions } from "../../redux/interactions/interactions.actions";
import {updateJob, removeJobfromUser} from '../../firebase/firebase.utils'
import {selectJob} from '../../redux/jobs/jobs.actions'
//component imports
import InteractionTable from "../InteractionTable/InteractionTable";
import EditButton from "../EditButton/EditButton";
//bootstrap imports
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//styling imports
import "./JobDetailModal.scss";

class JobDetailModal extends React.Component {
	state = {
		editing: false,
		company: '',
		jobTitle: '',
		status: '',
		lastContacted: '',
		AddInteraction: false
	}
	componentDidMount(){
		const {company, jobTitle, lastContacted, status} = this.props.selectedJob
		this.setState({ company, jobTitle, lastContacted, status})
		this.props.fetchInteractionsStart()
	}

	componentWillUnmount(){
		this.props.resetInteractions()
	}

	handleChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

	handleEditSubmit = (e) => {
		let modal = true
		e.preventDefault();
		const {company, jobTitle, lastContacted, status} = this.state
		const job = {company, jobTitle, lastContacted, status} 
		updateJob(job, modal)
		this.setState({editing:false})
	}

	handleDelete = () => {
		if(window.confirm("Do you want to delete this job?")){
			removeJobfromUser()
		}
	}

	changeShowAddInteraction = () => {
		this.setState({AddInteraction: !this.state.AddInteraction})
	}

	render(){
		const {company, jobTitle, lastContacted, status, AddInteraction, editing} = this.state
		const {handleChange, handleDelete, handleEditSubmit, changeShowAddInteraction} = this
		const {selectedJob} = this.props
		let title;
		if (editing) {
			title = (
				<>
					<Modal.Header>
						<Modal.Title>Edit this Job</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Job Id #: {selectedJob.id}</p>
						<Form.Label>Company Name:</Form.Label>
						<Form.Control  name='company' value={company} onChange={handleChange}/>
						<Form.Label>Job Title:</Form.Label>
						<Form.Control name='jobTitle' value={jobTitle} onChange={handleChange}/>
						<Form.Label>Last Updated:</Form.Label>
						<Form.Control type='date' name='lastContacted' value={lastContacted} onChange={handleChange}/>
						<Form.Label>Status:</Form.Label> 
						<Form.Control name="status" as="select" value={status} onChange={handleChange} >
							{/* need a way to get the already selected choice and input it */}
							<option value="saved">Saved</option>
							<option value="applied">Applied</option>
							<option value="interviewing">Interviewing</option>
							<option value="closed">Closed</option>
						</Form.Control>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => this.setState({editing:false})}>Stop Editing</Button>
						<Button onClick={(e) => handleEditSubmit(e)}>Save Changes</Button>
					</Modal.Footer>
				</>
			);
		} else {
			title = (
				<>
					<Modal.Header closeButton >
						<Modal.Title>
							{selectedJob.jobTitle} @ {selectedJob.company}
							<EditButton clicked={() => this.setState({editing: true})} show={true} />
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<InteractionTable changeShowAddInteraction={changeShowAddInteraction} show={AddInteraction} />
					</Modal.Body>
					<Modal.Footer>
					{AddInteraction ? null : <Button onClick={changeShowAddInteraction}>Add Interaction</Button>}
					{AddInteraction ? null : <Button onClick={() => handleDelete()}>Delete this job</Button>}
					</Modal.Footer>
				</>
			);
		}
		return (
			<Modal
				centered
				id="fullscreenModal"
				show={this.props.show}
				backdrop='static'
				onHide={this.props.onHide}
			>
				{title}
			</Modal>
		);
	}
}

const msp = ({user, jobs}) => ({
	user: user.currentUser,
	selectedJob: jobs.selectedJob
});

const mdp = (dispatch) => {
	return {
		fetchInteractionsStart: () => dispatch(fetchInteractionsStart()),
		selectJob: () => dispatch(selectJob(null)),
		resetInteractions: () => dispatch(resetInteractions())

	};
};

export default connect(msp, mdp)(JobDetailModal);
