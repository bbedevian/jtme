//React imports
import React from "react";
// Redux  imports
import { connect } from "react-redux";
import { fetchInteractionsStart } from "../../redux/interactions/interactions.actions";
import {updateJob} from '../../firebase/firebase.utils'
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
import { render } from "@testing-library/react";

class JobDetailModal extends React.Component {
	state = {
		editing: false,
		company: '',
		jobTitle: '',
		status: '',
		lastContacted: ''
	}
	componentDidMount(){
		const {company, jobTitle, lastContacted, status} = this.props.selectedJob
		this.setState({ company, jobTitle, lastContacted, status})
		this.props.fetchInteractionsStart()
	}

	componentDidUpdate(prevProps){
		const {selectedJob} = this.props
		const {company, jobTitle, lastContacted, status, id} = selectedJob
		if(id !== prevProps.selectedJob.id){
			this.setState({ company, jobTitle, lastContacted, status})
			this.props.fetchInteractionsStart()
		}
	}

	handleChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

	handleEditSubmit = (e) => {
		e.preventDefault();
		const {company, jobTitle, lastContacted, status} = this.state
		const job = {company, jobTitle, lastContacted, status} 
		updateJob(job)
		this.setState({editing:false})
	}

	render(){
		// const [editing, setEditing] = useState(false);
		const {company, jobTitle, lastContacted, status} = this.state
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
						<Form.Control  name='company' value={company} onChange={this.handleChange}/>
						<Form.Label>Job Title:</Form.Label>
						<Form.Control name='jobTitle' value={jobTitle} onChange={this.handleChange}/>
						<Form.Label>Last Updated:</Form.Label>
						<Form.Control name='lastContacted' value={lastContacted} onChange={this.handleChange}/>
						<Form.Label>Status:</Form.Label> 
						<Form.Control name="status" as="select" value={status} onChange={this.handleChange} >
							{/* need a way to get the already selected choice and input it */}
							<option value="saved">Saved</option>
							<option value="applied">Applied</option>
							<option value="interviewing">Interviewing</option>
							<option value="closed">Closed</option>
						</Form.Control>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => this.setState({editing:false})}>Stop Editing</Button>
						<Button onClick={(e) => this.handleEditSubmit(e)}>Save Changes</Button>
					</Modal.Footer>
				</>
			);
		} else {
			title = (
				<>
					<Modal.Header closeButton >
						<Modal.Title>
							{this.props.selectedJob.jobTitle} @ {this.props.selectedJob.company}
							<EditButton clicked={() => this.setState({editing: true})} show={true} />
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<InteractionTable />
					</Modal.Body>
					<Modal.Footer>
						<Button>Add Interaction</Button>
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

const msp = state => ({
	user: state.user.currentUser,
	selectedJob: state.jobs.selectedJob
});

const mdp = (dispatch) => {
	return {
		fetchInteractionsStart: () => dispatch(fetchInteractionsStart()),
		selectJob: () => dispatch(selectJob(null)),

	};
};

export default connect(msp, mdp)(JobDetailModal);
